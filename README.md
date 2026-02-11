# Engineering Portfolio Website

A modern, interactive portfolio website showcasing engineering projects with advanced features including MDX-based content management, tag-based filtering, 3D model visualization, and dynamic table of contents.

Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## 🎯 Features

- **Interactive Project Gallery**: Browse projects with tag-based filtering (strict AND logic)
- **MDX Content**: Write project documentation in Markdown with React components
- **Enhanced Formatting**: Callouts, metrics grids, code blocks with copy buttons, and more
- **Dynamic Table of Contents**: Auto-generated scrollspy navigation from heading structure
- **3D Model Support**: Interactive 3D model viewer using React Three Fiber
- **Syntax Highlighting**: Beautiful code blocks with theme-aware highlighting and copy functionality
- **Dark Mode**: Seamless dark/light theme switching
- **Responsive Design**: Mobile-first approach with touch-optimized interactions
- **Fast Performance**: Static generation with Next.js App Router and Turbopack
- **Hidden Projects**: Hide projects from gallery without deleting (perfect for drafts)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
portfolio/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Landing page with hero & gallery
│   ├── layout.tsx           # Root layout with theme provider
│   └── projects/[slug]/     # Dynamic project detail pages
│       └── page.tsx
├── components/              # React components
│   ├── project-gallery.tsx  # Filterable project grid
│   ├── project-card.tsx     # Project preview cards
│   ├── tag-filter.tsx       # Multi-select tag filter UI
│   ├── table-of-contents.tsx # Scrollspy ToC component
│   ├── model-viewer.tsx     # 3D model renderer
│   └── ui/                  # shadcn/ui components
├── content/                 # MDX content (projects)
│   └── projects/
│       ├── brake-dyno/
│       │   ├── index.mdx    # Project content
│       │   └── metadata.ts  # Project metadata
│       ├── iot-smart-blinds/
│       └── ...
├── lib/                     # Utility functions
│   ├── mdx.ts              # MDX loading & processing
│   ├── data/
│   │   ├── tags.ts         # Tag definitions
│   │   └── projects.ts     # (Legacy - being phased out)
│   └── utils.ts
├── public/                  # Static assets (images, models)
└── types/                   # TypeScript type definitions
```

## 📝 Adding New Projects

Projects are managed as MDX files with separated metadata. Follow these steps to add a new project:

### 1. Create Project Directory

Create a new folder in `content/projects/` with your project slug (URL-friendly name):

```bash
content/projects/your-project-name/
```

### 2. Create Metadata File

Create `metadata.ts` to define project metadata:

```typescript
// content/projects/your-project-name/metadata.ts
export const metadata = {
  slug: 'your-project-name',
  title: 'Your Project Title',
  shortDescription: 'Brief one-sentence description for project cards',
  coverImage: '/images/your-project-cover.jpg',
  tags: ['cad', 'prototyping', 'electronics'], // See available tags below
  date: '2024-01-15', // YYYY-MM-DD format
  featured: true, // Set to true to feature on homepage
  category: 'Mechanical Design', // Category label
  links: {
    github: 'https://github.com/username/repo',
    demo: 'https://demo.example.com',
    external: 'https://other-link.com',
  },
};
```

### 3. Create MDX Content File

Create `index.mdx` with your project documentation:

```mdx
// content/projects/your-project-name/index.mdx

# Your Project Title

Opening paragraph with project overview and context.

## Section Heading

