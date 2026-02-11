'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectMetadata } from '@/lib/mdx';
import { getTagsByIds } from '@/lib/data/tags';

interface ProjectCardProps {
  project: ProjectMetadata;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const tags = getTagsByIds(project.tags);

  const handleImageClick = (e: React.MouseEvent) => {
    // Allow navigation if clicking the action button
    if ((e.target as HTMLElement).closest('.action-button')) {
      return;
    }

    // Only toggle on mobile (when there's no hover support)
    if (window.matchMedia('(hover: none)').matches) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link href={`/projects/${project.slug}`} className="block group h-full">
      <Card 
        className="flex flex-col h-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 p-0 gap-0 transform-gpu"
      >
        {/* Cover Image Container */}
        <div 
          className="relative aspect-[4/3] overflow-hidden bg-muted"
          style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
          onClick={handleImageClick}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay - appears on hover/tap */}
          <div 
            className={`
              absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-[2px]
              transition-all duration-300 flex flex-col justify-center items-center p-6 text-center
              ${isExpanded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}
            `}
          >
            <p className="text-zinc-800 dark:text-white/90 text-sm mb-6 leading-relaxed line-clamp-4 max-w-[90%] font-medium">
              {project.shortDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tags.map(tag => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="text-xs backdrop-blur-sm"
                  style={{
                    borderColor: tag.color,
                    color: tag.color,
                  }}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>

            {/* View Project Button (Mobile Only) */}
            <div className="md:hidden action-button bg-secondary/90 text-secondary-foreground hover:bg-secondary border border-border/50 h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              View Project <ArrowRight className="ml-2 h-4 w-4 opacity-50" />
            </div>
          </div>
        </div>

        {/* Title & Info Section */}
        <div className="px-4 py-3 flex-1 flex flex-col justify-between bg-muted border-t border-border/50">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-foreground text-lg font-bold font-serif leading-tight group-hover:text-primary transition-colors mb-1">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {new Date(project.date).getFullYear()} • {project.category}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
