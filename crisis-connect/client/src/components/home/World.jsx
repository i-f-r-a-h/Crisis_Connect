import * as THREE from 'three'
import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Html, OrbitControls, Environment, ContactShadows } from '@react-three/drei'


function Model(props) {
  const { nodes, materials } = useGLTF('/earth.gltf')
  return (
    <group rotation={[-Math.PI / 2, 0, Math.PI]} {...props} dispose={null}>
      <mesh geometry={nodes['URF-Height_Lampd_Ice_0'].geometry} material={materials.Lampd_Ice} />
      <mesh geometry={nodes['URF-Height_watr_0'].geometry} material={materials.watr} material-roughness={0} />
      <mesh geometry={nodes['URF-Height_Lampd_0'].geometry} material={materials.Lampd} material-color="lightgreen">
      </mesh>
    </group>
  )
}



export default function Experience() {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} camera={{ position: [5, 0, 0], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <Model position={[2, 0.25, -1]} />
      <OrbitControls autoRotate autoRotateSpeed={4} enablePan={false} enableZoom={false}  />

    </Canvas>
  )
}
