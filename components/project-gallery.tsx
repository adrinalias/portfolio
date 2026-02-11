'use client';

import { useState, useEffect } from 'react';
import { ProjectCard } from '@/components/project-card';
import { TagFilter } from '@/components/tag-filter';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectMetadata } from '@/lib/mdx';
import { getAllTags } from '@/lib/data/tags';

interface ProjectGalleryProps {
  projects: ProjectMetadata[];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectMetadata[]>(projects);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Get all unique tags from projects
  const availableTags = (() => {
    const tagIds = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tagId => tagIds.add(tagId));
    });
    return Array.from(tagIds);
  })();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate filtering delay for smooth transition
    const timer = setTimeout(() => {
      const filtered = selectedTags.length === 0 
        ? projects 
        : projects.filter(project => 
            selectedTags.every(tagId => project.tags.includes(tagId))
          );
      setFilteredProjects(filtered);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [selectedTags, projects]);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev: string[]) => 
      prev.includes(tagId)
        ? prev.filter((id: string) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleClearAll = () => {
    setSelectedTags([]);
  };

  if (!mounted) {
    return <GallerySkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Filter Section */}
      <TagFilter
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClearAll={handleClearAll}
        availableTags={availableTags}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
        </p>
      </div>

      {/* Project Grid */}
      {isLoading ? (
        <GallerySkeleton />
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {filteredProjects.map((project: ProjectMetadata, index: number) => (
            <div
              key={project.slug}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'backwards',
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-2">No projects found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Skeleton key={i} className="aspect-[4/3]" />
      ))}
    </div>
  );
}
