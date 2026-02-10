'use client';

import { MediaItem } from '@/types/project';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// Dynamically import ModelViewer to avoid SSR issues
const ModelViewer = dynamic(() => import('@/components/model-viewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-muted animate-pulse rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">Loading 3D model...</p>
    </div>
  ),
});

interface ProjectContentProps {
  media: MediaItem[];
}

export function ProjectContent({ media }: ProjectContentProps) {
  return (
    <div className="space-y-12">
      {media.map((item, index) => (
        <MediaRenderer key={index} item={item} />
      ))}
    </div>
  );
}

function MediaRenderer({ item }: { item: MediaItem }) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : 'light';

  switch (item.type) {
    case 'text':
      return (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {item.title && (
            <h3 className="font-serif font-bold text-2xl mb-4">{item.title}</h3>
          )}
          <p className="text-lg leading-relaxed">{item.content}</p>
        </div>
      );

    case 'image':
      return (
        <figure className="space-y-3">
          {item.title && (
            <h3 className="font-serif font-bold text-2xl mb-4">{item.title}</h3>
          )}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
            {item.url && (
              <Image
                src={item.url}
                alt={item.alt || ''}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            )}
          </div>
          {item.caption && (
            <figcaption className="text-sm text-muted-foreground text-center italic">
              {item.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'code':
      return (
        <div className="space-y-3">
          {item.title && (
            <h3 className="font-serif font-bold text-2xl">{item.title}</h3>
          )}
          <div className="rounded-lg overflow-hidden border border-border">
            <SyntaxHighlighter
              language={item.language || 'javascript'}
              style={currentTheme === 'dark' ? oneDark : oneLight}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: '0.9rem',
              }}
              showLineNumbers
            >
              {item.code || ''}
            </SyntaxHighlighter>
          </div>
          {item.caption && (
            <p className="text-sm text-muted-foreground italic">{item.caption}</p>
          )}
        </div>
      );

    case 'video':
      return (
        <figure className="space-y-3">
          {item.title && (
            <h3 className="font-serif font-bold text-2xl mb-4">{item.title}</h3>
          )}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
            {item.url && (
              <video
                src={item.url}
                controls
                className="w-full h-full"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          {item.caption && (
            <figcaption className="text-sm text-muted-foreground text-center italic">
              {item.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'model3d':
      return (
        <figure className="space-y-3">
          {item.title && (
            <h3 className="font-serif font-bold text-2xl mb-4">{item.title}</h3>
          )}
          {item.url && <ModelViewer modelUrl={item.url} />}
          {item.caption && (
            <figcaption className="text-sm text-muted-foreground text-center italic">
              {item.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}
