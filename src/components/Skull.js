import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ mouse }) {
  const { scene } = useGLTF("./Skull_40.gltf"); // Load your model
  const modelRef = useRef();

  // Rotate the model based on the mouse movement, with stricter limits and inverted Y-axis
  useFrame(() => {
    if (modelRef.current) {
      // Stricter limits on the rotation
      const limitedRotationY = Math.max(
        Math.min(mouse.x * Math.PI, Math.PI / 8),
        -Math.PI / 8
      ); // Y-axis limit (±22.5 degrees)
      const limitedRotationX = Math.max(
        Math.min(-mouse.y * Math.PI, Math.PI / 12),
        -Math.PI / 12
      ); // X-axis limit (±15 degrees) and inverted

      modelRef.current.rotation.y = limitedRotationY; // Rotate horizontally with limits
      modelRef.current.rotation.x = limitedRotationX; // Rotate vertically with limits
    }
  });

  return <primitive ref={modelRef} object={scene} position={[0, 0, 0]} />;
}

export default function My3DModel() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Track mouse movement
  const handleMouseMove = (event) => {
    setMouse({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1, // Invert the Y-axis movement
    });
  };

  return (
    <div
      className=""
      onMouseMove={handleMouseMove}
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // optional: to ensure no overflow occurs
      }}
    >
      <Canvas camera={{ position: [0, 0, 2], fov: 80 }}>
        {/* Lighting */}
        <ambientLight />
        <directionalLight position={[0, 1, 1]} intensity={1} />

        {/* Model component */}
        <Model mouse={mouse} />

        {/* Controls for orbiting (optional) */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
