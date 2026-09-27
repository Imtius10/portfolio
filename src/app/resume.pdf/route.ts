import { NextResponse } from "next/server";
import { getCvPdf, pdfFileName } from "@/lib/renderCvPdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  try {
    const pdf = await getCvPdf("dev");
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${pdfFileName("dev")}"`,
        "Cache-Control": "private, no-store",
        "Content-Length": String(pdf.length),
      },
    });
  } catch (error) {
    console.error("resume.pdf failed:", error);
    return NextResponse.json(
      { error: "Could not generate the resume PDF right now." },
      { status: 503 }
    );
  }
}
