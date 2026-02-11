# Engineering Portfolio Website

A modern, interactive portfolio website showcasing engineering projects with MDX-based content, tag filtering, 3D model visualization, and dynamic table of contents.

Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Features

- **Interactive Project Gallery**: Browse projects with tag-based filtering (strict AND logic)
- **MDX Content**: Project pages are authored in MDX with custom components
- **Dynamic Table of Contents**: Scrollspy navigation generated from headings
- **3D Model Support**: Interactive model viewer using React Three Fiber
- **Responsive Design**: Mobile-first layout and touch-friendly interactions
- **Static Performance**: Pre-rendered project pages with the App Router

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
pnpm build
pnpm start
```

## File Roles

- [README.md](README.md) is the quick orientation, setup, and high-level overview.
- [PROJECTS_GUIDE.md](PROJECTS_GUIDE.md) is the single source for project editing/adding steps.
- The MDX formatting walkthrough lives in the hidden project at `/projects/mdx-formatting-guide`.

## Project Structure (Overview)

```
portfolio/
├── app/                      # App Router pages
├── components/               # UI + MDX components
├── content/projects/         # Project source of truth (MDX + metadata)
├── lib/                      # MDX loading + utilities
├── public/projects/          # Project images (covers, media)
└── types/                    # TypeScript definitions
```

## Project Management

See [PROJECTS_GUIDE.md](PROJECTS_GUIDE.md) for editing and adding projects, tags, and images.

## Technology Stack

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

## Key Dependencies

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

## Development Workflow

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

## Deployment

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

