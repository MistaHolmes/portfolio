"use client"

import * as THREE from "three"
import React, { Suspense, useRef, ReactNode } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Html, useProgress } from "@react-three/drei"
import Model from "./Model"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-black/80 font-mono text-sm uppercase tracking-widest whitespace-nowrap">
        Loading... {progress.toFixed(0)}%
      </div>
    </Html>
  )
}

function Rig({ children }: { children: ReactNode }) {
  const outer = useRef<THREE.Group>(null!)
  const inner = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    outer.current.position.y = THREE.MathUtils.lerp(outer.current.position.y, 0, 0.05)
    inner.current.rotation.y = Math.sin(t / 8) * Math.PI
    inner.current.position.z = 5 + -Math.sin(t / 2) * 10
    inner.current.position.y = -5 + Math.sin(t / 2) * 2
  })
  return (
    <group position={[0, -100, 0]} ref={outer}>
      <group ref={inner}>{children}</group>
    </group>
  )
}

export default function VikingShipPage() {
  return (
    <div className="w-full h-screen bg-[#fff0ea] overflow-hidden relative">
      <Link href="/" className="absolute top-8 left-8 z-20 text-black/50 hover:text-black transition-colors flex items-center gap-2 font-mono text-sm uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" />
        Return
      </Link>
      
      <div className="absolute bottom-8 left-8 z-10 text-black/40 font-mono text-xs pointer-events-none">
        [ Drag to rotate ] [ Scroll to zoom ]
      </div>

      <Canvas linear camera={{ position: [0, 15, 30], fov: 70 }}>
        <color attach="background" args={['#fff0ea']} />
        <fog attach="fog" args={['#fff0ea', 10, 60]} />
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <Suspense fallback={<Loader />}>
          <Rig>
            <Model />
          </Rig>
        </Suspense>
        <Environment preset="sunset" />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
