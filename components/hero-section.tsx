'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChevronDown } from "lucide-react"

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

export function HeroSection() {
  const [showScrollHint, setShowScrollHint] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        // User is viewing the hero section (threshold met)
        timeout = setTimeout(() => {
          setShowScrollHint(true);
        }, 5000);
      } else {
        // User scrolled away
        clearTimeout(timeout);
        setShowScrollHint(false);
      }
    }, {
      threshold: 0.8
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="min-h-[100dvh] bg-background flex flex-col relative overflow-hidden">
      {/* Background Layers Construction (Windows 11 Mica-style emulation) */}
      
      {/* 1. Base Luminosity Layer (Defines the light/dark structure) */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-white to-zinc-50 dark:from-neutral-900 dark:via-black dark:to-neutral-950 z-0" />

      {/* 2. Color Blend Layer (Injects the accent hue gently) */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30">
        {/* Top-left glow - safe from text */}
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 blur-[120px]" />
        {/* Bottom-right glow - safe from text */}
        <div className="absolute top-[30%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 blur-[120px]" />
      </div>

      {/* 3. Atmospheric Blur Layer (Smooths out the composition) */}
      <div className="absolute inset-0 z-0 backdrop-blur-[80px]" />

      {/* 4. Film Grain / Noise Layer (Texture) - High frequency static noise */}
      <div className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZmlsdGVyIGlkPSJ4Ij48ZmVUdXJYdWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idHJhbnNwYXJlbnQiLz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjeCkiIG9wYWNpdHk9IjEwMCUiLz48L3N2Zz4=')]" />

      <div className="flex-1 flex items-center justify-center relative overflow-hidden z-10">
        {/* Header with theme toggle */}
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
          <ThemeToggle />
        </div>

        {/* Hero Content */}
        <div className="text-center z-10 px-4">
          <h1 className="font-serif font-black text-4xl md:text-6xl lg:text-7xl text-foreground mb-4">
            Adrin Alias
          </h1>
          <p className="font-sans text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Mechanical Engineer
            <br />
            Graduated December 2025
          </p>
          
          <Button
            asChild
            size="lg"
            variant="outline"
            className="px-8 gap-2 border-primary/20 hover:border-primary/50 cursor-pointer"
          >
            <a
              href="https://linkedin.com/in/adrinalias"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
              Contact Me
            </a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 ${showScrollHint ? 'opacity-100' : 'opacity-100'}`}>
          {showScrollHint && (
            <span className="text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
              Scroll to explore
            </span>
          )}
          <button
            onClick={scrollToProjects}
            className="animate-bounce text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="Scroll to projects"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </div>


      {/* Seamless Transition Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-[5] pointer-events-none" />
    </section>
  );
}
