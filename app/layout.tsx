import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abhash Behera - Portfolio",
  description: "Full stack developer and DevOps Engineer portfolio showcasing projects and skills",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  

  return (
    <html lang="en" suppressHydrationWarning className="theme-transition text-[90%] sm:text-[90%] lg:text-[95%] no-scroll-gap">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.classList.add('theme-transition');
            setTimeout(() => {
              document.documentElement.classList.remove('theme-transition');
            }, 1000);
          `
        }} />
      </head>
      <body
        className={cn(
          "min-h-screen font-sans antialiased text-foreground",
          "dark:bg-gradient-to-r dark:from-[#0a0a0a] dark:via-[#1c1c1c] dark:to-[#0a0a0a]",
          "dark:bg-[length:800%_100%] dark:animate-[gradientFlow_15s_ease-in-out_infinite]",
          inter.className
        )}
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <div className="flex flex-col min-h-screen">
            <main className="flex-1 container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}