"use client"

import { AnimatePresence, motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Code2, ExternalLink } from "lucide-react"
import Image from "next/image"
import React, { useRef } from "react"

interface Project {
  title: string
  description: string
  image: string
  link: string
  website: string
  tags: string[]
}

const projects: Project[] = [
  {
    title: "SwarajDesk",
    description:
      "An AI-powered civic governance platform with offline-first sync, geo-tagged reporting, and multilingual support.",
    image:
      "https://pub-a7deba7d0b9642f8afcfd3aebbcb446f.r2.dev/R2-uploader/uploads/1776319541097_swaraj-user.png",
    link: "https://github.com/MistaHolmes/GSC-Deployment.git",
    website: "https://gsc-user-fe.abhasbehera.in/",
    tags: [
      "Next.js",
      "Prisma",
      "Express",
      "WebSockets",
      "LangGraph",
      "Redis",
      "Kubernetes",
      "Turborepo",
    ],
  },
  {
    title: "SwarajDesk Admin",
    description:
      "The admin command center for reviewing citizen reports, managing workflows, and tracking resolution status.",
    image:
      "https://pub-a7deba7d0b9642f8afcfd3aebbcb446f.r2.dev/R2-uploader/uploads/1776319273142_swaraj-admin.png",
    link: "https://github.com/MistaHolmes/GSC-Deployment.git",
    website: "https://gsc-admin-fe.abhasbehera.in/",
    tags: [
      "Next.js",
      "Redis",
      "GCP",
      "Docker",
      "R2 CDN",
      "Vertex AI",
      "Express",
      "Vercel",
    ],
  },
  {
    title: "DraftDock",
    description:
      "A collaborative AI writing workspace with real-time editing and a browser-based AI coding environment via WebContainers.",
    image:
      "https://pub-a7deba7d0b9642f8afcfd3aebbcb446f.r2.dev/R2-uploader/uploads/1776319270212_Draft.png",
    link: "https://github.com/MistaHolmes/Techincal-Phase-2/",
    website: "https://www.draftdocks.in/",
    tags: [
      "React",
      "WebContainers",
      "Tailwind",
      "Express",
      "WebSockets",
      "AWS EC2",
      "Docker",
    ],
  },
  {
    title: "Recall: Study Bot",
    description:
      "An AI-powered Discord bot with a document-grounded RAG pipeline for study sessions and quiz generation.",
    image:
      "https://pub-a7deba7d0b9642f8afcfd3aebbcb446f.r2.dev/R2-uploader/uploads/1778925590843_4f82d8a1-a064-42c2-be5f-dcada18e4197.png",
    link: "https://github.com/MistaHolmes/Recall",
    website: "https://discord.gg/wSETGkV9HY",
    tags: [
      "Python",
      "LangChain",
      "ChromaDB",
      "PostgreSQL",
      "Whisper",
      "Discord.py",
      "RAG",
    ],
  },
  {
    title: "DockStudio",
    description:
      "A browser-based AI coding environment using WebContainers that lets users generate and run full-stack apps via natural language.",
    image:
      "https://pub-a7deba7d0b9642f8afcfd3aebbcb446f.r2.dev/R2-uploader/uploads/1778919854270_Screenshot%20from%202026-05-16%2013-53-40.png",
    link: "https://github.com/MistaHolmes/Techincal-Phase-2/",
    website: "https://www.draftdocks.in/",
    tags: [
      "React",
      "WebContainers",
      "FastAPI",
      "Claude AI",
      "Docker",
    ],
  },
]

const FRAME_OFFSET = -34
const FRAMES_VISIBLE_LENGTH = 4
const SCROLL_THRESHOLD = 45
const BUFFER_SIZE = 8

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
}

function clamp(value: number, range: [number, number]) {
  return Math.min(Math.max(value, range[0]), range[1])
}

function getLoopedIndex(index: number, length: number) {
  return ((index % length) + length) % length
}

