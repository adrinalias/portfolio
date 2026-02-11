'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Extend standard img props to allow passing all props from MDX
interface ImageZoomProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  caption?: string; 
}

export function ImageZoom({ src, alt, caption, className, title, style, ...props }: ImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!src) return null;

  // Use title as caption if caption prop is missing (common in markdown)
  const displayCaption = caption || title;

  return (
    <>
      <figure className={cn("my-8 not-prose flex flex-col items-center", className)}>
        <div 
          className="relative cursor-zoom-in group"
          onClick={() => setIsOpen(true)}
        >
          {/* 
             Using standard img to respect natural aspect ratio (no forced aspect-video) 
             and allow border/radius directly on the image element. 
          */}
          <img
            src={src}
            alt={alt || ''}
            className="rounded-lg border border-border bg-card shadow-sm w-auto max-h-[500px] object-contain transition-opacity hover:opacity-95"
            {...props}
          />
        </div>
        {displayCaption && (
          <figcaption className="text-sm text-muted-foreground text-center mt-3 italic max-w-2xl px-4">
            {displayCaption}
          </figcaption>
        )}
      </figure>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors border border-border z-10"
            onClick={() => setIsOpen(false)}
            aria-label="Close zoom"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
             <img
              src={src}
              alt={alt || ''}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-md shadow-2xl pointer-events-auto cursor-zoom-out"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
