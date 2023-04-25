import * as THREE from 'three'
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Sky, OrbitControls, Stage, Environment
} from '@react-three/drei'
import { isBrowser } from 'react-device-detect';
import { useGLTF } from "@react-three/drei";

function Model(props) {
  const { nodes, materials } = useGLTF("/planet.glb");

  const myMesh = React.useRef();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.set(0.1 + Math.cos(a / 4.5) / 10, Math.sin(a / 4) / 4, 0.3 - (1 + Math.sin(a / 4)) / 8)
    myMesh.current.rotation.x = (1 + Math.sin(a / 2)) / 10;
    myMesh.current.rotation.y = a * 0.1

  });

  return (
    <group {...props} dispose={null}  ref={myMesh}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_Planet_0.geometry}
        material={materials.Planet}    
      />
    </group>
  );
}

function Viewer() {
  const lightRef = useRef()

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45, rotation: [0, 0, 0] }}  performance={{ min: 0.1 }} onCreated={({ gl }) => {
      gl.gammaInput = true
      gl.toneMapping = THREE.ACESFilmicToneMapping
    }} className="experience">

      <Suspense fallback={null}>
        <ambientLight ref={lightRef} intensity={0.4} color={'#e5e3ff'} position={[15, 15, 15]} />
        <spotLight position={[1, 6, 1.5]} angle={0.2} penumbra={1} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
        <spotLight position={[-5, 5, -1.5]} angle={0.03} penumbra={1} intensity={2} castShadow shadow-mapSize={[1024, 1024]} />
        <spotLight position={[5, 5, -5]} angle={0.3} penumbra={1} intensity={2} castShadow={true} shadow-mapSize={[256, 256]} color="#ffffc0" />
        <Model scale={1.6} lightRef={lightRef} />
        <Environment preset="night" />
      </Suspense>

    </Canvas>
  )
}

export default Viewer;

