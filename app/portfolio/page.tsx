"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function PortfolioPage() {
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

            <Button asChild>
              <a
                href="/adrin-alias-portfolio.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open PDF in New Tab
              </a>
            </Button>
          </div>

          <div className="w-full h-[800px] border rounded-lg overflow-hidden">
            <iframe
              src="/adrin-alias-portfolio.pdf"
              className="w-full h-full"
              title="Adrin Alias Engineering Portfolio"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
