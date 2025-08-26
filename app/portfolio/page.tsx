"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function PortfolioPage() {
  const handleDownload = () => {
    // Create a simple text file with portfolio information as fallback
    const portfolioText = `
Adrin Alias - Mechanical Engineering Portfolio

Contact Information:
- Phone: 682 306 0471
- Email: adrinalias@gmail.com
- LinkedIn: linkedin.com/in/adrinalias
- University: University of Texas at Arlington
- Degree: B.S. ME, December 2025

Projects:
1. Brake Dyno - Sensors & Data Acquisition (August 2024 – May 2025)
2. IOT Smart Blinds - Powered by ESP32 (May 2024 – August 2024)
3. Air Heaters - Enclosures & Control Systems (June 2024 – October 2024)
4. Turbine Blade Generation & Modelling (March 2024 – July 2024)
5. Mobius Racing - Formula 1 in Schools Competition (December 2020 – January 2021)
6. Trebuchet Design Project (March 2022 – May 2022)

For the complete portfolio with detailed project descriptions and images, 
please contact Adrin directly at adrinalias@gmail.com
    `

    const blob = new Blob([portfolioText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "adrin-alias-portfolio-summary.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
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

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Engineering Portfolio</CardTitle>
            <CardDescription>Adrin Alias - Mechanical Engineering Portfolio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Portfolio document is currently being optimized for web viewing.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleDownload} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Portfolio Summary
                </Button>

                <Button variant="outline" asChild>
                  <a href="mailto:adrinalias@gmail.com" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Request Full Portfolio
                  </a>
                </Button>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    <strong>Phone:</strong> 682 306 0471
                  </p>
                  <p>
                    <strong>Email:</strong> adrinalias@gmail.com
                  </p>
                </div>
                <div>
                  <p>
                    <strong>LinkedIn:</strong> linkedin.com/in/adrinalias
                  </p>
                  <p>
                    <strong>University:</strong> University of Texas at Arlington
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Featured Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p>
                    <strong>Brake Dyno</strong> - Sensors & Data Acquisition
                  </p>
                  <p>
                    <strong>IOT Smart Blinds</strong> - ESP32 Automation
                  </p>
                  <p>
                    <strong>Air Heaters</strong> - Control Systems
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <strong>Turbine Blade</strong> - Generation & Modelling
                  </p>
                  <p>
                    <strong>Formula 1 in Schools</strong> - Competition Winner
                  </p>
                  <p>
                    <strong>Trebuchet</strong> - Precision Design Project
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
