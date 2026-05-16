"use client"

import { Experience } from "./experience-data"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building, MapPin, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface ExperienceListProps {
  experiences: Experience[]
}

const categoryColors: Record<string, string> = {
  AI: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  Backend: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Infra: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Research: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Freelance: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  "Open Source": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
  // Group by year
  const grouped = experiences.reduce((acc, exp) => {
    const year = exp.startDate.getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(exp)
    return acc
  }, {} as Record<number, Experience[]>)

  const years = Object.keys(grouped).map(Number).sort((a, b) => b - a)

  return (
    <div className="py-4 space-y-10">
      {years.map((year) => (
        <div key={year} className="flex gap-6 md:gap-10">
          {/* Year Column — always in flow, never clipped */}
          <div className="w-14 md:w-20 shrink-0 pt-6 text-right">
            <span className="text-2xl md:text-3xl font-bold text-muted-foreground/35 tabular-nums">
              {year}
            </span>
          </div>

          {/* Timeline Column */}
          <div className="flex-1 relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50" />

            <div className="space-y-6 pl-8">
              {grouped[year].map((exp, index) => (
                <ExperienceListItem key={exp.id} exp={exp} index={index} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ExperienceListItem({ exp, index }: { exp: Experience; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const formatMonthYear = (date: Date | null) => {
    if (!date) return "Present"
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date)
  }

  const duration = `${formatMonthYear(exp.startDate)} – ${formatMonthYear(exp.endDate)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Timeline dot */}
      <div className="absolute -left-8 top-6 w-3 h-3 rounded-full bg-primary/40 ring-4 ring-background group-hover:bg-primary group-hover:scale-125 transition-all duration-200" />

      <div className="bg-card/30 hover:bg-card/50 transition-colors border border-border/50 rounded-xl p-6 relative overflow-hidden backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
              <Badge variant="outline" className={categoryColors[exp.category] || "bg-primary/10 text-primary border-primary/20"}>
                {exp.category}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4" />
                {exp.company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {exp.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {duration}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            {isExpanded ? (
              <>Less <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>More <ChevronDown className="w-4 h-4" /></>
            )}
          </button>
        </div>

        <p className="mt-4 text-muted-foreground text-sm">
          {exp.metadata}
        </p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-border/50 space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Overview</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-secondary/50 hover:bg-secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {exp.links && exp.links.length > 0 && (
                  <div className="flex items-center gap-4 pt-2">
                    {exp.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {link.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
