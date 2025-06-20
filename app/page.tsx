"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import TechStack from "./components/tech-stack"
import Image from "next/image"
import { TermsDialog } from "./components/term-dialog"
import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { motion, useInView } from "framer-motion"
import Hero from "@/components/Hero" 
import ProjectCard from "./components/project-card"

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
  
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const techStackRef = useRef(null)
  const contactRef = useRef(null)
  
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
              href="https://pub-a7deba7d0b9642f8afcfd3aebbcb446f.r2.dev/Resume-Abhash.pdf"
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
        <div className="halo-container">
          <div className="halo-background" />
          <Hero />
        </div>

        <motion.section 
          ref={aboutRef}
          id="about" 
          className="py-12 md:py-24 lg:py-32"
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="container px-4 md:px-6">
            <motion.div 
              className="text-center mb-12"
              variants={itemVariants}
            >
              <motion.h1 
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-12 text-center"
              variants={itemVariants}
            >
              About Me
            </motion.h1>

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
          <div className="container px-4 md:px-6 mx-auto">
            <motion.h1 
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-12 text-center"
              variants={itemVariants}
            >
              Projects
            </motion.h1>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
              variants={itemVariants}
            >
              <motion.div
                className="w-full max-w-md"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <ProjectCard
                  title="SwarajDesk"
                  description="A grievance redressal system empowering citizens to raise and track issues with municipal authorities."
                  image="https://pub-a7deba7d0b9642f8afcfd3aebbcb446f.r2.dev/image%20(2).png"
                  link="https://github.com/MistaHolmes/gms"
                  website="https://swarajnew.adityahota.online"
                  tags={[
                    "Next.js", "Prisma ORM", "Express", "WebSockets", "Google Cloud Run",
                    "Swaraj AI", "Vercel", "Docker", "Tailwind", "VertexAI", "Nodemailer","Batoi Insights",
                    "TurboRepo",
                  ]}
                />
              </motion.div>

              {/* <motion.div
                className="w-full max-w-md"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <ProjectCard
                  title="DraftDock"
                  description="A Minimalist Blogging Platform for Users that just want to share their thoughts and ideas." 
                  image="https://pub-a7deba7d0b9642f8afcfd3aebbcb446f.r2.dev/DrafrDockLanding.png"
                  link="https://github.com/MistaHolmes/DraftDock"
                  // website=""
                  tags={[
                    "React",  "Vite","Tailwind","Express" ,"WebSockets", "Google Cloud (GKE)","SwaggerUI",
                    "Clerk", "Docker","Nodemailer", "Kubernetes",  "Redis",  "Prisma ORM","Google Cloud Run",
                    "NGINX","TypeScript",
                  ]}
                />
              </motion.div> */}
                
              
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
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-12 text-center"
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
              <motion.h1 
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-12 text-center"
                variants={itemVariants}
              >
                Get in Touch
              </motion.h1>
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