import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// ./src/components/images/Skull_40.gltf

function SkullModel () {
  // const gltf = useLoader(GLTFLoader, "./Skull_40.gltf");
  const gltf = useLoader(GLTFLoader, "../Skull_40.gltf");
  return <primitive object={gltf.scene} />;
}



function My3DModel () {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} intensity={1} />
      <SkullModel />
      <OrbitControls />
    </Canvas>
  );
};

export default My3DModel;
