"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const boatFrame1 = `       |
      -+-
     __|__
    |  |  |
   /___|___\\
 \\_O_O_O_O_O_/
  \\ \\ \\ \\ \\ `

const boatFrame2 = `       |
      -+-
     __|__
    |  |  |
   /___|___\\
 \\_O_O_O_O_O_/
  / / / / / `

export default function AsciiBoat() {
  const [frame, setFrame] = useState(boatFrame1)
  const [showTooltip, setShowTooltip] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isClickable, setIsClickable] = useState(true)

  useEffect(() => {
    // Mount immediately
    setMounted(true)
    
    const frameInterval = setInterval(() => {
      setFrame(f => f === boatFrame1 ? boatFrame2 : boatFrame1)
    }, 600)

    // Initial tooltip trigger after 6s (gives the boat time to fully sail onto the screen)
    const initialTooltip = setTimeout(() => {
      setShowTooltip(true)
      // Stay visible a bit longer since it only runs once
      setTimeout(() => setShowTooltip(false), 12000)
    }, 6000)

    // Make screen clickable for 20 seconds (slightly longer than the 18s animation)
    const clickableTimeout = setTimeout(() => {
      setIsClickable(false)
    }, 20000)

    return () => {
      clearInterval(frameInterval)
      clearTimeout(initialTooltip)
      clearTimeout(clickableTimeout)
    }
  }, [])

  const scrollToBottom = () => {
    // Tell the page to reveal all content immediately
    window.dispatchEvent(new CustomEvent("portfolio:reveal-content", { detail: "reveal-only" }))
    
    // Give React a moment to render the rest of the page, then scroll to the absolute bottom
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
      })
    }, 150)
  }

  if (!mounted) return null

  return (
    <>
      {/* Full screen click target while boat is moving */}
      {isClickable && (
        <div 
          className="fixed inset-0 z-[40] cursor-pointer"
          onClick={scrollToBottom}
          aria-label="Click anywhere to trigger easter egg"
        />
      )}
      
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100vw" }}
        transition={{ duration: 18, ease: "linear" }}
        className="absolute bottom-10 left-0 z-50 flex flex-col items-center pointer-events-none"
      >
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={showTooltip ? { 
            opacity: 1, 
            y: [0, -5, 0]
          } : { 
            opacity: 0, 
            y: 10 
          }}
          transition={showTooltip ? {
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            opacity: { duration: 0.5 }
          } : { 
            duration: 0.5 
          }}
          onClick={scrollToBottom}
          className="mb-3 bg-black/90 hover:bg-black backdrop-blur-md px-5 py-3 rounded-lg border border-amber-500/50 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:border-amber-400/80 relative text-[10px] md:text-xs tracking-[0.15em] uppercase text-amber-100 font-mono pointer-events-auto cursor-pointer transition-all duration-300 font-semibold flex items-center gap-2"
        >
          <span>✨ Click to embark for Valhalla 👇</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/90 rotate-45 border-r border-b border-amber-500/50 transition-colors" />
        </motion.button>
        
        <button
          onClick={scrollToBottom}
          className="relative whitespace-pre font-mono text-xs md:text-sm text-foreground/80 dark:text-foreground/70 leading-none opacity-80 dark:opacity-70 pointer-events-auto cursor-pointer hover:opacity-100 dark:hover:opacity-100 transition-opacity border-none bg-transparent p-4 text-left"
          aria-label="Scroll to bottom easter egg"
        >
          {frame}
        </button>
      </motion.div>
    </>
  )
}
