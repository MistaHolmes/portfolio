export type ExperienceCategory = 'AI' | 'Backend' | 'Infra' | 'Research' | 'Freelance' | 'Open Source';

export interface Experience {
  id: string;
  title: string;
  role: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | null; // null means 'Present'
  category: ExperienceCategory;
  priority: 1 | 2 | 3; // 1 = highest visual weight
  metadata: string; // Short tooltip description
  description: string[]; // Long form for detail panel
  techStack: string[];
  links?: { title: string; url: string }[];
  metrics?: string[];
  milestones?: { date: Date; label: string }[];
}

export const experiencesData: Experience[] = [
  {
    id: "batoi-intern",
    title: "Batoi Insight",
    role: "Software Engineering Intern",
    company: "Batoi Systems Pvt Ltd",
    location: "Bhubaneswar, Odisha",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-06-30"),
    category: "Backend",
    priority: 1,
    metadata: "Productionized hackathon prototype & survey workflows.",
    description: [
      "Collaborated with the Batoi team during a 6-week internship to help productionize a hackathon-winning prototype.",
      "Configured and integrated Batoi Insight workflows into the platform, including survey setup, response management, and report generation."
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "React", "Docker"],
    links: [
      { title: "Batoi Systems", url: "https://www.batoi.com" }
    ],
  }
];
