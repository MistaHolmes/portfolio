"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun } from "lucide-react"
import Link from "next/link"
import TechStack from "./components/tech-stack"
import { useState, useEffect, type MouseEvent } from "react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion"
import Hero from "@/components/Hero"
import AboutSection from "./components/about-section"
import AchievementsSection from "./components/achievements-section"
import ContactSection from "./components/contact-section"
import MouseEffects from "./components/mouse-effects"
import ProjectsSection from "./components/projects-section"
import ExperienceSection from "./components/experience-section"
import ScrollProgress from "./components/scroll-progress"

import { AnimatedDivider } from "./components/animated-divider"

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
    setTheme(theme === "light" ? "dark" : "light")
  }

  const goToSection = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()
    setMobileMenuOpen(false)
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
      })
    })
  }

  return (
    <div className="relative isolate min-h-screen bg-transparent">
      <ScrollProgress />
      <MouseEffects />
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-[9999] w-full border-b bg-transparent/95 backdrop-blur supports-[backdrop-filter]:bg-transparent/60"
      >
        <div className="flex h-16 items-center justify-between text-lg">
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
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-7 text-lg font-medium">
            <Link href="#about" onClick={(event) => goToSection(event, "about")} className="transition-colors hover:text-foreground/80">
              About
            </Link>
            <Link href="#experience" onClick={(event) => goToSection(event, "experience")} className="transition-colors hover:text-foreground/80">
              Experience
            </Link>
            <Link href="#projects" onClick={(event) => goToSection(event, "projects")} className="transition-colors hover:text-foreground/80">
              Projects
            </Link>
            <Link href="#achievements" onClick={(event) => goToSection(event, "achievements")} className="transition-colors hover:text-foreground/80">
              Achievements
            </Link>
            <Link href="#contact" onClick={(event) => goToSection(event, "contact")} className="transition-colors hover:text-foreground/80">
              Contact
            </Link>
            <Link href="https://medium.com/@mistaholmes" className="transition-colors hover:text-foreground/80">
              Blogs
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
              href="https://r2.abhashbehera.online/Abhash_Behera_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
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
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
              <nav className="flex flex-col space-y-4 text-xl font-medium">
                <Link href="#about" onClick={(event) => goToSection(event, "about")} className="hover:text-foreground/80">
                  About
                </Link>
                <Link href="#experience" onClick={(event) => goToSection(event, "experience")} className="hover:text-foreground/80">
                  Experience
                </Link>
                <Link href="#projects" onClick={(event) => goToSection(event, "projects")} className="hover:text-foreground/80">
                  Projects
                </Link>
                <Link href="#achievements" onClick={(event) => goToSection(event, "achievements")} className="hover:text-foreground/80">
                  Achievements
                </Link>
                <Link href="#research" onClick={(event) => goToSection(event, "research")} className="hover:text-foreground/80">
                  Research
                </Link>
                <Link href="#contact" onClick={(event) => goToSection(event, "contact")} className="hover:text-foreground/80">
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
            </motion.div>

            {/* Overlay that closes the menu when clicked */}
            <div className="flex-1" />
          </div>
        )}
      </motion.header>

      <main className="px-4 md:px-6">
        <div className="halo-container">
          <div className="halo-background" />
          <Hero />
        </div>
        <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <AboutSection />
              <AnimatedDivider />
              <ExperienceSection />
              <AnimatedDivider />
              <ProjectsSection />
              <AnimatedDivider />
              <AchievementsSection />
              <AnimatedDivider />
              <TechStack />
              <AnimatedDivider />
              <ContactSection />
            </motion.div>
        </AnimatePresence>
      </main>


    </div>
  )
}
