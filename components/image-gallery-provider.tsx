'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────
export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryContextType {
  /** Register an image; returns an unregister callback. */
  registerImage: (image: GalleryImage) => () => void;
  /** Open the lightbox starting at the image with this src. */
  openLightbox: (src: string) => void;
  /** All registered (unique) images in document order. */
  images: GalleryImage[];
}

// ── Context ────────────────────────────────────────────────────────────
const ImageGalleryContext = createContext<ImageGalleryContextType | null>(null);

export function useImageGallery() {
  return useContext(ImageGalleryContext);
}

// ── Provider + Lightbox ────────────────────────────────────────────────
export function ImageGalleryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const imagesRef = useRef<GalleryImage[]>([]);

  // ─ Registration ─────────────────────────────────────────────────────
  const registerImage = useCallback((image: GalleryImage) => {
    if (!imagesRef.current.some((img) => img.src === image.src)) {
      imagesRef.current = [...imagesRef.current, image];
      setImages([...imagesRef.current]);
    }
    return () => {
      const nextImages = imagesRef.current.filter(
        (img) => img.src !== image.src
      );
      if (nextImages.length !== imagesRef.current.length) {
        imagesRef.current = nextImages;
        setImages([...imagesRef.current]);
      }
    };
  }, []);

  // ─ Navigation helpers ───────────────────────────────────────────────
  const openLightbox = useCallback((src: string) => {
    const idx = imagesRef.current.findIndex((img) => img.src === src);
    if (idx !== -1) {
      setCurrentIndex(idx);
      setIsOpen(true);
    }
  }, []);

  const closeLightbox = useCallback(() => setIsOpen(false), []);

  const next = useCallback(() => {
    const total = imagesRef.current.length;
    if (total === 0) return;
    setCurrentIndex((i) => (i + 1) % total);
  }, []);

  const prev = useCallback(() => {
    const total = imagesRef.current.length;
    if (total === 0) return;
    setCurrentIndex((i) => (i - 1 + total) % total);
  }, []);

  // ─ Keyboard + scroll-lock ──────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          next();
          break;
        case 'Escape':
          closeLightbox();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, next, prev, closeLightbox]);

  // ─ Preload adjacent images ─────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || images.length <= 1) return;
    const preload = (offset: number) => {
      const idx = (currentIndex + offset + images.length) % images.length;
      const img = new window.Image();
      img.src = images[idx].src;
    };
    preload(1);
    preload(-1);
  }, [currentIndex, isOpen, images]);

  const currentImage = images[currentIndex];

  // ─ Render ──────────────────────────────────────────────────────────
  const contextValue = useMemo(
    () => ({ registerImage, openLightbox, images }),
    [registerImage, openLightbox, images]
  );

  return (
    <ImageGalleryContext.Provider value={contextValue}>
      {children}

      {/* ── Lightbox overlay ─────────────────────────────────────── */}
      {isOpen && currentImage && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-200"
          style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors border border-border z-10"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground bg-muted/80 px-3 py-1.5 rounded-full border border-border z-10 select-none">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Previous */}
          {images.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors border border-border z-10"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors border border-border z-10"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Image + caption */}
          <div
            className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.alt}
              decoding="async"
              className="max-w-full max-h-[calc(100vh-10rem)] w-auto h-auto object-contain rounded-md shadow-2xl pointer-events-auto cursor-zoom-out animate-in fade-in duration-150"
              onClick={closeLightbox}
            />
            {currentImage.caption && (
              <p className="text-sm text-muted-foreground text-center mt-4 italic max-w-2xl px-4 pointer-events-auto select-text">
                {currentImage.caption}
              </p>
            )}
          </div>

          {/* Keyboard hint (shown briefly) */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 select-none hidden md:block">
              ← → to navigate · Esc to close
            </div>
          )}
        </div>
      )}
    </ImageGalleryContext.Provider>
  );
}
