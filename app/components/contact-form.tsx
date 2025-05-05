"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, Mail } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function ContactForm() {
  const [copied, setCopied] = useState(false)
  const email = "abhasbehera320@gmail.com"

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGmail = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank')
  }

  return (
    <Card className="p-4 sm:p-6 w-full max-w-md mx-auto bg-transparent">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col items-center space-y-2 sm:space-y-4">
          <Mail className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
          <p className="text-muted-foreground text-sm sm:text-base text-center px-2">
            Want to chat? Just{" "}
            <Link 
              href="https://x.com/AbhasBehera1" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              shoot me a DM on Twitter
            </Link>{" "}
            and I&apos;ll respond when I can. I ignore all soliciting.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 sm:p-4 bg-muted/50 rounded-lg">
          <code className="font-mono text-xs sm:text-sm md:text-base truncate w-full text-center sm:text-left">
            {email}
          </code>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-full sm:w-auto"
            >
              <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              size="sm"
              onClick={handleGmail}
              className="h-8 w-full sm:w-auto"
            >
              <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="sr-only">Open Gmail</span>
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <Link 
            href="https://x.com/AbhasBehera1" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
          </Link>
        </div>
      </div>
    </Card>
  )
}