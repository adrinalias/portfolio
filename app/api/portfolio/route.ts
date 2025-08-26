import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import { join } from "path"

export async function GET() {
  try {
    const pdfPath = join(process.cwd(), "public", "adrin-alias-portfolio.pdf")
    const pdfBuffer = readFileSync(pdfPath)

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="adrin-alias-portfolio.pdf"',
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Error serving PDF:", error)
    return NextResponse.json({ error: "PDF file not found" }, { status: 404 })
  }
}
