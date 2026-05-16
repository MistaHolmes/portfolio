"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import ContactForm from "./contact-form"
import { Card } from "@/components/ui/card"
import { Github, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
}

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="section-spacing relative"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        <motion.div className="section-heading" variants={itemVariants}>
          <h2>Get in Touch</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mt-2">
          <motion.div variants={itemVariants}>
            <ContactForm />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full p-6 bg-transparent flex flex-col items-center justify-center space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold">Social Profiles</h3>
                <p className="text-muted-foreground text-sm px-2">
                  Connect with me on social media or check out my open-source projects.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://github.com/MistaHolmes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-foreground transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground shadow-sm"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/abhash-behera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-foreground transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground shadow-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/AbhasBehera1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-foreground transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground shadow-sm"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <motion.div variants={itemVariants} className="group mt-28 relative w-[96vw] max-w-[1600px] left-1/2 -translate-x-1/2 h-[40vh] sm:h-[50vh] md:h-[500px] rounded-t-2xl overflow-hidden shadow-2xl -mb-[4.5rem]">
        <Image
          src="/banner.png"
          alt="Cover Image"
          fill
          priority
          className="object-cover object-[center_35%] filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
        />
        {/* Original Heavy Vignette (Visible by default, hidden on hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none transition-opacity duration-700 opacity-100 group-hover:opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/10 to-transparent pointer-events-none transition-opacity duration-700 opacity-100 group-hover:opacity-0" />

        {/* Subtle Edge Vignette (Hidden by default, visible on hover) */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/80 to-transparent pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background/80 to-transparent pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background/80 to-transparent pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
      </motion.div>
    </motion.section>
  )
}
