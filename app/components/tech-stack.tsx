"use client"

/* eslint-disable @next/next/no-img-element */
import { Card } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const technologies = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "C++", logo: "https://cdn.simpleicons.org/cplusplus/00599C" },
      { name: "Go", logo: "https://cdn.simpleicons.org/go/00ADD8" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/000000" },
      { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "React Native", logo: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Recoil", logo: "https://cdn.simpleicons.org/recoil/3578E5" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "Express", logo: "https://cdn.simpleicons.org/express/000000" },
      { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
      { name: "WebSockets", logo: "/WS.png" },
      { name: "Vitest", logo: "https://cdn.simpleicons.org/vitest/6E9F18" },
      { name: "Pub/Sub", logo: "https://cdn.simpleicons.org/googlecloud/4285F4" },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "AWS", logo: "/AWS.png" },
      { name: "Kubernetes", logo: "https://cdn.simpleicons.org/kubernetes/326CE5" },
      { name: "Nginx", logo: "https://cdn.simpleicons.org/nginx/009639" },
      { name: "Helm", logo: "https://cdn.simpleicons.org/helm/0F1689" },
      { name: "Terraform", logo: "https://cdn.simpleicons.org/terraform/844FBA" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "Postgres", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Redis", logo: "https://cdn.simpleicons.org/redis/FF4438" },
      { name: "Prisma", logo: "https://cdn.simpleicons.org/prisma/2D3748" },
      { name: "Drizzle", logo: "https://cdn.simpleicons.org/drizzle/C5F74F" },
    ],
  },
  {
    category: "Others",
    skills: [
      { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
      { name: "GitHub", logo: "https://cdn.simpleicons.org/github/181717" },
      { name: "Turborepo", logo: "https://cdn.simpleicons.org/turborepo/EF4444" },
      { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/000000" },
      { name: "Google Cloud", logo: "https://cdn.simpleicons.org/googlecloud/4285F4" },
    ],
  },
]

const marqueeTop = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "WebSockets",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Prisma",
  "Redis",
  "Postgres",
]

const marqueeBottom = [
  "Tailwind CSS",
  "Vite",
  "CI/CD",
  "Helm",
  "GKE",
  "Turborepo",
  "MongoDB",
  "LangChain",
  "Vertex AI",
  "Nginx",
  "R2 CDN",
  "Vercel",
]

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[]
  reverse?: boolean
}) {
  const repeatedItems = [...items, ...items]

  return (
    <div className="marquee-shell">
      <div className={reverse ? "marquee-track marquee-reverse" : "marquee-track"}>
        {repeatedItems.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-pill">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.15 })

  return (
    <motion.section
      ref={ref}
      id="tech-stack"
      className="section-spacing"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div className="section-heading" variants={itemVariants}>
        <h2>Tech Stack</h2>
      </motion.div>

      <motion.div className="mb-10 space-y-3" variants={itemVariants}>
        <MarqueeRow items={marqueeTop} />
        <MarqueeRow items={marqueeBottom} reverse />
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2">
        {technologies.map((tech) => (
          <motion.div key={tech.category} variants={itemVariants}>
            <Card className="h-full rounded-xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="mb-5 text-xl font-semibold">{tech.category}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {tech.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex min-h-12 items-center gap-3 rounded-md border border-border/70 bg-neutral-500/12 px-3 py-2 text-base font-medium text-foreground/85"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                      <img
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
