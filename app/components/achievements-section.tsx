"use client"

import { Card } from "@/components/ui/card"
import { Award, Medal, Trophy } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import PublicationsSection from "./publications-section"

const achievements = [
  {
    title: "Hackathon Wins",
    event: "Code Relay 4.0 2026 & Srusti TechHack 2025",
    year: "2025/26",
    description:
      "Winner at IIT BBSR's Code Relay 4.0 (2026) and Srusti TechHack (2025).",
    icon: Trophy,
  },
  {
    title: "1st Runner-Up",
    event: "Founder's Renaissance & HackTheStack",
    year: "2025/26",
    description:
      "Secured 1st Runner-Up at IIIT BBSR's Founder's Renaissance Ideathon (2025) and Best Coder Award at HackTheStack (2026).",
    icon: Medal,
  },
  {
    title: "Grand Finalist",
    event: "Smart India Hackathon & Code Relay 3.0",
    year: "2025",
    description:
      "Reached the grand finals of the Smart India Hackathon (Govt. of India) and IIT BBSR's Code Relay 3.0.",
    icon: Award,
  },
]

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
}

export default function AchievementsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <motion.section
      ref={ref}
      id="achievements"
      className="section-spacing"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div className="section-heading" variants={itemVariants}>
        <h2>Achievements</h2>
        <p>Hackathon wins, competitive builds, and recognitions from shipping under pressure.</p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-3">
        {achievements.map((achievement) => {
          const Icon = achievement.icon

          return (
            <motion.div key={`${achievement.title}-${achievement.event}`} variants={itemVariants}>
              <Card className="h-full rounded-lg border-border/70 bg-card/65 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-md border border-border/70 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {achievement.year}
                  </span>
                </div>
                <h3 className="text-xl font-semibold">{achievement.title}</h3>
                <p className="mt-1 text-base font-medium text-foreground/70">{achievement.event}</p>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  {achievement.description}
                </p>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <PublicationsSection />
    </motion.section>
  )
}