function ProjectTimeMachine() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const galleryRef = React.useRef<HTMLDivElement>(null)
  const detailRef = React.useRef<HTMLDivElement>(null)
  const scrollAccumulator = React.useRef(0)
  const lastUpdateTime = React.useRef(Date.now())
  const touchStartY = React.useRef(0)
  const touchCanScrub = React.useRef(false)
  const isHovered = React.useRef(false)
  const activeProject = projects[getLoopedIndex(currentIndex, projects.length)]

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered.current) {
        setCurrentIndex((prev) => prev + 1)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      setCurrentIndex((prev) => prev + 1)
      window.removeEventListener("scroll", handleScroll)
    }

    window.addEventListener("scroll", handleScroll, { once: true, passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const visibleCards = React.useMemo(() => {
    const start = currentIndex - BUFFER_SIZE
    const end = currentIndex + FRAMES_VISIBLE_LENGTH + BUFFER_SIZE

    return Array.from({ length: end - start + 1 }, (_, offset) => {
      const index = start + offset

      return {
        index,
        project: projects[getLoopedIndex(index, projects.length)],
      }
    })
  }, [currentIndex])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const minimumUpdateInterval = 75
    const canScrubAtPoint = (clientX: number, clientY: number) => {
      const galleryRect = galleryRef.current?.getBoundingClientRect()
      const detailRect = detailRef.current?.getBoundingClientRect()

      if (
        galleryRect &&
        clientX >= galleryRect.left &&
        clientX <= galleryRect.right &&
        clientY >= galleryRect.top &&
        clientY <= galleryRect.bottom
      ) {
        return true
      }

      if (
        detailRect &&
        clientX >= detailRect.left &&
        clientX <= detailRect.left + detailRect.width / 2 &&
        clientY >= detailRect.top &&
        clientY <= detailRect.bottom
      ) {
        return true
      }

      return false
    }

    const changeIndex = (deltaY: number) => {
      scrollAccumulator.current += deltaY

      const now = Date.now()
      const timeSinceLastUpdate = now - lastUpdateTime.current

      if (
        Math.abs(scrollAccumulator.current) >= SCROLL_THRESHOLD &&
        timeSinceLastUpdate >= minimumUpdateInterval
      ) {
        const delta = scrollAccumulator.current > 0 ? 1 : -1
        setCurrentIndex((previous) => previous + delta)
        scrollAccumulator.current = 0
        lastUpdateTime.current = now
      }
    }

    const handleWheel = (event: WheelEvent) => {
      if (!canScrubAtPoint(event.clientX, event.clientY)) return

      event.preventDefault()
      changeIndex(event.deltaY)
    }

    const handleTouchStart = (event: TouchEvent) => {
      touchCanScrub.current = canScrubAtPoint(event.touches[0].clientX, event.touches[0].clientY)
      touchStartY.current = event.touches[0].clientY
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (!touchCanScrub.current) return

      event.preventDefault()
      const touchY = event.touches[0].clientY
      const deltaY = touchStartY.current - touchY
      touchStartY.current = touchY
      changeIndex(deltaY)
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="mx-auto grid w-full max-w-[92rem] items-center gap-8 lg:grid-cols-[minmax(0,1.9fr)_minmax(320px,0.85fr)]"
      onMouseEnter={() => { isHovered.current = true }}
      onMouseLeave={() => { isHovered.current = false }}
    >
      <div
        ref={galleryRef}
        className="relative h-[580px] w-full touch-none overflow-hidden rounded-lg lg:h-[640px]"
        aria-label="Scrollable project image gallery"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,56,154,0.16),transparent_48%)]" />
        <div className="relative flex h-full w-full items-center justify-center">
          {visibleCards.map((card) => {
            const offsetIndex = card.index - currentIndex
            const isPast = offsetIndex < 0
            const isPrimary = offsetIndex === 0
            const blur = isPast ? 2 : 0
            const opacity = isPast || offsetIndex > FRAMES_VISIBLE_LENGTH ? 0 : 1
            const scale = clamp(1 - offsetIndex * 0.075, [0.72, 1.08])
            const y = clamp(offsetIndex * FRAME_OFFSET, [
              FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
              Number.POSITIVE_INFINITY,
            ])
            const project = card.project

            return (
              <motion.a
                key={card.index}
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute block aspect-[16/9] w-[96%] max-w-[1080px] overflow-hidden rounded-lg border border-white/15 bg-black shadow-2xl outline-none transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label={`Visit ${project.title}`}
                initial={false}
                animate={{
                  y,
                  scale,
                  transition: {
                    type: "spring",
                    stiffness: 250,
                    damping: 22,
                    mass: 0.5,
                  },
                }}
                style={{
                  filter: `blur(${blur}px)`,
                  opacity,
                  pointerEvents: isPrimary ? "auto" : "none",
                  transitionProperty: "opacity, filter",
                  transitionDuration: "200ms",
                  transitionTimingFunction: "ease-in-out",
                  willChange: "opacity, filter, transform",
                  zIndex: 1000 - offsetIndex,
                }}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(max-width: 768px) 96vw, 1080px"
                  className="object-cover transition duration-500 hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/14 px-2.5 py-1 text-xs font-medium text-white backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>

      <div ref={detailRef} className="relative min-h-[260px] overflow-hidden text-center lg:text-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeProject.title}-${currentIndex}`}
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
            transition={{ duration: 0.34, ease: "easeOut" }}
            className="flex h-full flex-col items-center justify-center lg:items-start"
          >
            <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{activeProject.title}</h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              {activeProject.description}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button asChild size="sm">
                <a href={activeProject.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Visit Site
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href={activeProject.link} target="_blank" rel="noopener noreferrer">
                  <Code2 className="h-4 w-4" />
                  Code
                </a>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <motion.section
      ref={ref}
      id="projects"
      className="section-spacing"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className="section-heading" variants={itemVariants}>
        <h2>Projects</h2>
        <p>
          Product-focused builds across publishing, civic technology, and
          admin workflows.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <ProjectTimeMachine />
      </motion.div>
    </motion.section>
  )
}
