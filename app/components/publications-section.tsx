"use client"

import { Card } from "@/components/ui/card"
import { BadgeCheck, FileText, Landmark, ScrollText } from "lucide-react"
import { motion } from "framer-motion"

const publications = [
  {
    type: "Patent",
    title: "Patent details to be added",
    status: "Draft this entry",
    description:
      "Add the invention title, application number, jurisdiction, filing status, and your contribution.",
    icon: Landmark,
    href: "https://pub-a7deba7d0b9642f8afcfd3aebbcb446f.r2.dev/R2-uploader/uploads/1778917002358_202631019043-PATENT_APPLICATION_PUBLICATION.pdf",
  },
  {
    type: "Research Paper",
    title: "Research paper details to be added",
    status: "Draft this entry",
    description:
      "Add the paper title, venue or preprint link, authorship details, abstract focus, and publication status.",
    icon: FileText,
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
          const Icon = item.icon

          const card = (
            <Card className="relative h-full overflow-hidden rounded-lg border-border/70 bg-card/65 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl">
                <div className="absolute right-6 top-6 opacity-10">
                  <ScrollText className="h-24 w-24" />
                </div>
                <div className="relative">
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-background/60 px-3 py-1.5 text-sm font-medium">
                      <Icon className="h-4 w-4" />
                      {item.type}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                      <BadgeCheck className="h-4 w-4" />
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
