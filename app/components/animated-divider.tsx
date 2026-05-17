"use client"

import { motion } from "framer-motion"

export function AnimatedDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full h-px bg-linear-to-r from-transparent via-border to-transparent origin-center my-4 md:my-8"
    />
  )
}
