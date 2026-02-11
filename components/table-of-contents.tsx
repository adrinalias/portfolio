'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { TableOfContentsItem } from '@/lib/mdx';

interface TableOfContentsProps {
  headings: TableOfContentsItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0.1,
      }
    );

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Account for header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="space-y-1">
      <p className="text-sm font-semibold mb-3">On this page</p>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              'transition-all',
              heading.level === 3 && 'pl-4'
            )}
          >
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                'text-left w-full hover:text-foreground transition-colors',
                activeId === heading.id
                  ? 'text-foreground font-medium border-l-2 border-foreground pl-3 -ml-px'
                  : 'text-muted-foreground border-l-2 border-transparent pl-3 -ml-px'
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
