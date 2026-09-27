import { createHash } from "node:crypto";

export type CvPdfKind = "dev" | "lect";

const PAGE_PATH: Record<CvPdfKind, string> = {
  dev: "/resume",
  lect: "/cv/lecturer",
};

const SOURCE_APIS: Record<CvPdfKind, string[]> = {
  dev: ["/api/cv", "/api/education", "/api/profile", "/api/projects"],
  lect: ["/api/lecturer-cv", "/api/profile"],
};

const FALLBACK_FILE: Record<CvPdfKind, string> = {
  dev: "/_static/resume.pdf",
  lect: "/_static/cv-lecturer.pdf",
};

const FILE_NAME: Record<CvPdfKind, string> = {
  dev: "Imtius-Ahmad-Resume.pdf",
  lect: "Imtius-Ahmad-Lecturer-CV.pdf",
};

export function pdfFileName(kind: CvPdfKind) {
  return FILE_NAME[kind];
}

export function siteBase(): string {
  const explicit = process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

async function sourceHash(kind: CvPdfKind): Promise<string> {
  const base = siteBase();
  const parts = await Promise.all(
    SOURCE_APIS[kind].map(async (path) => {
      try {
        const res = await fetch(base + path, { cache: "no-store" });
        return res.ok ? await res.text() : `!${res.status}`;
      } catch {
        return "!err";
      }
    })
  );
  return createHash("sha1").update(parts.join("\u0000")).digest("hex").slice(0, 20);
}

async function readCached(kind: CvPdfKind, hash: string): Promise<Uint8Array | null> {
  try {
    const { prisma } = await import("@/lib/prisma");
    const row = await prisma.generatedPdf.findUnique({ where: { kind } });
    if (row && row.hash === hash && row.data.length > 1000) {
      return row.data;
    }
  } catch (error) {
    console.error("CV pdf cache read failed:", error);
  }
  return null;
}

async function writeCached(kind: CvPdfKind, hash: string, data: Uint8Array) {
  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.generatedPdf.upsert({
      where: { kind },
      create: { kind, hash, data: new Uint8Array(data) },
      update: { hash, data: new Uint8Array(data) },
    });
  } catch (error) {
    console.error("CV pdf cache write failed:", error);
  }
}

async function launchBrowser() {
  const chromium = (await import("@sparticuz/chromium")).default;
  const puppeteer = (await import("puppeteer-core")).default;
  return puppeteer.launch({
    args: [...chromium.args, "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
    executablePath: await chromium.executablePath(),
    headless: true,
  });
}

async function renderFromPage(kind: CvPdfKind): Promise<Uint8Array> {
  const url = siteBase() + PAGE_PATH[kind];
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 2000 });
    try {
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
    } catch {
      // networkidle can stall on long connections — content check below still guards us
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    }
    await page
      .waitForFunction(
        () => (document.querySelector(".cv-sheet")?.textContent?.length ?? 0) > 400,
        { timeout: 20000 }
      )
      .catch(() => undefined);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const pdf = await page.pdf({
      printBackground: false,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    if (!pdf || pdf.length < 1000) throw new Error("empty pdf");
    return new Uint8Array(pdf);
  } finally {
    await browser.close().catch(() => undefined);
  }
}

async function fallbackPdf(kind: CvPdfKind): Promise<Uint8Array> {
  const res = await fetch(siteBase() + FALLBACK_FILE[kind], { cache: "no-store" });
  if (!res.ok) throw new Error(`fallback ${kind} missing: ${res.status}`);
  return new Uint8Array(await res.arrayBuffer());
}

export async function getCvPdf(kind: CvPdfKind): Promise<Uint8Array> {
  const hash = await sourceHash(kind);

  const cached = await readCached(kind, hash);
  if (cached) return cached;

  let generated: Uint8Array;
  let rendered = false;
  try {
    generated = await renderFromPage(kind);
    rendered = true;
    console.log(`CV pdf (${kind}) regenerated, ${generated.length} bytes, hash ${hash}`);
  } catch (error) {
    console.error(`CV pdf (${kind}) render failed, serving snapshot:`, error);
    generated = await fallbackPdf(kind);
  }

  // only cache a real render — never let a fallback poison the cache
  if (rendered) await writeCached(kind, hash, generated);
  return generated;
}
