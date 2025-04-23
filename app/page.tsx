"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter, Menu, X, Moon, Sun } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import TechStack from "./components/tech-stack"
import Image from "next/image"
import { TermsDialog } from "./components/term-dialog"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-screen bg-transparent">
      <header className="sticky top-0 z-50 w-full border-b bg-transparent/95 backdrop-blur supports-[backdrop-filter]:bg-transparent/60">
        <div className="flex h-14 items-center justify-between">
          {/* Mobile menu button */}
          <button 
            className="md:hidden mr-2 rounded-md p-2 text-foreground hover:bg-muted transition-colors"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-foreground/90 dark:text-foreground/80" />
            ) : (
              <Menu size={20} className="text-foreground/90 dark:text-foreground/80" />
            )}
          </button>

          {/* Logo */}
          <Link className="mr-auto md:mr-0 flex items-center space-x-2" href="/">
            <span className="font-bold">Abhash Behera</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-6 text-m font-medium">
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

          {/* Theme toggle */}
          <Button 
            variant="outline" 
            size="icon" 
            className="mr-2" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {mounted && (
              theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            )}
          </Button>

          {/* Resume button */}
          <Button variant="outline" asChild>
            <a
              href="/resume.pdf"
              download="Abhash_Behera_Resume.pdf"
              className="no-underline"
            >
              Resume
            </a>
          </Button>
        </div>

        {/* Improved Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 flex"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Sidebar */}
            <div
              className="w-64 bg-transparent/95 backdrop-blur-sm p-6 flex flex-col space-y-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="self-start p-2 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} className="text-foreground/90 dark:text-foreground/80" />
              </button>

              {/* Nav links */}
              <nav className="flex flex-col space-y-4 text-lg font-medium">
                <Link href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground/80">
                  About
                </Link>
                <Link href="#projects" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground/80">
                  Projects
                </Link>
                <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground/80">
                  Contact
                </Link>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    toggleTheme()
                    setMobileMenuOpen(false)
                  }}
                >
                  {mounted && (
                    theme === "dark" ? (
                      <>
                        <Sun className="h-4 w-4" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4" />
                        <span>Dark Mode</span>
                      </>
                    )
                  )}
                </Button>
              </nav>
            </div>

            {/* Overlay that closes the menu when clicked */}
            <div className="flex-1" />
          </div>
        )}
      </header>

      <main className="container px-4 md:px-6">
        <section id="aboutme" className="py-12 md:py-24 lg:py-32">
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
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-border shadow-lg flex-shrink-0">
              {/* Dark mode image */}
              <Image
                src="/pfp.png"
                alt="Abhash Behera"
                width={320}
                height={320}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 dark:opacity-100 opacity-0"
                priority
              />
              
              {/* Light mode image */}
              <Image
                src="/pfp_lg.png"
                alt="Abhash Behera"
                width={320}
                height={320}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 dark:opacity-0 opacity-100"
                priority
              />
            </div>

              {/* Paragraph Content - Consistent with your text styling */}
              <div className="text-center md:text-left">
                <p className="text-gray-500 dark:text-gray-200 md:text-lg leading-relaxed font-bold">
                  Hey there! I&apos;m Abhash Behera — a Full Stack Developer and DevOps Engineer who loves building slick, 
                  scalable web apps and making sure they don&apos;t break the minute they hit production. Whether I&apos;m wrangling frontend components, 
                  wiring up backend logic, or automating deployments, I aim to write clean code and ship stuff that just works (and keeps working). 
                  Bonus points if it looks good doing it.
                  <br /><br />
                  When I&apos;m not coding, you&apos;ll probably find me contributing to open-source, 
                  geeking out over the latest dev tools, or hanging out in some corner of the internet with other 
                  tech nerds. I&apos;m big on learning, sharing, and building things that make life easier — or at least more fun. Let&apos;s make cool stuff that doesn&apos;t crash.
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

      <footer className="border-t-2 border-amber-50">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-1xl text-gray-500 dark:text-gray-400">© 2025 Abhash Behera. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <TermsDialog /> 
          </nav>
        </div>
      </footer>
    </div>
  )
}