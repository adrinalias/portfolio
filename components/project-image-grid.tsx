'use client';

import { useEffect, useRef, useState } from 'react';
import { useImageGallery } from '@/components/image-gallery-provider';

/**
 * Auto-fit thumbnail grid for the project images.
 * If the article has more than 8 images the 8th slot becomes a
 * "+N more" button that opens the lightbox at position 8.
 */
export function ProjectImageGrid() {
  const gallery = useImageGallery();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [maxVisible, setMaxVisible] = useState(1);
  const THUMB_SIZE = 120;
  const GAP = 8;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateVisibleCount = (width: number) => {
      const next = Math.max(
        1,
        Math.floor((width + GAP) / (THUMB_SIZE + GAP))
      );
      setMaxVisible(next);
    };

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        updateVisibleCount(entry.contentRect.width);
      }
    });

    observer.observe(element);
    updateVisibleCount(element.getBoundingClientRect().width);

    return () => observer.disconnect();
  }, [gallery?.images.length]);

  if (!gallery || gallery.images.length === 0) return null;

  const { images, openLightbox } = gallery;
  const canShowMoreTile = images.length > maxVisible && maxVisible > 1;
  const visibleCount = canShowMoreTile
    ? Math.max(1, maxVisible - 1)
    : Math.min(images.length, maxVisible);
  const visibleImages = images.slice(0, visibleCount);
  const remaining = images.length - visibleImages.length;

  return (
    <div>
      <div ref={containerRef} className="w-full">
        <div className="flex gap-2">
          {visibleImages.map((image) => (
            <button
              key={image.src}
              className="h-[120px] w-[120px] rounded-md overflow-hidden border border-border hover:border-foreground/30 transition-all group focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 cursor-pointer"
              onClick={() => openLightbox(image.src)}
              aria-label={image.alt || 'View image'}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}

          {canShowMoreTile && remaining > 0 && (
            <button
              className="h-[120px] w-[120px] rounded-md overflow-hidden border border-border hover:border-foreground/30 transition-all flex items-center justify-center bg-muted/50 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 cursor-pointer"
              onClick={() => openLightbox(images[visibleImages.length].src)}
              aria-label={`View ${remaining} more images`}
            >
              <span className="text-xs text-muted-foreground font-medium leading-tight text-center px-1">
                +{remaining} more
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
