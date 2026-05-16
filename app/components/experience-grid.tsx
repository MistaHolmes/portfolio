"use client"

import { Experience } from "./experience-data"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Building } from "lucide-react"

interface ExperienceGridProps {
  experiences: Experience[]
}

const categoryColors: Record<string, string> = {
  AI: "bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]",
  Backend: "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]",
  Infra: "bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]",
  Research: "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]",
  Freelance: "bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]",
  "Open Source": "bg-yellow-500 text-white shadow-[0_0_15px_rgba(234,179,8,0.5)]",
}

const borderColors: Record<string, string> = {
  AI: "border-purple-400",
  Backend: "border-blue-400",
  Infra: "border-orange-400",
  Research: "border-emerald-400",
  Freelance: "border-pink-400",
  "Open Source": "border-yellow-400",
}

export default function ExperienceGrid({ experiences }: ExperienceGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null)
  const [expandedYear, setExpandedYear] = useState<number | null>(null)

  // Find min and max year
  const years = experiences.reduce((acc, exp) => {
    acc.add(exp.startDate.getFullYear())
    if (exp.endDate) acc.add(exp.endDate.getFullYear())
    else acc.add(new Date().getFullYear())
    return acc
  }, new Set<number>())

  const sortedYears = Array.from(years).sort((a, b) => b - a)

  useEffect(() => {
    if (experiences.length === 1) {
      setSelectedExp(experiences[0])
      setExpandedYear(experiences[0].startDate.getFullYear())
    } else if (selectedExp && !experiences.find(e => e.id === selectedExp.id)) {
      setSelectedExp(null)
      setExpandedYear(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiences])

  const handleBlockClick = (exp: Experience, year: number) => {
    if (selectedExp?.id === exp.id) {
      setSelectedExp(null)
      setExpandedYear(null)
    } else {
      setSelectedExp(exp)
      setExpandedYear(year)
    }
  }

  return (
    <div className="w-full">
      {/* Header Grid (Months) - Hidden on mobile, but we are enforcing Grid is for larger screens mostly anyway */}
      <div className="hidden md:flex ml-24 mb-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(month => (
          <div key={month} className="flex-1 text-center">{month}</div>
        ))}
      </div>

      <div className="space-y-2 md:space-y-4 relative">
        {sortedYears.map(year => (
          <YearRow
            key={year}
            year={year}
            experiences={experiences}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            selectedExp={selectedExp}
            onBlockClick={(exp) => handleBlockClick(exp, year)}
            isExpanded={expandedYear === year}
          />
        ))}
      </div>
    </div>
  )
}

