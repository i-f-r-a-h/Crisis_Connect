import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Sky, OrbitControls, Stage, Environment
} from '@react-three/drei'
import { Model } from './model'

export default function Viewer() {

  
  return (
    <Canvas  camera={{ position: [5, 0, 0], fov: 50 }} className="experience">
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <Model  scale={1.3}  position={[1, 0, -1.5]}   />
        <Environment preset="night"  />
      </Suspense>
      {/* <OrbitControls /> */}
    </Canvas>
  )
}

