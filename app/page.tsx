import { ProjectGallery } from "@/components/project-gallery"
import { getAllProjects } from "@/lib/mdx"
import { HeroSection } from "@/components/hero-section"

export default async function Portfolio() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Projects Section */}
      <section id="projects" className="min-h-screen bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Projects
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Explore my engineering work spanning robotics, mechanical design, fabrication, and more.
              Click on any project to see detailed documentation.
            </p>
          </div>
          
          <ProjectGallery projects={projects} />
        </div>
      </section>

      {/* Footer */}
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