function YearRow({
  year,
  experiences,
  hoveredId,
  setHoveredId,
  selectedExp,
  onBlockClick,
  isExpanded
}: {
  year: number,
  experiences: Experience[],
  hoveredId: string | null,
  setHoveredId: (id: string | null) => void,
  selectedExp: Experience | null,
  onBlockClick: (exp: Experience) => void,
  isExpanded: boolean
}) {
  // Lane allocation algorithm
  const yearStart = new Date(year, 0, 1)
  const yearEnd = new Date(year, 11, 31)

  const inYear = experiences.filter(exp => {
    const expStart = exp.startDate
    const expEnd = exp.endDate || new Date()
    return expStart <= yearEnd && expEnd >= yearStart
  })

  // Sort by start date
  inYear.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

  const lanes: { exp: Experience, lane: number }[] = []
  const laneEnds: number[] = []

  inYear.forEach(exp => {
    let startMonth = 0
    if (exp.startDate.getFullYear() === year) {
      startMonth = exp.startDate.getMonth()
    }

    let endMonth = 11
    const endD = exp.endDate || new Date()
    if (endD.getFullYear() === year) {
      endMonth = endD.getMonth()
    }

    let assignedLane = -1
    for (let i = 0; i < laneEnds.length; i++) {
      if (laneEnds[i] < startMonth) {
        assignedLane = i
        break
      }
    }

    if (assignedLane === -1) {
      assignedLane = laneEnds.length
      laneEnds.push(endMonth)
    } else {
      laneEnds[assignedLane] = endMonth
    }

    lanes.push({ exp, lane: assignedLane })
  })

  const maxLanes = Math.max(1, laneEnds.length)
  const rowHeight = maxLanes * 48 + 16 // 40px height per lane + 8px gap + padding

  return (
    <div className="relative">
      <div className="flex items-stretch border-b border-border/30 pb-4">
        {/* Year Label */}
        <div className="w-16 md:w-24 shrink-0 flex items-start pt-2">
          <span className="text-xl md:text-2xl font-bold text-muted-foreground/50">{year}</span>
        </div>

        {/* Grid Area */}
        <div
          className="flex-1 relative bg-card/20 rounded-xl border border-border/20 backdrop-blur-sm"
          style={{ height: `${rowHeight}px` }}
        >
          {/* Vertical grid lines (Months) */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-1 border-r border-border/10 last:border-r-0" />
            ))}
          </div>

          {/* Blocks */}
          {lanes.map(({ exp, lane }) => {
            let startMonth = 0
            if (exp.startDate.getFullYear() === year) {
              startMonth = exp.startDate.getMonth()
            }

            let endMonth = 11
            const endD = exp.endDate || new Date()
            if (endD.getFullYear() === year) {
              endMonth = endD.getMonth()
            }

            // Also account for partial months (fractional width)
            // For simplicity, we just snap to whole months, but we could add days fraction
            const startFraction = startMonth
            const spanFraction = (endMonth - startMonth) + 1

            const leftPercent = (startFraction / 12) * 100
            const widthPercent = (spanFraction / 12) * 100

            const isHovered = hoveredId === exp.id
            const isOtherHovered = hoveredId !== null && hoveredId !== exp.id
            const isSelected = selectedExp?.id === exp.id

            return (
              <div
                key={exp.id}
                className="absolute"
                style={{
                  top: `${lane * 48 + 8}px`,
                  left: `${leftPercent}%`,
                  width: `${widthPercent}%`,
                  padding: '0 4px',
                  zIndex: isHovered || isSelected ? 30 : 10
                }}
                onMouseEnter={() => setHoveredId(exp.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onBlockClick(exp)}
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isOtherHovered && !isSelected ? 0.3 : 1,
                    scale: isHovered ? 1.02 : 1,
                    filter: isOtherHovered && !isSelected ? "blur(2px)" : "blur(0px)",
                  }}
                  className={`
                    h-10 rounded-lg cursor-pointer transition-all duration-300 relative group
                    flex items-center px-3 overflow-hidden
                    ${categoryColors[exp.category]}
                    ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''}
                  `}
                >
                  {/* Stripes for Present/Experimental */}
                  {!exp.endDate && (
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                         style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,1) 10px, rgba(255,255,255,1) 20px)' }} />
                  )}

                  <span className="truncate text-xs font-semibold whitespace-nowrap drop-shadow-md z-10">
                    {exp.title}
                  </span>
                </motion.div>

                {/* Tooltip on Hover */}
                {isHovered && !isSelected && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-popover text-popover-foreground text-sm p-3 rounded-xl border shadow-xl z-50 pointer-events-none">
                    <p className="font-semibold">{exp.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{exp.metadata}</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {exp.techStack.slice(0, 3).map(tech => (
                        <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded-sm bg-muted">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Expanded Detail Panel */}
      <AnimatePresence>
        {isExpanded && selectedExp && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`mt-4 mb-8 ml-16 md:ml-24 p-6 rounded-2xl border bg-card/50 backdrop-blur-md relative overflow-hidden`}>
              {/* Colored top border accent */}
              <div className={`absolute top-0 left-0 w-full h-1 ${categoryColors[selectedExp.category].split(' ')[0]}`} />

              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-2xl font-bold">{selectedExp.title}</h3>
                      <Badge variant="outline" className={borderColors[selectedExp.category]}>{selectedExp.category}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1.5"><Building className="w-4 h-4" />{selectedExp.role} @ {selectedExp.company}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />
                        {new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(selectedExp.startDate)} -
                        {selectedExp.endDate ? new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(selectedExp.endDate) : "Present"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Overview</h4>
                    <ul className="space-y-2 list-disc list-inside text-sm text-foreground/80 leading-relaxed">
                      {selectedExp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:w-64 space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExp.techStack.map(tech => (
                        <Badge key={tech} variant="secondary" className="bg-secondary/50 hover:bg-secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedExp.links && selectedExp.links.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Links</h4>
                      <div className="flex flex-col gap-2">
                        {selectedExp.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm flex items-center gap-1.5 text-primary hover:underline"
                          >
                            <ExternalLink className="w-4 h-4" />
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
