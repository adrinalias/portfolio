/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ThreeElements } from '@react-three/fiber';

// Extend JSX IntrinsicElements with Three.js fiber elements for React 19
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      primitive: { object: any; [key: string]: any };
    }
  }
}

export {};
