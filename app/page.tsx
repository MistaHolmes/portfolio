"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun } from "lucide-react"
import Link from "next/link"
import TechStack from "./components/tech-stack"
import { TermsDialog } from "./components/term-dialog"
import { useState, useEffect, type MouseEvent } from "react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion"
import Hero from "@/components/Hero"
import AboutSection from "./components/about-section"
import AchievementsSection from "./components/achievements-section"
import ContactSection from "./components/contact-section"
import MouseEffects from "./components/mouse-effects"
import ProjectsSection from "./components/projects-section"
import ScrollProgress from "./components/scroll-progress"

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [contentReady, setContentReady] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (window.location.hash) {
      setContentReady(true)
      return
    }

    const revealContent = () => setContentReady(true)
    const revealFromHero = (event: Event) => {
      const sectionId = (event as CustomEvent<string>).detail
      setContentReady(true)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
        })
      })
    }

    window.addEventListener("wheel", revealContent, { once: true, passive: true })
    window.addEventListener("touchmove", revealContent, { once: true, passive: true })
    window.addEventListener("keydown", revealContent, { once: true })
    window.addEventListener("portfolio:reveal-content", revealFromHero)

    return () => {
      window.removeEventListener("wheel", revealContent)
      window.removeEventListener("touchmove", revealContent)
      window.removeEventListener("keydown", revealContent)
      window.removeEventListener("portfolio:reveal-content", revealFromHero)
    }
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const goToSection = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()
    setContentReady(true)
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
        className="sticky top-0 z-50 w-full border-b bg-transparent/95 backdrop-blur supports-[backdrop-filter]:bg-transparent/60"
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
              href="https://pub-a7deba7d0b9642f8afcfd3aebbcb446f.r2.dev/Resume.pdf"
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
          {contentReady && (
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <AboutSection />
              <ProjectsSection />
              <AchievementsSection />
              <TechStack />
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {contentReady && (
          <motion.footer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="border-t-2 border-amber-50"
          >
            <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
              <p className="text-1xl text-gray-500 dark:text-gray-400">© 2025 Abhash Behera. All rights reserved.</p>
              <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <TermsDialog />
              </nav>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  )
}
