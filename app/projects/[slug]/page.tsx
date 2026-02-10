import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { projects, getProjectBySlug } from '@/lib/data/projects';
import { getTagsByIds } from '@/lib/data/tags';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProjectContent } from '@/components/project-content';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const tags = getTagsByIds(project.tags);
  const projectDate = new Date(project.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/#projects">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative w-full h-[40vh] md:h-[60vh] bg-muted">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 max-w-4xl -mt-32 relative z-10">
        {/* Title and Metadata */}
        <div className="bg-background/95 backdrop-blur-sm rounded-lg border border-border p-8 md:p-12 mb-8">
          <h1 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            {project.title}
          </h1>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <time dateTime={project.date}>{projectDate}</time>
            {project.category && (
              <>
                <span>•</span>
                <span>{project.category}</span>
              </>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="outline"
                style={{
                  borderColor: tag.color,
                  color: tag.color,
                }}
              >
                {tag.name}
              </Badge>
            ))}
          </div>

          {/* Links */}
          {project.links && (
            <div className="flex flex-wrap gap-3">
              {project.links.github && (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                </Button>
              )}
              {project.links.demo && (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.links.external && (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={project.links.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Learn More
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Long Description */}
        <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
          <p className="text-lg leading-relaxed">{project.longDescription}</p>
        </div>

        <Separator className="my-12" />

        {/* Media Content */}
        <ProjectContent media={project.media} />

        <Separator className="my-12" />

        {/* Navigation to other projects */}
        <div className="flex justify-center py-8">
          <Link href="/#projects">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              View All Projects
            </Button>
          </Link>
        </div>
      </article>

      {/* Footer spacing */}
      <div className="h-24" />
    </div>
  );
}
