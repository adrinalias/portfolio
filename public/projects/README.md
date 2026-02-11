# Project Assets

This folder contains all project images, videos, and 3D models referenced in the portfolio.

## Required Directory Structure

```
public/
├── projects/
│   ├── robotic-arm/
│   │   ├── cover.jpg
│   │   ├── design.jpg
│   │   └── prototype.jpg
│   ├── heat-exchanger/
│   │   ├── cover.jpg
│   │   └── cfd.jpg
│   ├── custom-drone/
│   │   ├── cover.jpg
│   │   └── frame.jpg
│   ├── prosthetic-hand/
│   │   ├── cover.jpg
│   │   └── assembly.jpg
│   ├── cnc-router/
│   │   └── cover.jpg
│   └── solar-tracker/
│       ├── cover.jpg
│       └── system.jpg
├── models/
│   ├── robotic-arm.glb
│   └── prosthetic-hand.glb
└── placeholder.svg (fallback image)
```

## Image Requirements

- **Cover images**: 1200x900px (4:3 aspect ratio) for optimal display
- **Detail images**: Any resolution, will be optimized by Next.js Image component
- **File formats**: JPG, PNG, or WebP
- **3D models**: GLB or GLTF format

## Adding Your Own Images

1. Create the project subfolder in `/public/projects/`
2. Add your images inside the project folder
3. For cover images, use `cover.jpg` or `cover.png` to auto-select the cover
4. For 3D models, place GLB files in `/public/models/`
5. Update image paths in MDX or metadata if needed

## Placeholder

Until you add real images, a gray placeholder will be shown. You can replace
this by adding your images to the appropriate folders or setting
`coverImage` in `metadata.ts`.
