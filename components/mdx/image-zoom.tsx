'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useImageGallery } from '@/components/image-gallery-provider';

// Extend standard img props to allow passing all props from MDX
interface ImageZoomProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  caption?: string;
}

export function ImageZoom({ src, alt, caption, className, title, style, ...props }: ImageZoomProps) {
  const gallery = useImageGallery();
  const registerImage = gallery?.registerImage;
  const openLightbox = gallery?.openLightbox;

  // Use title as caption if caption prop is missing (common in markdown)
  const displayCaption = caption || title;

  // Register image with the gallery context (if available)
  useEffect(() => {
    if (registerImage && src && typeof src === 'string') {
      return registerImage({
        src,
        alt: alt || '',
        caption: displayCaption,
      });
    }
  }, [registerImage, src, alt, displayCaption]);

  if (!src) return null;

  const handleClick = () => {
    if (openLightbox && typeof src === 'string') {
      openLightbox(src);
    }
  };

  return (
    <figure className={cn("my-8 not-prose flex flex-col items-center", className)}>
      <div
        className="relative cursor-zoom-in group"
        onClick={handleClick}
      >
        {/*
           Using standard img to respect natural aspect ratio (no forced aspect-video)
           and allow border/radius directly on the image element.
        */}
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          decoding="async"
          className="rounded-lg border border-border bg-card shadow-sm w-auto max-w-full max-h-[500px] object-contain transition-opacity hover:opacity-95"
          {...props}
        />
      </div>
      {displayCaption && (
        <figcaption className="text-sm text-muted-foreground text-center mt-3 italic max-w-2xl px-4">
          {displayCaption}
        </figcaption>
      )}
    </figure>
  );
}
