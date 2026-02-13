import { Tag } from '@/types/project';

// Deterministic tag colors — hand-picked OKLCH values with good contrast in both themes.
// Using fixed values avoids hydration mismatches and ensures visual consistency.
export const tags: Record<string, Tag> = {
  cad: {
    id: 'cad',
    name: 'CAD',
    color: 'oklch(0.65 0.18 250)',     // Blue
  },
  robotics: {
    id: 'robotics',
    name: 'Robotics',
    color: 'oklch(0.68 0.19 150)',     // Teal-green
  },
  mechanical: {
    id: 'mechanical',
    name: 'Mechanical Design',
    color: 'oklch(0.70 0.17 30)',      // Warm orange
  },
  prototyping: {
    id: 'prototyping',
    name: 'Prototyping',
    color: 'oklch(0.67 0.20 310)',     // Purple
  },
  '3d-printing': {
    id: '3d-printing',
    name: '3D Printing',
    color: 'oklch(0.72 0.16 80)',      // Gold-yellow
  },
  electronics: {
    id: 'electronics',
    name: 'Electronics',
    color: 'oklch(0.66 0.19 200)',     // Cyan
  },
  automation: {
    id: 'automation',
    name: 'Automation',
    color: 'oklch(0.68 0.17 120)',     // Green
  },
  simulation: {
    id: 'simulation',
    name: 'Simulation',
    color: 'oklch(0.65 0.20 280)',     // Indigo
  },
  fabrication: {
    id: 'fabrication',
    name: 'Fabrication',
    color: 'oklch(0.70 0.18 350)',     // Rose-pink
  },
  research: {
    id: 'research',
    name: 'Research',
    color: 'oklch(0.69 0.16 60)',      // Amber
  },
};

// Helper to get all tags as array
export const getAllTags = (): Tag[] => Object.values(tags);

// Helper to get tag by ID
export const getTagById = (id: string): Tag | undefined => tags[id];

// Helper to get tags by IDs
export const getTagsByIds = (ids: string[]): Tag[] => {
  return ids.map(id => tags[id]).filter(Boolean);
};
