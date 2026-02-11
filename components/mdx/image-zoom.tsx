'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ImageZoomProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function ImageZoom({ src, alt, caption, width, height }: ImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <figure className="my-8 not-prose">
        <div
          className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted border border-border cursor-zoom-in hover:opacity-90 transition-opacity"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
        {caption && (
          <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              quality={100}
            />
          </div>
        </div>
      )}
    </>
  );
}
