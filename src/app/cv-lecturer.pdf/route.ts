import { NextResponse } from "next/server";
import { getCvPdf, pdfFileName } from "@/lib/renderCvPdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET() {
  try {
    const pdf = await getCvPdf("lect");
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${pdfFileName("lect")}"`,
        "Cache-Control": "private, no-store",
        "Content-Length": String(pdf.length),
      },
    });
  } catch (error) {
    console.error("cv-lecturer.pdf failed:", error);
    return NextResponse.json(
      { error: "Could not generate the lecturer CV PDF right now." },
      { status: 503 }
    );
  }
}
