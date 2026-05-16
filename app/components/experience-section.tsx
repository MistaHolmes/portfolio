"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { experiencesData } from "./experience-data"
import ExperienceList from "./experience-list"
import ExperienceGrid from "./experience-grid"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"

export default function ExperienceSection() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [activeFilter, setActiveFilter] = useState<string>("All")

  const companies = Array.from(new Set(experiencesData.map(exp => exp.company)))

  const filteredExperiences = experiencesData.filter(exp =>
    activeFilter === "All" || exp.company === activeFilter
  )

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl"
            >
              A timeline of my professional journey, side projects, and open-source contributions.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-lg border border-border/50 backdrop-blur-sm self-start md:self-auto shrink-0"
          >
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
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-2 mb-12"
        >
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
    </section>
  )
}
