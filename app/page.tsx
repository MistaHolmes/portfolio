"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter, Menu, X, Moon, Sun } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import TechStack from "./components/tech-stack"
import Image from "next/image"
import { TermsDialog } from "./components/term-dialog"
import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { motion, useInView } from "framer-motion"

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

  // Animation variants for the waterfall effect
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }
  
  // References for all main sections to use with useInView
  const aboutMeRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const techStackRef = useRef(null)
  const contactRef = useRef(null)
  
  // Track if sections are in view
  const aboutMeInView = useInView(aboutMeRef, { once: false, amount: 0.2 })
  const aboutInView = useInView(aboutRef, { once: false, amount: 0.2 })
  const projectsInView = useInView(projectsRef, { once: false, amount: 0.2 })
  const techStackInView = useInView(techStackRef, { once: false, amount: 0.2 })
  const contactInView = useInView(contactRef, { once: false, amount: 0.2 })

  return (
    <div className="min-h-screen bg-transparent">
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full border-b bg-transparent/95 backdrop-blur supports-[backdrop-filter]:bg-transparent/60"
      >
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
              href="https://drive.google.com/uc?export=download&id=1d-7IhNgci4yoYD75Jhywj9SJCCJYsaTy"
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
            </motion.div>

            {/* Overlay that closes the menu when clicked */}
            <div className="flex-1" />
          </div>
        )}
      </motion.header>

      <main className="container px-4 md:px-6">
        <motion.section 
          ref={aboutMeRef}
          id="aboutme" 
          className="py-12 md:py-24 lg:py-32"
          initial="hidden"
          animate={aboutMeInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div 
                className="space-y-2"
                variants={itemVariants}
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
                  <motion.span 
                    className="block"
                    variants={itemVariants}
                  >
                    Full Stack Developer
                  </motion.span>
                  <motion.span 
                    className="block font-medium text-muted-foreground"
                    variants={itemVariants}
                  >
                    and
                  </motion.span>
                  <motion.span 
                    className="block"
                    variants={itemVariants}
                  >
                    DevOps Engineer
                  </motion.span>
                </h1>
                <motion.p 
                  className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
                  variants={itemVariants}
                >
                  Architecting robust, scalable web applications and infrastructure. 
                  Blending clean code, and cloud-native practices to deliver high-performance digital products that solve real-world problems.
                </motion.p>
              </motion.div>
              <motion.div 
                className="space-x-4"
                variants={itemVariants}
              >
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
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          ref={aboutRef}
          id="about" 
          className="py-12 md:py-24 lg:py-32"
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="container px-4 md:px-6">
            {/* Centered Heading - Matches your project section style */}
            <motion.div 
              className="text-center mb-12"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bo6ld tracking-tighter sm:text-4xl md:text-5xl">
                About Me
              </h2>

              {/* Add Experience Here */}
            </motion.div>

            {/* Image + Content Row */}
            <motion.div 
              className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12"
              variants={itemVariants}
            >
              <motion.div 
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-border shadow-lg flex-shrink-0"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
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
              </motion.div>

              {/* Paragraph Content - Consistent with your text styling */}
              <motion.div 
                className="text-center md:text-left"
                variants={itemVariants}
              >
                <p className="text-gray-500 dark:text-gray-200 md:text-lg leading-relaxed font-bold">
                  Hello! I&apos;m Abhash Behera — a Full Stack Developer and DevOps Engineer with a passion for building robust, scalable web applications 
                  and ensuring seamless performance in production environments. From developing intuitive frontend interfaces to designing efficient backend systems 
                  and streamlining CI/CD pipelines.
                  <br /><br />
                  Outside of development, stay updated with emerging technologies, and engage with the tech community. 
                  I value continuous learning, knowledge sharing, and creating tools and platforms that improve productivity and user experience. Let&apos;s build solutions that are smart, stable, and impactful.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          ref={projectsRef}
          id="projects" 
          className="py-12 md:py-24 lg:py-32"
          initial="hidden"
          animate={projectsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="container px-4 md:px-6">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center"
              variants={itemVariants}
            >
              Projects
            </motion.h2>
            <motion.div 
              className="flex justify-center"
              variants={itemVariants}
            >
              <div className="max-w-md w-full">
                <motion.div 
                  className="flex flex-col items-center justify-center min-h-[300px] rounded-xl border border-dashed border-border bg-muted/50 p-8 text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <motion.div 
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4"
                    variants={itemVariants}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.8 }}
                  >
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
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold text-muted-foreground mb-2"
                    variants={itemVariants}
                  >
                    Working on it...
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground"
                    variants={itemVariants}
                  >
                    Exciting projects coming soon!
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          ref={techStackRef}
          className="py-12 md:py-24 lg:py-32"
          initial="hidden"
          animate={techStackInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="container px-4 md:px-6">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center"
              variants={itemVariants}
            >
              Tech Stack
            </motion.h2>
            <motion.div variants={itemVariants}>
              <TechStack />
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          ref={contactRef}
          id="contact" 
          className="py-12 md:py-24 lg:py-32"
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <motion.h2 
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center"
                variants={itemVariants}
              >
                Get in Touch
              </motion.h2>
              <motion.div variants={itemVariants}>
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <motion.footer 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="border-t-2 border-amber-50"
      >
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-1xl text-gray-500 dark:text-gray-400">© 2025 Abhash Behera. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <TermsDialog /> 
          </nav>
        </div>
      </motion.footer>
    </div>
  )
}