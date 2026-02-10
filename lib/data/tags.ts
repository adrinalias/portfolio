import { Tag } from '@/types/project';

// Generate random OKLCH color with good contrast
function generateRandomColor(): string {
  // Lightness: 65-75% for good contrast in both themes
  const lightness = 0.65 + Math.random() * 0.1;
  // Chroma: 0.15-0.25 for vibrant but not oversaturated
  const chroma = 0.15 + Math.random() * 0.1;
  // Hue: any value 0-360
  const hue = Math.random() * 360;
  
  return `oklch(${lightness.toFixed(2)} ${chroma.toFixed(2)} ${hue.toFixed(0)})`;
}

// Tag definitions with random colors
export const tags: Record<string, Tag> = {
  cad: {
    id: 'cad',
    name: 'CAD',
    color: generateRandomColor(),
  },
  robotics: {
    id: 'robotics',
    name: 'Robotics',
    color: generateRandomColor(),
  },
  mechanical: {
    id: 'mechanical',
    name: 'Mechanical Design',
    color: generateRandomColor(),
  },
  prototyping: {
    id: 'prototyping',
    name: 'Prototyping',
    color: generateRandomColor(),
  },
  '3d-printing': {
    id: '3d-printing',
    name: '3D Printing',
    color: generateRandomColor(),
  },
  electronics: {
    id: 'electronics',
    name: 'Electronics',
    color: generateRandomColor(),
  },
  automation: {
    id: 'automation',
    name: 'Automation',
    color: generateRandomColor(),
  },
  simulation: {
    id: 'simulation',
    name: 'Simulation',
    color: generateRandomColor(),
  },
  fabrication: {
    id: 'fabrication',
    name: 'Fabrication',
    color: generateRandomColor(),
  },
  research: {
    id: 'research',
    name: 'Research',
    color: generateRandomColor(),
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
