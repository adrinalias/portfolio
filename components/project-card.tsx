'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

  const handleCardClick = (e: React.MouseEvent) => {
    // Only toggle on mobile (when there's no hover support)
    if (window.matchMedia('(hover: none)').matches) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <Card 
        className="overflow-hidden relative aspect-[4/3] cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
        onClick={handleCardClick}
      >
        {/* Cover Image */}
        <div className="absolute inset-0">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Overlay - shows on hover (desktop) or when expanded (mobile) */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent
            transition-opacity duration-300 flex flex-col justify-end p-6
            ${isExpanded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}
          `}
        >
          <h3 className="text-white text-xl font-semibold mb-2 font-serif">
            {project.title}
          </h3>
          
          <p className="text-white/90 text-sm mb-4 line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="text-xs"
                style={{
                  backgroundColor: tag.color,
                  color: 'white',
                  border: 'none',
                }}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Always visible title for accessibility */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 md:opacity-0 md:group-hover:opacity-0 transition-opacity">
          <h3 className="text-white text-lg font-semibold font-serif">
            {project.title}
          </h3>
        </div>
      </Card>
    </Link>
  );
}
