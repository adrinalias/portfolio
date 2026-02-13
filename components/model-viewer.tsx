'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Environment } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface ModelViewerProps {
  modelUrl: string;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function ModelViewerInner({ modelUrl }: ModelViewerProps) {
  const { theme, systemTheme } = useTheme();
  
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden border border-border bg-muted relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(isDark ? '#000000' : '#fafafa', 1);
        }}
      >
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={isDark ? '#333333' : '#cccccc'} />
            </mesh>
          }
        >
          <Stage
            intensity={0.5}
            environment="city"
            shadows={{ type: 'contact', bias: -0.001 }}
            adjustCamera={1.2}
          >
            <Model url={modelUrl} />
          </Stage>
          <Environment preset={isDark ? 'night' : 'apartment'} />
        </Suspense>
        
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.75}
          enableZoom={true}
          enablePan={false}
        />
      </Canvas>
      
      {/* Interaction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-muted-foreground pointer-events-none">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}

// Check if WebGL is available
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function ModelViewer({ modelUrl }: ModelViewerProps) {
  const [mounted, setMounted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setMounted(true);
    setWebGLSupported(isWebGLAvailable());
  }, []);

  if (!mounted) {
    return (
      <div className="w-full aspect-video bg-muted animate-pulse rounded-lg" />
    );
  }

  if (!webGLSupported) {
    return (
      <div className="w-full aspect-video rounded-lg bg-muted flex items-center justify-center border border-border">
        <div className="text-center p-8">
          <p className="text-muted-foreground mb-2">WebGL not supported</p>
          <p className="text-sm text-muted-foreground">
            Your browser doesn&apos;t support 3D graphics
          </p>
        </div>
      </div>
    );
  }

  return <ModelViewerInner modelUrl={modelUrl} />;
}