Content goes here. You can use:
- **Bold** and *italic* text
- [Links](https://example.com)
- Lists (ordered and unordered)
- Tables, blockquotes

### Subsection

More detailed content.

## Code Blocks

\```python
def hello_world():
    print("Syntax highlighting works!")
\```

## Images

![Alt text](/images/your-image.jpg)
*Caption text here*

## Technical Specifications

| Parameter | Value |
|-----------|-------|
| Weight | 2.5 kg |
| Power | 100W |
```

### 4. Content Guidelines

- **Use H1 (`#`) for project title** (matches metadata.title)
- **Use H2 (`##`) for main sections** (appears in Table of Contents)
- **Use H3 (`###`) for subsections** (appears in Table of Contents, indented)
- Don't skip heading levels (H1 → H2 → H3, not H1 → H3)
- Add scroll margin to headings is automatic (`scroll-mt-20`)
- Use code fences with language for syntax highlighting
- Add image captions using *italic text* on the line below

### 5. MDX Formatting Features

Your projects support enhanced MDX formatting with custom components:

#### Callouts (5 types)
```mdx
:::info
Information callout with blue styling
:::

:::tip
Helpful tips with purple styling
:::

:::warning
Warnings with yellow styling
:::

:::danger
Critical alerts with red styling
:::

:::success
Success messages with green styling
:::
```

#### Metrics Display
```mdx
<MetricsGrid columns={2}>
  <Metric 
    label="Reliability" 
    value="99.9%" 
    description="Uptime over testing"
  />
  <Metric 
    label="Performance" 
    value="<100ms" 
  />
</MetricsGrid>
```

#### Enhanced Features
- ✅ **Code blocks** with syntax highlighting & copy buttons
- ✅ **External links** with auto-open and icons
- ✅ **Tables** with hover effects and responsive scrolling
- ✅ **Blockquotes** with enhanced styling
- ✅ **Images** with click-to-zoom functionality
- ✅ **Videos** with responsive embedding
- ✅ **Custom typography** with serif headings and improved spacing

**Note:** 3D model support (via React Three Fiber) is available but currently requires React 18 due to library compatibility.

**📖 Complete Guide:** See the full formatting guide at `/projects/mdx-formatting-guide` (hidden by default)

### 6. Hiding Projects

To hide a project from the gallery without deleting it:

```typescript
// In metadata.ts
export const metadata = {
  // ... other fields
  hidden: true, // Hides from gallery but keeps accessible via URL
};
```

This is useful for:
- Draft projects still in development
- Internal documentation like the formatting guide
- Seasonal or temporary projects
- Testing new content before publishing

### 7. Available Tags

Current tag IDs (defined in `lib/data/tags.ts`):
- `cad` - CAD & 3D Modeling
- `robotics` - Robotics
- `mechanical` - Mechanical Design
- `prototyping` - Prototyping
- `3d-printing` - 3D Printing
- `electronics` - Electronics
- `automation` - Automation
- `simulation` - Simulation & Analysis
- `fabrication` - Manufacturing & Fabrication
- `research` - Research

To add new tags, edit `lib/data/tags.ts`:

```typescript
export const tags: Record<string, Tag> = {
  'your-tag-id': {
    id: 'your-tag-id',
    name: 'Display Name',
    color: generateRandomColor(),
  },
  // ...
};
```

### 8. Add Images

Place images in `public/images/`:
```
public/images/your-project-name/
├── cover.jpg         # Cover image for cards
├── diagram.png
└── result.jpg
```

Reference in MDX:
```markdown
![Diagram description](/images/your-project-name/diagram.png)
```

### 9. Test Your Project

```bash
pnpm dev
```

Navigate to `/projects/your-project-name` to preview.

## 🎨 Technology Stack

### Core Framework
- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.4** - UI library
- **TypeScript 5.9.3** - Type safety

### Styling
- **Tailwind CSS 4.1.9** - Utility-first CSS with OKLCH colors
- **shadcn/ui** - Accessible component library (New York variant)
- **next-themes** - Dark mode support

### Content & Rendering
- **next-mdx-remote 5.0.0** - MDX server-side rendering
- **remark-gfm** - GitHub Flavored Markdown support
- **rehype-slug** - Auto-generate heading IDs
- **rehype-autolink-headings** - Anchor links for headings
- **gray-matter** - Frontmatter parsing
- **react-syntax-highlighter** - Code syntax highlighting

### 3D Visualization
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **three.js** - 3D graphics library

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "next": "16.1.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "tailwindcss": "4.1.9",
    "@react-three/fiber": "8.18.0",
    "@react-three/drei": "9.122.0",
    "next-mdx-remote": "5.0.0",
    "react-syntax-highlighter": "16.1.0"
  }
}
```

## 🎯 Development Workflow

### Running Locally
```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Build production bundle
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Adding Components
```bash
npx shadcn@latest add [component-name]
```

### Project Files to Modify

| What to Change | File to Edit |
|----------------|-------------|
| Add new project | Create folder in `content/projects/` |
| Add new tag | `lib/data/tags.ts` |
| Modify gallery layout | `components/project-gallery.tsx` |
| Update hero section | `components/hero-section.tsx` |
| Change theme colors | `app/globals.css` |
| Modify ToC behavior | `components/table-of-contents.tsx` |

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository in Vercel
3. Vercel auto-detects Next.js configuration
4. Deploy!

### Environment Variables
No environment variables required for basic functionality.

### Build Configuration
- **Framework:** Next.js
- **Build Command:** `pnpm build`
- **Output Directory:** `.next`
- **Node Version:** 18.x or higher

## 📄 License

Personal portfolio website - All rights reserved.

## 🤝 Contributing

This is a personal portfolio. The structure and components can serve as a reference for your own portfolio implementation.

## 📞 Contact

- **LinkedIn:** [linkedin.com/in/adrinalias](https://linkedin.com/in/adrinalias)
- **GitHub:** [github.com/adrin-alias](https://github.com/adrin-alias)

---

Built with ❤️ by Adrin Alias

