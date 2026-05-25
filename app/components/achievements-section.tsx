"use client"

import { Card } from "@/components/ui/card"
import { Award, Medal, Trophy } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import PublicationsSection from "./publications-section"

const achievements = [
  {
    title: "Hackathon Wins",
    event: "Code Relay 4.0 2026 & Srusti TechHack 2025",
    year: "2025/26",
    description:
      "Winner at IIT BBSR's Code Relay 4.0 (2026) and Srusti TechHack (2025).",
    icon: Trophy,
    glowClass: "hover-border-glow-gold",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    images: ["/Srusti TechHack.jpg","/Code-Relay-4.0.png"]
  },
  {
    title: "1st Runner-Up",
    event: "Founder's Renaissance & HackTheStack",
    year: "2025/26",
    description:
      "Secured 1st Runner-Up at IIIT BBSR's Founder's Renaissance Ideathon (2025) and Best Coder Award at HackTheStack (2026).",
    icon: Medal,
    glowClass: "hover-border-glow-silver",
    iconColor: "text-slate-400",
    iconBg: "bg-slate-400/10",
    images: ["/Founders Renaissance.jpg", "/HackTheStack-1st-Runners-Up.jpeg"]
  },
  {
    title: "Grand Finalist",
    event: "Smart India Hackathon & Code Relay 3.0",
    year: "2025",
    description:
      "Reached the grand finals of the Smart India Hackathon (Govt. of India) and IIT BBSR's Code Relay 3.0.",
    icon: Award,
    glowClass: "hover-border-glow-bronze",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    images: ["/SIH-Grand-Finals-2025.jpeg", "/Code Relay 3.0.jpg"]
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
      </motion.div>

      <div className="grid gap-5 md:grid-cols-3">
        {achievements.map((achievement) => {
          const Icon = achievement.icon

          return (
            <motion.div key={`${achievement.title}-${achievement.event}`} variants={itemVariants}>
              <div className="relative group w-full h-full pt-4">
                <div className="pointer-events-none absolute inset-0 z-0 overflow-visible">
                  {achievement.images.map((src, index) => {
                    let transformClass = "";
                    const total = achievement.images.length;

                    if (total === 1) {
                      transformClass = "group-hover:-translate-x-1/2 group-hover:-translate-y-[85%] group-hover:rotate-0";
                    } else if (total === 2) {
                      if (index === 0) transformClass = "group-hover:-translate-x-[110%] group-hover:-translate-y-[75%] group-hover:-rotate-6";
                      if (index === 1) transformClass = "group-hover:translate-x-[10%] group-hover:-translate-y-[75%] group-hover:rotate-6 delay-75";
                    } else {
                      if (index === 0) transformClass = "group-hover:-translate-x-[120%] group-hover:-translate-y-[75%] group-hover:-rotate-12";
                      if (index === 1) transformClass = "group-hover:-translate-x-1/2 group-hover:-translate-y-[85%] group-hover:rotate-0 delay-75";
                      if (index === 2) transformClass = "group-hover:translate-x-[20%] group-hover:-translate-y-[75%] group-hover:rotate-12 delay-150";
                    }

                    return (
                      <div key={src} className={`absolute left-1/2 top-4 h-40 w-56 rounded-md border border-border/60 bg-card shadow-lg backdrop-blur-sm transition-all duration-700 ease-out opacity-0 -translate-x-1/2 overflow-hidden group-hover:opacity-100 flex items-center justify-center ${transformClass}`}>
                        <Image src={src} alt={`${achievement.title} Certificate`} fill priority className="object-cover" />
                      </div>
                    );
                  })}
                </div>

                <Card className={`relative z-10 h-full rounded-xl glass-card glass-card-high-opacity p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${achievement.glowClass}`}>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-md ${achievement.iconBg} ${achievement.iconColor}`}>
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
              </div>
            </motion.div>
          )
        })}
      </div>

      <PublicationsSection />
    </motion.section>
  )
}
