"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function TermsDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-1x1 hover:underline underline-offset-4"
      >
        Terms of Service
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg max-w-md w-full p-6 border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Terms of Service</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground text-lg"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto text-gray-500 dark:text-gray-400 space-y-4">
              <p className="italic">
                Welcome to my portfolio website! By being here, you agree to the following terms, 
                whether you read them or not (but you should, because they're kinda funny):
              </p>

              <ol className="space-y-4 list-decimal pl-5">
                <li>
                  <strong>No Judging Allowed</strong><br />
                  Yes, I built this with more coffee than sleep. Yes, there might be typos. 
                  If you find one, congratulations—you now work in QA. Welcome to the team. Pay is hugs (virtual).
                </li>
                
                <li>
                  <strong>Use At Your Own Risk</strong><br />
                  This site might make you laugh, cry, or question your own life choices. 
                  I'm not responsible for any emotional damage caused by my color choices or cheesy jokes in the code.
                </li>
                
                <li>
                  <strong>No Hacky Hackers</strong><br />
                  If you try to hack this site, may your Wi-Fi forever be unstable and your coffee always cold. 
                  Seriously though, don't.
                </li>
                
                <li>
                  <strong>Resume Download = Intent to Hire?</strong><br />
                  Downloading my resume implies you might want to give me a job. 
                  It's legally binding (not really).
                </li>
                
                <li>
                  <strong>No Copycats</strong><br />
                  Feel free to get inspired, but if you Ctrl+C my entire portfolio and Ctrl+V it as yours, 
                  I will send my grandma after you. She's ruthless and owns a 9.
                </li>
                
                <li>
                  <strong>Compliments Encouraged</strong><br />
                  If you like my work, you're legally required (again, not really) to drop me a message or send cookies. 
                  Digital cookies are okay too.
                </li>
                
                <li>
                  <strong>Bugs Are Feature Candidates</strong><br />
                  If you find a bug, it's not a bug. It's an interactive mystery experience. You're welcome.
                </li>
                
                <li>
                  <strong>Terms Subject to Change When I'm Bored</strong><br />
                  These terms might change whenever I feel like being funnier, or if I find a better joke.
                </li>
              </ol>
              
              <p className="italic">
                Thanks for visiting! Now go check out my projects.
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                I Pinky Promise I'll Behave
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}