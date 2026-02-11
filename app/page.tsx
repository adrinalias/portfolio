import { ProjectGallery } from "@/components/project-gallery"
import { getAllProjects } from "@/lib/mdx"
import { HeroSection } from "@/components/hero-section"
import { ScrollSnapContainer } from "@/components/scroll-snap-container"

export default async function Portfolio() {
  const projects = await getAllProjects();

  return (
    <ScrollSnapContainer className="h-screen overflow-y-auto">
      {/* Hero Section */}
      <div className="snap-start">
        <HeroSection />
      </div>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen bg-background py-10 md:py-16 snap-start">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-6">
            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Projects
            </h2>
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
    </ScrollSnapContainer>
  )
}
