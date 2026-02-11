# Project Content Structure

This directory contains all project content written in MDX (Markdown + JSX).

## Directory Structure

```
content/
  projects/
    brake-dyno/
      index.mdx        # Main project content
      metadata.ts      # Project metadata (tags, date, category, etc.)
      images/          # Project-specific images
    project-slug/
      index.mdx
      metadata.ts
      images/
```

## MDX Content Guidelines

### Headings

Use proper heading hierarchy for automatic table of contents generation:

```mdx
# Project Title (H1 - used once for main title)

## Section Title (H2 - major sections)

### Subsection (H3 - detailed topics)
```

### Code Blocks

Specify the language for proper syntax highlighting:

````mdx
```cpp
// Your C++ code here
void setup() {
  // ...
}
```

```python
# Your Python code here
def main():
    pass
```
````

### Images

```mdx
![Alt text](/projects/project-slug/image.jpg)
```

Or use the Image component for Next.js optimization:

```mdx
<Image src="/projects/project-slug/image.jpg" alt="Description" width={800} height={600} />
```

### Custom Components

You can embed React components directly:

```mdx
<ModelViewer src="/models/design.glb" />

<Callout type="info">
  Important information here
</Callout>
```

## Metadata File

Each project requires a `metadata.ts` file with the following structure:

```typescript
export const metadata = {
  slug: 'project-slug',           // URL-friendly identifier
  title: 'Project Title',         // Display name
  shortDescription: 'Brief...',   // For cards and previews
  coverImage: '/path/to/image',   // Card thumbnail
  tags: ['tag1', 'tag2'],        // For filtering
  date: 'YYYY-MM-DD',            // Project completion date
  featured: true,                 // Show on homepage
  category: 'Category Name',      // Project type
  links: {                        // Optional external links
    github: 'https://...',
    demo: 'https://...',
    external: 'https://...',
  },
};
```

## Adding a New Project

1. Create a new folder: `content/projects/your-project-slug/`
2. Add `index.mdx` with your content
3. Add `metadata.ts` with project information
4. (Optional) Add an `images/` folder for project-specific assets
5. The project will automatically appear in the gallery

## Supported Tags

Tags are defined in `lib/data/tags.ts`. Current tags include:
- `electronics`
- `automation`
- `cad`
- `prototyping`
- `3d-printing`
- `mechanical`
- `fabrication`
- `simulation`
- `research`

Add new tags in `lib/data/tags.ts` if needed.
