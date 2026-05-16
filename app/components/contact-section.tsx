"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import ContactForm from "./contact-form"

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
      className="section-spacing"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="mx-auto max-w-2xl">
        <motion.div className="section-heading" variants={itemVariants}>
          <h2>Get in Touch</h2>
        </motion.div>
        <motion.div variants={itemVariants}>
          <ContactForm />
        </motion.div>
      </div>
    </motion.section>
  )
}
