import '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: any;
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      group: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      spotLight: any;
    }
  }
}

export {};
