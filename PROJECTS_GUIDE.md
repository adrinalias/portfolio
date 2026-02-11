# Project Management Guide

This guide explains how to edit existing projects and add new ones using the MDX-based system. It focuses on file roles and workflow, and intentionally avoids MDX formatting details.

## File Roles

- `content/projects/[slug]/index.mdx`: Project content and narrative (source of truth for the page body).
- `content/projects/[slug]/metadata.ts`: Project listing metadata (title, tags, date, links).
- `public/projects/[slug]/cover.jpg`: Optional cover image used as the hero image and card art.
- `lib/mdx.ts`: MDX loader and content pipeline (project discovery, compilation, TOC).
- `lib/data/tags.ts`: Tag definitions and display names/colors.
- `lib/data/projects.ts`: Compatibility wrapper that re-exports MDX-driven data.

For MDX formatting examples and components, see the hidden project at `/projects/mdx-formatting-guide`.

## System Architecture

The project system uses content-driven architecture:

```
content/projects/
  ├── project-slug/
  │   ├── index.mdx         # Project content (markdown + JSX)
  │   ├── metadata.ts       # Project metadata (title, tags, date, etc.)
  └── another-project/
```

- **Content files** (`index.mdx`) contain the full project description and media
- **Metadata files** (`metadata.ts`) provide listing info for project galleries
- **MDX system** compiles and loads projects at build/runtime
- **No manual data duplication** - edit once, updates everywhere

## Editing Existing Projects

### 1. Update Project Metadata

Edit `content/projects/[slug]/metadata.ts`:

```typescript
export const metadata = {
  slug: 'my-project',              // Unique identifier, used in URLs
  title: 'Project Title',          // Displayed in galleries and header
  shortDescription: 'One-liner',   // Used in cards and hover tooltips
  tags: ['tag1', 'tag2'],          // For filtering and categorization
  date: '2025-02-11',              // ISO date format (YYYY-MM-DD)
  featured: true,                  // Show in featured section (optional, default: false)
  category: 'Category Name',       // Grouping/context
  links: {                         // External links (all optional)
    github: 'https://github.com/...',
    demo: 'https://demo.example.com',
    external: 'https://example.com',
  },
};
```

**Metadata fields:**
- `slug`: Must match the folder name
- `title`: Project title (shown in page header)
- `shortDescription`: 1-2 sentences for cards
- `tags`: Array of tag IDs (see available tags in [lib/data/tags.ts](lib/data/tags.ts))
- `date`: When you completed/published it
- `featured`: Show in featured section (default: false)
- `category`: Project category for context
- `links`: GitHub repo, demo, or other resources

### 2. Update Project Content

Edit `content/projects/[slug]/index.mdx` with the project narrative, images, and sections. Keep the H1 title aligned with `metadata.title` for consistency.

### 3. Add Project Images

All project media lives in `public/projects/[slug]/`. Reference files from MDX using `/projects/[slug]/filename.ext`.

Cover image: Place at `public/projects/[slug]/cover.jpg` (or `cover.png`) to auto-populate the hero image.

## Adding New Projects

### Step 1: Create the Project Directory

```bash
mkdir content/projects/my-new-project
```

### Step 2: Create metadata.ts

Create `content/projects/my-new-project/metadata.ts`:

```typescript
export const metadata = {
  slug: 'my-new-project',
  title: 'My New Project Title',
  shortDescription: 'Brief description of what the project is.',
  tags: ['tag1', 'tag2'],
  date: '2026-02-11',
  featured: false,
  category: 'Category Name',
  links: {
    github: 'https://github.com/...',
  },
};
```

### Step 3: Create index.mdx

Create `content/projects/my-new-project/index.mdx` with your project content:

```markdown
# My New Project

Your project description here.

## Section 1

Details and content...

## Section 2

More details...

## Results

What you achieved...
```

### Step 4: Add Cover Image

Place image at: `public/projects/my-new-project/cover.jpg`

If no cover image is found, the system falls back to the `coverImage` field in metadata.

### Step 5: Build & Deploy

```bash
pnpm build
pnpm dev  # View locally
```

The project will automatically appear on your portfolio!

## Available Tags

See [lib/data/tags.ts](lib/data/tags.ts) for the authoritative list of tag IDs and display names.

## How It Works

1. **Build time**: `pnpm build` scans `content/projects/`, loads `metadata.ts`, compiles `index.mdx`, extracts headings, and resolves cover images.

2. **Runtime**: Project pages are pre-rendered as static HTML.

3. **Import paths**: Use `@/lib/mdx`, `@/lib/data/tags`, and `@/types/project` for project data and types.

## Important Notes

- **Single source of truth**: Project content and metadata live under `content/projects/[slug]/`.
- **Automatic slugs**: Project slugs are determined by folder names.
- **Table of contents**: Generated automatically from headings in `index.mdx`.
- **Cover images**: Auto-detected from `public/projects/[slug]/cover.{jpg,png}`.

## Troubleshooting

**Project not appearing?**
- Check that `metadata.ts` has a `slug` field that matches the folder name
- Ensure `index.mdx` exists
- Rebuild with `pnpm build`

**Images not loading?**
- Cover images: Should be at `public/projects/[slug]/cover.jpg`
- In-content images: Use `/projects/[slug]/filename.png` path

**Styling issues?**
- The system uses Tailwind CSS
- Components are in `@/components/mdx`
- Extended functionality available via custom components

## File Structure Example

```
content/projects/my-awesome-project/
├── metadata.ts
└── index.mdx

public/projects/my-awesome-project/
├── cover.jpg
├── diagram.png
├── screenshot.jpg
└── code-flow.svg
```

That's it! Happy building! 🚀
