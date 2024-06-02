import React, { useRef} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Cube() {
  const groupRef = useRef();

  // Rotate the cube in the animation loop
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.01;
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Solid red color */}
      <mesh
        scale={[2, 2, 2]} // Set the scale to make the cube bigger
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={0xff0000} />
      </mesh>
      {/* Black borders */}
      <mesh scale={[2.05, 2.05, 2.05]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={0x000000} wireframe />
      </mesh>
    </group>
  );
}

function RotatingGlobal() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube />
    </Canvas>
  );
}

export default RotatingGlobal;
