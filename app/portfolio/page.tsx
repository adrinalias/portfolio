"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function PortfolioPage() {
  useEffect(() => {
    console.log("[v0] Portfolio page mounted")

    // Check if PDF file is accessible
    fetch("/adrin-alias-portfolio.pdf", { method: "HEAD" })
      .then((response) => {
        console.log("[v0] PDF file check - Status:", response.status)
        console.log("[v0] PDF file check - OK:", response.ok)
        if (!response.ok) {
          console.log("[v0] PDF file not accessible - 404 or other error")
        }
      })
      .catch((error) => {
        console.log("[v0] PDF file check failed:", error)
      })
  }, [])

  const handleOpenPDF = () => {
    console.log("[v0] Open PDF button clicked")
    console.log("[v0] Attempting to open:", "/adrin-alias-portfolio.pdf")

    // Try to open the PDF and log any issues
    const newWindow = window.open("/adrin-alias-portfolio.pdf", "_blank", "noopener,noreferrer")
    if (!newWindow) {
      console.log("[v0] Failed to open new window - popup blocked?")
    } else {
      console.log("[v0] New window opened successfully")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold mb-2">Engineering Portfolio</h1>
            <p className="text-muted-foreground mb-4">Adrin Alias - Mechanical Engineering</p>

            <Button onClick={handleOpenPDF} className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Open PDF in New Tab
            </Button>
          </div>

          <div className="w-full h-[800px] border rounded-lg overflow-hidden">
            <iframe
              src="/adrin-alias-portfolio.pdf"
              className="w-full h-full"
              title="Adrin Alias Engineering Portfolio"
              onLoad={() => console.log("[v0] Iframe loaded successfully")}
              onError={(e) => console.log("[v0] Iframe error:", e)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
