"use client"

import { useEffect, useRef } from "react"

export default function MouseEffects() {
  const dotRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches

    if (prefersReducedMotion || isCoarsePointer) {
      return
    }

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let dotX = pointerX
    let dotY = pointerY
    let haloX = 50
    let haloY = 45
    let frame = 0

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
    }

    const tick = () => {
      dotX += (pointerX - dotX) * 0.24
      dotY += (pointerY - dotY) * 0.24

      const targetHaloX = (pointerX / window.innerWidth) * 100
      const targetHaloY = (pointerY / window.innerHeight) * 100
      haloX += (targetHaloX - haloX) * 0.04
      haloY += (targetHaloY - haloY) * 0.04

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`
      }

      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const distanceFromBottom = maxScroll - scrollY
      
      let r = 25, g = 56, b = 154 // Base Blue
      if (maxScroll > 500 && distanceFromBottom < 1000) {
         // Interpolate to Violet (138, 43, 226)
         const progress = Math.max(0, Math.min(1, 1 - (distanceFromBottom / 1000)))
         r = 25 + (138 - 25) * progress
         g = 56 + (43 - 56) * progress
         b = 154 + (226 - 154) * progress
      }

      if (haloRef.current) {
        haloRef.current.style.setProperty("--ambient-x", `${haloX}%`)
        haloRef.current.style.setProperty("--ambient-y", `${haloY}%`)
        haloRef.current.style.setProperty("--ambient-r", Math.round(r).toString())
        haloRef.current.style.setProperty("--ambient-g", Math.round(g).toString())
        haloRef.current.style.setProperty("--ambient-b", Math.round(b).toString())
      }

      frame = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onPointerMove)
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div ref={haloRef} className="ambient-hue" aria-hidden="true" />
      <div ref={dotRef} className="cursor-follower" aria-hidden="true" />
    </>
  )
}
