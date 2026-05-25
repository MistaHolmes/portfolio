"use client"

import * as THREE from "three"
import React, { Suspense, useRef, ReactNode, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { CameraControls, Environment, Html, useProgress, Clouds, Cloud, Sparkles } from "@react-three/drei"
import Model from "../viking-ship/Model"
import { X, Pause, Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface VikingShipModalProps {
  isOpen: boolean
  onClose: () => void
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-black/80 font-mono text-sm uppercase tracking-widest whitespace-nowrap bg-white/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/40">
        Loading... {progress.toFixed(0)}%
      </div>
    </Html>
  )
}

function AnimatedClouds() {
  const group = useRef<THREE.Group>(null!)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    // Wait for the initial animation to finish before showing clouds
    const timer = setTimeout(() => setMounted(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <group ref={group}>
      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="#ffdfd1" position={[0, -2, -15]} speed={0.2} opacity={0.4} />
        <Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="#fff0ea" position={[15, 2, -10]} speed={0.15} opacity={0.3} />
        <Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="#ffd4c4" position={[-15, 2, -10]} speed={0.25} opacity={0.3} />
      </Clouds>
    </group>
  )
}

function Rig({ children, isAnimating }: { children: ReactNode, isAnimating: boolean }) {
  const outer = useRef<THREE.Group>(null!)
  const inner = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => {
    if (!isAnimating) {
      outer.current.position.y = THREE.MathUtils.lerp(outer.current.position.y, 0, 0.05)
      inner.current.rotation.y = THREE.MathUtils.lerp(inner.current.rotation.y, 0, 0.05)
      inner.current.position.z = THREE.MathUtils.lerp(inner.current.position.z, 0, 0.05)
      inner.current.position.y = THREE.MathUtils.lerp(inner.current.position.y, 0, 0.05)
      return
    }
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

export default function VikingShipModal({ isOpen, onClose }: VikingShipModalProps) {
  const [isAnimating, setIsAnimating] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cameraControlsRef = useRef<any>(null)

  useEffect(() => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.dollyToCursor = true
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-[#fff0ea]/70 backdrop-blur-xl" style={{
              backgroundImage: `
                radial-gradient(circle at 15% 50%, rgba(255, 255, 255, 0.4), transparent 25%),
                radial-gradient(circle at 85% 30%, rgba(255, 255, 255, 0.5), transparent 25%),
                repeating-linear-gradient(45deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 10px),
                repeating-linear-gradient(-45deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 1px, transparent 1px, transparent 15px)
              `,
              mixBlendMode: "overlay"
            }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fff0ea]/80 to-[#fff0ea]/60 backdrop-blur-md" />

            <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
              <button 
                onClick={() => setIsAnimating(!isAnimating)}
                className="flex items-center gap-2 justify-center px-4 h-10 rounded-full bg-white/20 hover:bg-white/40 text-black/70 hover:text-black transition-all backdrop-blur-md border border-white/30 font-mono text-xs uppercase tracking-widest"
              >
                {isAnimating ? <><Pause className="w-4 h-4" /> Pause Animation</> : <><Play className="w-4 h-4" /> Play Animation</>}
              </button>
              <button 
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-black/70 hover:text-black transition-all backdrop-blur-md border border-white/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="absolute bottom-6 left-6 z-10 text-black/50 font-mono text-xs uppercase tracking-widest bg-white/20 px-3 py-1.5 rounded-md backdrop-blur-md border border-white/20 pointer-events-none">
              [ Drag to rotate ] [ Scroll to zoom ]
            </div>

            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <Canvas className="w-full h-full !block" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} linear camera={{ position: [0, 15, 30], fov: 70 }} gl={{ alpha: true, toneMappingExposure: 1.5 }}>
                <ambientLight intensity={2.5} />
                <directionalLight position={[10, 10, 5]} intensity={3.5} color="#ffece0" />
                <directionalLight position={[-10, -10, -5]} intensity={2.0} color="#ffdfd1" />
                <Suspense fallback={<Loader />}>
                  <Rig isAnimating={isAnimating}>
                    <Model />
                    <AnimatedClouds />
                  </Rig>
                  <Sparkles count={150} scale={40} size={3} speed={0.3} opacity={0.2} color="#ffdfd1" />
                </Suspense>
                <Environment preset="sunset" environmentIntensity={1.5} />
                <CameraControls ref={cameraControlsRef} makeDefault dollyToCursor={true} maxDistance={45} />
              </Canvas>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
