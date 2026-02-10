export interface Tag {
  id: string;
  name: string;
  color: string; // OKLCH color value
}

export type MediaType = 'image' | 'video' | 'code' | 'model3d' | 'text';

export interface MediaItem {
  type: MediaType;
  url?: string; // For images, videos, 3D models
  alt?: string; // For images
  caption?: string;
  code?: string; // For code blocks
  language?: string; // For code syntax highlighting
  content?: string; // For text blocks
  title?: string;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string; // For card hover/tap
  coverImage: string;
  tags: string[]; // Tag IDs
  date: string; // ISO date string
  featured?: boolean;
  
  // For detail page
  longDescription: string;
  category?: string;
  links?: {
    github?: string;
    demo?: string;
    external?: string;
  };
  media: MediaItem[];
  nextProject?: string; // Slug of next project
  prevProject?: string; // Slug of previous project
}
