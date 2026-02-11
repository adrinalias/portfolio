import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/mdx';
import { getTagsByIds } from '@/lib/data/tags';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TableOfContents } from '@/components/table-of-contents';

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const projectData = await getProjectBySlug(slug);

  if (!projectData) {
    notFound();
  }

  const { metadata: project, content, headings } = projectData;
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
      <article className="container mx-auto px-4 max-w-7xl -mt-32 relative z-10">
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

        {/* Two-column layout: Content + ToC */}
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* MDX Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none 
              prose-headings:scroll-mt-20 prose-headings:font-serif
              prose-h1:text-4xl prose-h1:font-bold prose-h1:mt-12 prose-h1:mb-6
              prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
              prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:text-base prose-p:my-4
              prose-lead:text-xl prose-lead:text-muted-foreground prose-lead:font-normal
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-code:text-sm prose-code:font-mono
              prose-pre:my-0 prose-pre:p-0 prose-pre:bg-transparent
              prose-ul:my-6 prose-ul:list-none prose-ul:pl-0
              prose-ol:my-6 prose-ol:list-none prose-ol:pl-0
              prose-li:my-1
              prose-img:rounded-lg prose-img:border prose-img:border-border prose-img:my-8
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
              prose-hr:border-border prose-hr:my-8
              prose-table:my-8
              prose-th:text-left prose-th:font-semibold
              prose-td:text-muted-foreground">
              {content}
            </div>

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
          </div>

          {/* Table of Contents - Desktop only */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 border-l border-border pl-6">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          )}
        </div>
      </article>

      {/* Footer spacing */}
      <div className="h-24" />
    </div>
  );
}
