/**
 * @deprecated This file is now a wrapper around the MDX-based project system.
 * Use `import { getAllProjects } from '@/lib/mdx'` directly instead.
 * 
 * This module re-exports functions from lib/mdx for backwards compatibility
 * and provides a primary source of project data loaded from content/projects/{slug}/metadata.ts files.
 */

import {
  getAllProjects,
  filterProjectsByTags,
  getFeaturedProjects,
  sortProjectsByDate,
  type ProjectMetadata,
} from '@/lib/mdx';

// Re-export ProjectMetadata as the primary project type
export type { ProjectMetadata as Project };

// Re-export MDX functions
export { getAllProjects, filterProjectsByTags, getFeaturedProjects, sortProjectsByDate };

/**
 * Get a single project by slug (metadata only)
 * For full project content with MDX, use getProjectBySlug from @/lib/mdx
 */
export async function getProjectBySlug(slug: string): Promise<ProjectMetadata | undefined> {
  const projects = await getAllProjects();
  return projects.find((p) => p.slug === slug);
}

/**
 * Get all unique tags across all projects
 */
export async function getAllProjectTags(): Promise<string[]> {
  const projects = await getAllProjects();
  const tagSet = new Set<string>();
  
  projects.forEach((project) => {
    project.tags.forEach((tag) => tagSet.add(tag));
  });
  
  return Array.from(tagSet);
}
