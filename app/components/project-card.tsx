import { ArrowUpRight, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  website: string
  tags: string[]
  accent: string
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
  website,
  tags,
  accent,
}: ProjectCardProps) {
  return (
    <article className="group relative h-full min-h-[520px] overflow-hidden rounded-lg border border-border/70 bg-card/70 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-2xl hover:shadow-foreground/10">
      <Link
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${title}`}
        className="absolute inset-0 z-20"
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-90"
        style={{ background: accent }}
      />

      <div className="relative h-72 overflow-hidden bg-muted">
        <Image
          src={image}
          alt={`${title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-80 blur-[1px] transition duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:blur-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/80" />
        <div className="absolute inset-x-4 bottom-4 translate-y-4 rounded-lg border border-white/15 bg-background/85 p-3 opacity-0 shadow-xl backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-foreground">Live preview</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex h-[calc(100%-18rem)] flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-normal">{title}</h3>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
        </div>

        <p className="text-sm leading-6 text-muted-foreground">{description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {tags.slice(0, 8).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/80 bg-background/60 px-2.5 py-1 text-xs font-medium text-foreground/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-6 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Github className="h-4 w-4" />
            <span>{link.includes("github.com") ? "Source on GitHub" : "Case study"}</span>
          </span>
          <span className="font-medium text-foreground">Open site</span>
        </div>
      </div>
    </article>
  )
}
