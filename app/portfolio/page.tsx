"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function PortfolioPage() {
  const handleDownloadPDF = () => {
    try {
      const link = document.createElement("a")
      link.href = "/adrin-alias-portfolio.pdf"
      link.download = "Adrin-Alias-Portfolio.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      // Fallback: open in new window
      window.open("/adrin-alias-portfolio.pdf", "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <h1 className="font-serif font-bold text-2xl text-foreground">Engineering Portfolio</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="/adrin-alias-portfolio.pdf" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in New Tab
                </a>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* PDF Viewer */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="/adrin-alias-portfolio.pdf"
            className="w-full h-[80vh] min-h-[600px]"
            title="Adrin Alias Engineering Portfolio"
            onError={() => {
              console.log("[v0] PDF iframe failed to load")
            }}
          />
        </div>

        {/* Fallback message */}
        <div className="text-center mt-6">
          <p className="text-muted-foreground mb-4">
            Having trouble viewing the PDF? Try downloading it or opening in a new tab.
          </p>
          <div className="space-x-4">
            <Button onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" asChild>
              <a href="/adrin-alias-portfolio.pdf" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
