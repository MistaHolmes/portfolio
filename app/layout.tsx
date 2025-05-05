import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import "./globals.css"
import type React from "react"

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
        <link rel="icon" href="/vercel.svg" type="image/svg+xml" />
        <script dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.classList.add('theme-transition');
            setTimeout(() => {
              document.documentElement.classList.remove('theme-transition');
            }, 1000);
          `
        }} />
      </head>
      <body>
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