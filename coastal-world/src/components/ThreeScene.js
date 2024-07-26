import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Water } from 'three/examples/jsm/objects/Water';
import * as THREE from 'three';

const Terrain = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[1000, 1000]} />
      <shadowMaterial transparent opacity={0.4} />
    </mesh>
  );
};

const WaterComponent = () => {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta;
    }
  });

  const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
  const water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      'https://threejs.org/examples/textures/waternormals.jpg',
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: false,
  });

  return (
    <primitive
      object={water}
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -10, 0]}
    />
  );
};

const ThreeScene = () => {
  const cameraRef = useRef();

  return (
    <div>
      <Canvas camera={{ position: [0, 0, 10] }} ref={cameraRef}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Sky />
        <WaterComponent />
        <Terrain />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
