import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import "./globals.css"
import type React from "react"

// app/layout.tsx

export const metadata : Metadata = {
  title: {
    default: "Abhash Behera | Full Stack Developer & DevOps Engineer",
    template: "%s | Abhash Behera", // This will format page titles like "Projects | Abhash Behera"
  },
  description: "Explore the work of Abhash Behera, a full stack developer and DevOps engineer.",
  keywords: ["Abhash Behera", "Portfolio", "Software Engineer", "DevOps", "Next.js"],
  openGraph: {
    title: "Abhash Behera | Full Stack Developer & DevOps Engineer",
    description: "Explore the work of Abhash Behera.",
    url: "https://portfolio-abhasbehera.vercel.app",
    siteName: "Abhash Behera Portfolio",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Abhash Behera Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhash Behera | Full Stack Developer",
    description: "Explore the portfolio of Abhash Behera, a skilled full stack and DevOps engineer.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://portfolio-abhasbehera.vercel.app"),
};

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
        }}
         />
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