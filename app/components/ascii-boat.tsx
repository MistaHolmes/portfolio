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

    return () => {
      clearInterval(frameInterval)
      clearTimeout(initialTooltip)
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
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "100vw" }}
      transition={{ duration: 18, ease: "linear" }}
      className="absolute bottom-10 left-0 z-0 flex flex-col items-center pointer-events-none"
    >
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showTooltip ? 1 : 0, y: showTooltip ? 0 : 10 }}
        transition={{ duration: 1 }}
        onClick={scrollToBottom}
        className="mb-3 bg-black/80 hover:bg-black backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 shadow-xl relative text-[10px] md:text-xs tracking-[0.2em] uppercase text-white font-mono pointer-events-auto cursor-pointer transition-colors"
      >
        the Truth lies at the bottom
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/80 rotate-45 border-r border-b border-white/20" />
      </motion.button>
      
      <button
        onClick={scrollToBottom}
        className="whitespace-pre font-mono text-xs md:text-sm text-foreground/80 dark:text-foreground/70 leading-none opacity-80 dark:opacity-70 pointer-events-auto cursor-pointer hover:opacity-100 dark:hover:opacity-100 transition-opacity border-none bg-transparent p-0 text-left"
        aria-label="Scroll to bottom easter egg"
      >
        {frame}
      </button>
    </motion.div>
  )
}
