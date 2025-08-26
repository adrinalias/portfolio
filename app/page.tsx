"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const ExternalLinkIcon = () => (
  <svg
    className="w-4 h-4 ml-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
)

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

export default function Portfolio() {
  const handleOpenPDF = () => {
    window.open("/adrin-alias-portfolio.pdf", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex flex-col">
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open("https://linkedin.com/in/adrinalias", "_blank")}
            className="hover:bg-accent"
          >
            <LinkedInIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open("https://github.com/adrin-alias/", "_blank")}
            className="hover:bg-accent"
          >
            <GitHubIcon />
          </Button>
          <ThemeToggle />
        </div>

        <div className="text-center z-10 px-4">
          <h1 className="font-serif font-black text-4xl md:text-6xl lg:text-7xl text-foreground mb-4">Adrin Alias</h1>
          <p className="font-sans text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mechanical Engineer
            <br />
            University of Texas at Arlington | BSME December 2025
          </p>
          <div className="space-y-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
              onClick={handleOpenPDF}
            >
              <span className="flex items-center">
                View Engineering Portfolio
                <ExternalLinkIcon />
              </span>
            </Button>
          </div>
        </div>
      </div>

      <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-muted-foreground">
            <p className="font-sans">© {new Date().getFullYear()} Adrin Alias. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
