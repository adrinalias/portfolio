"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Portfolio() {
  const [showSplash, setShowSplash] = useState(true)

  const handleOpenPDF = () => {
    window.open(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/adrin-alias-portfolio-pdf-placeholder-content.pdf",
      "_blank",
    )
  }

  if (showSplash) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 right-4 z-20">
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
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 block mx-auto"
              onClick={handleOpenPDF}
            >
              View Engineering Portfolio
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 bg-transparent"
              onClick={() => setShowSplash(false)}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-serif font-bold text-2xl text-foreground">Adrin Alias</h1>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <a
                  href="https://linkedin.com/in/adrinalias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-6">About Me</h2>
          <p className="font-sans text-lg text-muted-foreground mb-8 leading-relaxed">
            I'm a Mechanical Engineering student at the University of Texas at Arlington, graduating in December 2025.
            My expertise spans data acquisition systems, IoT devices, CAD design, and manufacturing processes. I'm
            passionate about creating innovative engineering solutions that solve real-world problems.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <h3 className="font-serif font-bold text-xl text-foreground mb-2">CAD Design</h3>
              <p className="font-sans text-sm text-muted-foreground">SolidWorks, Fusion360</p>
            </div>
            <div className="text-center">
              <h3 className="font-serif font-bold text-xl text-foreground mb-2">Programming</h3>
              <p className="font-sans text-sm text-muted-foreground">C++, Python, MATLAB</p>
            </div>
            <div className="text-center">
              <h3 className="font-serif font-bold text-xl text-foreground mb-2">Manufacturing</h3>
              <p className="font-sans text-sm text-muted-foreground">3D Printing, Sheet Metal</p>
            </div>
            <div className="text-center">
              <h3 className="font-serif font-bold text-xl text-foreground mb-2">Electronics</h3>
              <p className="font-sans text-sm text-muted-foreground">Arduino, ESP32, Sensors</p>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleOpenPDF}
            >
              View Full Portfolio
            </Button>
            <br />
            <Button size="lg" variant="outline" asChild>
              <a href="https://linkedin.com/in/adrinalias" target="_blank" rel="noopener noreferrer">
                Connect on LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p className="font-sans">© 2024 Adrin Alias. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
