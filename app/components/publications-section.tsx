"use client"

import { Card } from "@/components/ui/card"
import { BadgeCheck, FileText } from "lucide-react"
import { motion } from "framer-motion"

const publications = [
  {
    type: "Patent",
    title: "An Offline-First, AI-Enabled System for Decentralized Issue Reporting",
    status: "View PDF",
    description:
      "Published Indian Patent (No. 202631019043) on an automated routing and immutable resolution tracking system.",
    // icon: Landmark,
    href: "https://pub-a7deba7d0b9642f8afcfd3aebbcb446f.r2.dev/R2-uploader/uploads/1778917002358_202631019043-PATENT_APPLICATION_PUBLICATION.pdf",
  },
  {
    type: "Research Paper",
    title: "Connection-Aware Autoscaling for Stateful Kubernetes Workloads",
    status: "Under Review",
    description:
      "Co-authored a research paper proposing a novel approach to connection-aware autoscaling for stateful Kubernetes workloads.",
    // icon: FileText,
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

export default function PublicationsSection() {
  return (
    <motion.div
      id="research"
      className="mt-12 border-t border-border/70 pt-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="section-heading mb-8" variants={itemVariants}>
        <h3 className="text-3xl font-semibold">Patent & Research</h3>
        <p>Formal technical work that moves beyond shipped products into defensible ideas.</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {publications.map((item) => {
          // const Icon = item.icon

          const card = (
            <Card className={`relative h-full overflow-hidden rounded-lg border-border/70 bg-card/65 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.href ? 'hover-border-glow-blue' : 'hover:border-foreground/20'}`}>
              <div className="relative">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-background/60 px-3 py-1.5 text-sm font-medium">
                    {/* <Icon className="h-4 w-4" /> */}
                    {item.type}
                  </span>
                  <span className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium ${item.status === 'View PDF' ? 'bg-zinc-700 text-white hover:bg-zinc-600 transition-all duration-300' : 'bg-primary/10 text-primary'}`}>
                    {item.status === 'View PDF' ? <FileText className="h-4 w-4" /> : <BadgeCheck className="h-4 w-4" />}
                    {item.status}
                  </span>
                </div>
                <h3 className="max-w-xl text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Card>
          )

          if (item.href) {
            return (
              <motion.a
                key={item.type}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                variants={itemVariants}
              >
                {card}
              </motion.a>
            )
          }

          return (
            <motion.div key={item.type} variants={itemVariants}>
              {card}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
