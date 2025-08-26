"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const projects = [
  {
    id: 1,
    title: "Brake Dyno DAQ System",
    image: "/brake-dyno-system.png",
    description:
      "Designed a complete data acquisition system for Formula SAE brake dynamometer testing with real-time visualization",
    tags: ["Circuit Design", "CAN Bus", "Arduino/C++", "Python", "Signal Processing"],
    demoUrl: "#",
    githubUrl: "#",
    period: "August 2024 – May 2025",
  },
  {
    id: 2,
    title: "IoT Smart Blinds",
    image: "/iot-smart-blinds.png",
    description: "Automated blind control system using ESP32 with 3D printed housing for improved sleep quality",
    tags: ["C++", "Arduino", "3D Printing", "CAD", "IoT", "Communication Protocols"],
    demoUrl: "#",
    githubUrl: "#",
    period: "May 2024 – August 2024",
  },
  {
    id: 3,
    title: "Air Heaters & Control Systems",
    image: "/air-heaters-system.png",
    description: "Custom heater enclosures and control systems for high temperature test rig using sheet metal design",
    tags: ["Sheet Metal Design", "DFMA", "Manufacturing", "Electrical Wiring", "CAD"],
    demoUrl: "#",
    githubUrl: "#",
    period: "June 2024 – October 2024",
  },
  {
    id: 4,
    title: "Turbine Blade Generation",
    image: "/turbine-blade-modeling.png",
    description:
      "MATLAB-based turbine blade profile transformation and SolidWorks modeling for multistage Helium Turbine",
    tags: ["FEA", "CAD", "Parametric Modelling", "MATLAB", "Ansys"],
    demoUrl: "#",
    githubUrl: "#",
    period: "March 2024 – July 2024",
  },
  {
    id: 5,
    title: "Precision Trebuchet",
    image: "/trebuchet-design.png",
    description: "Computer-controlled manufactured trebuchet designed to launch a penny exactly 6 feet using quarters",
    tags: ["3D Printing", "DFMA", "Simulation", "Laser Cutting", "GD&T", "CAD"],
    demoUrl: "#",
    githubUrl: "#",
    period: "March 2022 – May 2022",
  },
  {
    id: 6,
    title: "Formula 1 in Schools",
    image: "/f1-in-schools-car.png",
    description:
      "Miniature CO2-powered racecar design and manufacturing. National Finals representative and Judge's pick for Best Engineered Car",
    tags: ["Design of Experiment", "3D Printing", "CFD", "DFMA", "Rapid Prototyping", "CAD"],
    demoUrl: "#",
    githubUrl: "#",
    period: "December 2020 – January 2021",
  },
]

export default function Portfolio() {
  const [showSplash, setShowSplash] = useState(true)

  const handleEnterPortfolio = () => {
    setShowSplash(false)
  }

  if (showSplash) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-5"></div>

        <div className="text-center z-10 px-4">
          <h1 className="font-serif font-black text-4xl md:text-6xl lg:text-7xl text-foreground mb-4">Adrin Alias</h1>
          <p className="font-sans text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mechanical Engineering Student
            <br />
            University of Texas at Arlington | B.S. MechE, December 2025
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            asChild
          >
            <a href="/adrin-alias-portfolio.pdf" target="_blank" rel="noopener noreferrer">
              View Engineering Portfolio
            </a>
          </Button>
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
                <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </a>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
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

      {/* Projects Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">Engineering Projects</h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of mechanical engineering projects spanning data acquisition systems, IoT devices, manufacturing,
            and design optimization.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="projects">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg?height=200&width=400&query=mechanical engineering project"}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <Button size="sm" variant="secondary" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Details
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif font-bold text-xl text-card-foreground">{project.title}</h3>
                  <span className="text-xs text-muted-foreground font-mono">{project.period}</span>
                </div>
                <p className="font-sans text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="font-serif font-bold text-2xl text-foreground mb-4">Let's Connect</h3>
          <p className="font-sans text-muted-foreground mb-6 max-w-xl mx-auto">
            Interested in mechanical engineering, data acquisition systems, or IoT projects? I'm always excited to
            discuss innovative engineering solutions and opportunities.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <a href="https://linkedin.com/in/adrinalias" target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn
            </a>
          </Button>
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
