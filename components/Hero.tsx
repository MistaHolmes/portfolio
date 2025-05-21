"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-3xl mx-auto space-y-5"
      >
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
          <motion.span 
            className="block"
            variants={itemVariants}
          >
            Full Stack Developer
          </motion.span>
          <motion.span 
            className="block font-medium text-muted-foreground"
            variants={itemVariants}
          >
            and
          </motion.span>
          <motion.span 
            className="block"
            variants={itemVariants}
          >
            DevOps Engineer
          </motion.span>
        </h1>

        <motion.p
          className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 text-base md:text-xl"
          variants={itemVariants}
        >
          Architecting robust, scalable web applications and infrastructure.
          Blending clean code, and cloud-native practices to deliver high-performance digital products that solve real-world problems.
        </motion.p>

        <motion.div className="flex justify-center gap-4 flex-wrap" variants={itemVariants}>
          <Link href="https://github.com/MistaHolmes" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="https://www.linkedin.com/in/abhash-behera-70b77528b/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="https://x.com/AbhasBehera1" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
          </Link>
          <Link href="#contact">
            <Button variant="outline" size="icon">
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 md:bottom-22"
      >
        <Button variant="ghost" size="icon" onClick={scrollToAbout} className="animate-bounce">
          <ArrowDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  )
}