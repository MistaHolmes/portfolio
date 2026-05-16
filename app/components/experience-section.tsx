"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { experiencesData } from "./experience-data"
import ExperienceList from "./experience-list"
import ExperienceGrid from "./experience-grid"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"

export default function ExperienceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.15 })

  const [view, setView] = useState<"grid" | "list">("grid")
  const [activeFilter, setActiveFilter] = useState<string>("All")

  const companies = Array.from(new Set(experiencesData.map(exp => exp.company)))

  const filteredExperiences = experiencesData.filter(exp =>
    activeFilter === "All" || exp.company === activeFilter
  )

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  return (
    <motion.section
      ref={ref}
      id="experience"
      className="section-spacing relative overflow-hidden"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Dynamic Background Hue */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
          x: ["-50%", "-45%", "-55%", "-50%"],
          y: ["-50%", "-55%", "-45%", "-50%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[60px] pointer-events-none"
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Experience</h2>
          <p>
            A timeline of my professional journey, side projects, and open-source contributions.
          </p>
        </motion.div>

        {/* Filters and View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-4"
        >
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant={activeFilter === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("All")}
              className="rounded-full"
            >
              All
            </Button>
            {companies.map(company => (
              <Button
                key={company}
                variant={activeFilter === company ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(company)}
                className="rounded-full"
              >
                {company}
              </Button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-lg border border-border/50 backdrop-blur-sm shrink-0">
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
              className={`gap-2 ${view === "list" ? "shadow-sm" : ""}`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("grid")}
              className={`gap-2 ${view === "grid" ? "shadow-sm" : ""}`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </Button>
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {view === "list" ? (
              <motion.div
                key="list-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ExperienceList experiences={filteredExperiences} />
              </motion.div>
            ) : (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ExperienceGrid experiences={filteredExperiences} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}
