# Project Content Structure

This directory contains all project content written in MDX (Markdown + JSX). Each project is self-contained with its own metadata and content files.

## Directory Structure

```
content/projects/
├── README.md                     # This file
├── brake-dyno/
│   ├── index.mdx               # Main project content (markdown + JSX)
│   ├── metadata.ts             # Project metadata
│   └── images/                 # (Optional) Project-specific images
├── iot-smart-blinds/
│   ├── index.mdx
│   ├── metadata.ts
│   └── images/
├── air-heaters/
│   ├── index.mdx
│   ├── metadata.ts
│   └── images/
└── your-new-project/
    ├── index.mdx
    ├── metadata.ts
    └── images/
```

## Project Files

### metadata.ts

Defines project listing information (used in galleries, cards, and navigation):

```typescript
export const metadata = {
  slug: 'project-name',                    // Unique identifier
  title: 'Project Title',                  // Display name
  shortDescription: 'One-line summary',    // Used in cards
  tags: ['tag1', 'tag2'],                  // For filtering
  date: '2025-02-11',                      // ISO format
  featured: false,                         // Homepage feature flag
  category: 'Category',                    // Grouping
  links: {                                 // Optional links
    github: 'https://github.com/...',
    demo: 'https://demo.example.com',
    external: 'https://example.com',
  },
};
```

### index.mdx

Contains the full project description using Markdown + JSX. Automatically compiled to React components.

## MDX Content Guidelines

### Headings (Auto Table of Contents)

The system generates a table of contents from H2 and H3 headings:

```markdown
# Project Title (H1 - main title, not in TOC)

## Major Section (H2 - appears in TOC)

### Subsection (H3 - appears in TOC)
```

The table of contents appears automatically in a sidebar on the project page.

### Code Blocks with Syntax Highlighting

Always specify the language:

```markdown
\`\`\`cpp
// C++ example
void setup() { }
\`\`\`

\`\`\`python
# Python example
def hello():
    print("world")
\`\`\`

\`\`\`typescript
// TypeScript example
const greeting: string = "hello";
\`\`\`

\`\`\`js
// JavaScript example
console.log("hello");
\`\`\`

\`\`\`bash
# Shell/bash
npm install package-name
\`\`\`

\`\`\`json
{
  "key": "value"
}
\`\`\`
```

### Images

Reference images using absolute paths:

```markdown
![Description of image](/projects/project-slug/image-name.png)
```

**Cover image** (auto-detected):
- Place at: `public/projects/[slug]/cover.jpg` or `cover.png`
- Automatically used as the hero image on the project page
- Falls back to `coverImage` in metadata if not found

### Text Formatting

```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
`inline code`

[Links](https://example.com)
```

### Lists

```markdown
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item
```

### Emphasis Blocks (Callouts)

Create styled callout boxes:

```markdown
:::tip
Helpful tip or best practice.
:::

:::warning
Warning or caution message.
:::

:::note
General note or information.
:::
```

## Working with Images

**Cover Images** (hero image on project page):
```
public/projects/my-project/cover.jpg
```

**Content Images** (referenced in MDX):
```
public/projects/my-project/diagram.png
markdown reference: ![Diagram](/projects/my-project/diagram.png)
```

Or optionally organize in `images/` subfolder:
```
public/projects/my-project/images/diagram.png
markdown reference: ![Diagram](/projects/my-project/images/diagram.png)
```

## How It Works

1. **Build Time**: The system scans this directory and:
   - Reads `metadata.ts` from each project folder
   - Compiles `index.mdx` to React components
   - Generates table of contents from headings
   - Pre-renders all project pages as static HTML

2. **Runtime**: Projects are served as fast static pages with no client-side compilation

3. **No Duplication**: Content lives in MDX files, making edits simple and maintainable

## Adding a New Project

1. Create folder: `content/projects/my-new-project/`
2. Create `metadata.ts` with project info
3. Create `index.mdx` with project content
4. (Optional) Add `public/projects/my-new-project/cover.jpg`
5. Run `pnpm build` - done!

See [PROJECTS_GUIDE.md](../PROJECTS_GUIDE.md) for detailed instructions.
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
  coverImage: '/path/to/image',   // Card thumbnail (fallback if no cover.jpg/png)
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
5. (Optional) Add `public/projects/your-project-slug/cover.jpg` or `cover.png`
6. The project will automatically appear in the gallery

## Cover Images

If `public/projects/<slug>/cover.jpg` or `cover.png` exists, it is used as the
project cover image at build time. Otherwise, `metadata.coverImage` is used as
the fallback.

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
