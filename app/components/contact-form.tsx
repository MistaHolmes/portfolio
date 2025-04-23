"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, Mail, Twitter } from "lucide-react"
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
    <Card className="p-6 max-w-md mx-auto bg-primary/3">
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Mail className="h-12 w-12 text-primary" />
          <p className="text-muted-foreground text-center">
            Want to chat? Just{" "}
            <Link 
              href="https://x.com/AbhasBehera1" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              shoot me a DM with a direct question on Twitter
            </Link>{" "}
            and I'll respond whenever I can. I will ignore all soliciting.
          </p>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <code className="font-mono text-sm md:text-base">{email}</code>
          <div className="flex gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-8"
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              size="sm"
              onClick={handleGmail}
              className="h-8"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <Link 
            href="https://x.com/AbhasBehera1" 
            target="_blank"
            rel="noopener noreferrer"
          >
          </Link>
        </div>
      </div>
    </Card>
  )
}