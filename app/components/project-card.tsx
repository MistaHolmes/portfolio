import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Github, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string; // GitHub link
  website?: string; // Optional website link
  tags: string[];
}

export default function ProjectCard({ title, description, image, link, website, tags }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col transform transition-transform duration-300 hover:scale-[1.03]">
      {website ? (
        <Link href={website} target="_blank" rel="noopener noreferrer">
          <div className="relative aspect-video">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>
      ) : (
        <div className="relative aspect-video">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full items-center justify-between">
          <Link href={link} target="_blank" className="inline-flex items-center gap-2 text-sm hover:underline">
            <Github className="h-4 w-4" />
              View on Github 
          </Link>
          {website && (
            <Link href={website} target="_blank" className="inline-flex items-center gap-2 text-sm hover:underline">
              <SquareArrowOutUpRight className="h-4 w-4" />
              Live Demo
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
