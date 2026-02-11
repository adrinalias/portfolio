import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import { mdxComponents } from '@/components/mdx';

const projectsDirectory = path.join(process.cwd(), 'content/projects');
const publicProjectsDirectory = path.join(process.cwd(), 'public/projects');

const resolveCoverImage = (slug: string, fallback: string): string => {
  const projectDir = path.join(publicProjectsDirectory, slug);
  const jpgPath = path.join(projectDir, 'cover.jpg');
  if (fs.existsSync(jpgPath)) {
    return `/projects/${slug}/cover.jpg`;
  }

  const pngPath = path.join(projectDir, 'cover.png');
  if (fs.existsSync(pngPath)) {
    return `/projects/${slug}/cover.png`;
  }

  return fallback;
};

export interface ProjectMetadata {
  slug: string;
  title: string;
  shortDescription: string;
  coverImage: string;
  tags: string[];
  date: string;
  featured?: boolean;
  hidden?: boolean; // Hide from gallery without deleting
  category: string;
  links?: {
    github?: string;
    demo?: string;
    external?: string;
  };
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export interface ProjectWithContent {
  metadata: ProjectMetadata;
  content: any;
  headings: TableOfContentsItem[];
}

/**
 * Get all project metadata from the content directory
 */
export async function getAllProjects(): Promise<ProjectMetadata[]> {
  const projectFolders = fs.readdirSync(projectsDirectory);
  
  const projects = await Promise.all(
    projectFolders
      .filter((folder) => {
        const projectPath = path.join(projectsDirectory, folder);
        return fs.statSync(projectPath).isDirectory();
      })
      .map(async (folder) => {
        const metadataPath = path.join(projectsDirectory, folder, 'metadata.ts');
        if (fs.existsSync(metadataPath)) {
          // Dynamically import the metadata
          const { metadata } = await import(`@/content/projects/${folder}/metadata`);
          const slug = metadata.slug ?? folder;
          return {
            ...(metadata as ProjectMetadata),
            coverImage: resolveCoverImage(slug, metadata.coverImage),
          };
        }
        return null;
      })
  );

  // Filter out null values and hidden projects
  // Sort by date descending
  return projects
    .filter((project): project is ProjectMetadata => project !== null && !project.hidden)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single project by slug with its content and headings
 */
export async function getProjectBySlug(slug: string): Promise<ProjectWithContent | null> {
  try {
    const projectDir = path.join(projectsDirectory, slug);
    const mdxPath = path.join(projectDir, 'index.mdx');
    const metadataPath = path.join(projectDir, 'metadata.ts');

    if (!fs.existsSync(mdxPath) || !fs.existsSync(metadataPath)) {
      return null;
    }

    // Load metadata
    const { metadata } = await import(`@/content/projects/${slug}/metadata`);
    const coverImage = resolveCoverImage(slug, metadata.coverImage);

    // Load MDX content
    const source = fs.readFileSync(mdxPath, 'utf-8');
    
    // Extract headings for table of contents
    const headings: TableOfContentsItem[] = [];
    
    const remarkExtractHeadings = () => {
      return (tree: Root) => {
        visit(tree, 'heading', (node: any) => {
          if (node.depth > 1 && node.depth <= 3) { // H2 and H3 only
            const text = node.children
              .filter((child: any) => child.type === 'text')
              .map((child: any) => child.value)
              .join('');
            
            // Generate ID from text (same as rehype-slug does)
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '');
            
            headings.push({
              id,
              text,
              level: node.depth,
            });
          }
        });
      };
    };

    // Plugin to handle directives (:::tip, :::warning, etc.)
    const remarkCallouts = () => {
      return (tree: Root) => {
        visit(tree, (node: any) => {
          if (
            node.type === 'containerDirective' ||
            node.type === 'leafDirective' ||
            node.type === 'textDirective'
          ) {
            if (node.type !== 'containerDirective') return;

            const data = node.data || (node.data = {});
            const attributes = node.attributes || {};
            const type = node.name;

            // Convert directive to JSX component
            data.hName = 'Callout';
            data.hProperties = {
              type: type,
              title: attributes.title,
            };
          }
        });
      };
    };

    // Compile MDX
    const { content } = await compileMDX({
      source,
      components: mdxComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            remarkDirective,
            remarkCallouts,
            remarkExtractHeadings,
          ],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: 'wrap',
                properties: {
                  className: ['anchor'],
                },
              },
            ],
          ],
        },
      },
    });

    return {
      metadata: {
        ...(metadata as ProjectMetadata),
        coverImage,
      },
      content,
      headings,
    };
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error);
    return null;
  }
}

/**
 * Get all project slugs for static generation
 */
export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getAllProjects();
  return projects.map((project) => project.slug);
}

/**
 * Filter projects by tags (strict AND logic)
 */
export function filterProjectsByTags(
  projects: ProjectMetadata[],
  selectedTags: string[]
): ProjectMetadata[] {
  if (selectedTags.length === 0) return projects;
  
  return projects.filter((project) =>
    selectedTags.every((tag) => project.tags.includes(tag))
  );
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(projects: ProjectMetadata[]): ProjectMetadata[] {
  return projects.filter((project) => project.featured);
}

/**
 * Sort projects by date (newest first)
 */
export function sortProjectsByDate(projects: ProjectMetadata[]): ProjectMetadata[] {
  return [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
