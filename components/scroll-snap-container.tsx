'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollSnapContainerProps {
  children: React.ReactNode;
  className?: string;
  snapOffset?: number;
}

export function ScrollSnapContainer({
  children,
  className = '',
  snapOffset = 8,
}: ScrollSnapContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const projectsOffsetRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateProjectsOffset = () => {
      const projectsSection = container.querySelector<HTMLElement>('#projects');
      if (!projectsSection) return;
      projectsOffsetRef.current = projectsSection.offsetTop;
    };

    const handleScroll = () => {
      const shouldSnap = container.scrollTop <= projectsOffsetRef.current - snapOffset;
      setSnapEnabled(shouldSnap);
    };

    updateProjectsOffset();
    handleScroll();

    const resizeObserver = new ResizeObserver(() => {
      updateProjectsOffset();
      handleScroll();
    });

    resizeObserver.observe(container);
    window.addEventListener('resize', updateProjectsOffset);
    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateProjectsOffset);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [snapOffset]);

  return (
    <div
      ref={containerRef}
      className={`${className} ${snapEnabled ? 'snap-y snap-mandatory' : ''}`.trim()}
    >
      {children}
    </div>
  );
}
