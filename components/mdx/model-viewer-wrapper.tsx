'use client';

import dynamic from 'next/dynamic';

const ModelViewer = dynamic(() => import('@/components/model-viewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-muted animate-pulse rounded-lg flex items-center justify-center border border-border">
      <p className="text-muted-foreground">Loading 3D model...</p>
    </div>
  ),
});

interface ModelViewerWrapperProps {
  modelUrl: string;
}

export function ModelViewerWrapper({ modelUrl }: ModelViewerWrapperProps) {
  return <ModelViewer modelUrl={modelUrl} />;
}
