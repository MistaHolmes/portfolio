import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import ProjectCard from "./components/project-card"
import TechStack from "./components/tech-stack"
import Image from "next/image";
import { TermsDialog } from "./components/term-dialog"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">Abhash Behera</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#about" className="transition-colors hover:text-foreground/80">
                About
              </Link>
              <Link href="#projects" className="transition-colors hover:text-foreground/80">
                Projects
              </Link>
              <Link href="#contact" className="transition-colors hover:text-foreground/80">
                Contact
              </Link>
            </nav>
          </div>
          <Button variant="outline" className="ml-auto" asChild>
            <a
              href="/resume.pdf"
              download="Abhash_Behera_Resume.pdf"
              className="no-underline"
            >
              Resume
            </a>
          </Button>
        </div>
      </header>

      <main className="container px-4 md:px-6">
        <section id="about" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
                <span className="block">Full Stack Developer</span>
                <span className="block font-medium text-muted-foreground">and</span>
                <span className="block">DevOps Engineer</span>
              </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Architecting robust, scalable web applications and infrastructure. 
                  Blending clean code, automation, and cloud-native practices to deliver high-performance digital products that solve real-world problems.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="https://github.com/MistaHolmes" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                
                <Link href="https://www.linkedin.com/in/abhash-behera-70b77528b/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                
                <Link href="https://x.com/AbhasBehera1" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
                
                <Link href="mailto:abhasbehera320@gmail.com">
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            {/* Centered Heading - Matches your project section style */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About Me
              </h2>
            </div>

            {/* Image + Content Row */}
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12">
              {/* Circular Photo - Matches your aesthetic */}
              <div className="w-80 h-80 rounded-full overflow-hidden border border-border shadow-lg flex-shrink-0">
                <Image
                  src="/pfp.png"
                  alt="Abhash Behera"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Paragraph Content - Consistent with your text styling */}
              <div className="text-center md:text-left">
                <p className="text-gray-500 dark:text-gray-400 md:text-lg leading-relaxed">
                  I'm Abhash Behera, a Full Stack Developer passionate about building modern web applications. 
                  With expertise in both frontend and backend technologies, I create efficient, scalable solutions 
                  that deliver exceptional user experiences. My approach combines clean code principles with 
                  thoughtful design to solve real-world problems.
                  <br /><br />
                  When I'm not coding, you'll find me contributing to open-source projects or exploring new 
                  technologies. I believe in continuous learning and enjoy sharing knowledge through tech 
                  communities. My goal is to build software that's not just functional but also makes a 
                  positive impact.
                </p>
              </div>
            </div>
          </div>
        </section>


        <section id="projects" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
              Projects
            </h2>
            <div className="flex justify-center">
              <div className="max-w-md w-full">
                <div className="flex flex-col items-center justify-center min-h-[300px] rounded-xl border border-dashed border-border bg-muted/50 p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground h-8 w-8"
                    >
                      <path d="M12 2v4" />
                      <path d="m16.2 7.8 2.9-2.9" />
                      <path d="M18 12h4" />
                      <path d="m16.2 16.2 2.9 2.9" />
                      <path d="M12 18v4" />
                      <path d="m7.8 16.2-2.9 2.9" />
                      <path d="M6 12H2" />
                      <path d="m7.8 7.8-2.9-2.9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                    Working on it...
                  </h3>
                  <p className="text-muted-foreground">
                    Exciting projects coming soon!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
              Tech Stack
            </h2>
            <TechStack />
          </div>
        </section>

        <section id="contact" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                Get in Touch
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 Abhash Behera. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <TermsDialog /> 
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
