"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
}

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <motion.section
      ref={ref}
      id="about"
      className="section-spacing"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div className="section-heading" variants={itemVariants}>
        <h2>About Me</h2>
      </motion.div>

      <motion.div
        className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]"
        variants={itemVariants}
      >
        <div className="flex justify-center lg:justify-start">
          <motion.div
            className="relative h-64 w-64 overflow-hidden rounded-full border border-border/80 shadow-2xl md:h-80 md:w-80"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <Image
              src="/pfp.png"
              alt="Abhash Behera"
              width={320}
              height={320}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 dark:opacity-100"
              priority
            />
            <Image
              src="/pfp_lg.png"
              alt="Abhash Behera"
              width={320}
              height={320}
              className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-300 dark:opacity-0"
              priority
            />
          </motion.div>
        </div>

        <div className="mx-auto max-w-3xl text-center lg:text-left">
          <p className="text-lg leading-8 text-foreground/75">
            I&apos;m Abhash Behera, a developer with a strong interest in AI, systems, automation, and software engineering. I enjoy building scalable and practical solutions while understanding how things work beyond the surface level. My approach to technology is rooted in curiosity, analytical thinking, and creating products that are both efficient and reliable.
          </p>
          <p className="mt-5 text-lg leading-8 text-foreground/75">
            Beyond development, I&apos;m interested in psychology, strategy, economics, and the way complex systems behave and evolve. I value continuous learning, adaptability, and thoughtful problem-solving, and I enjoy turning ideas into meaningful, well-executed projects.
          </p>
        </div>
      </motion.div>
    </motion.section>
  )
}
