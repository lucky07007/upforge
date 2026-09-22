"use client"

import { useState } from "react"
import { ArrowRight, Mail } from "lucide-react"

export function ResearchNewsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="border-t-2 border-foreground py-12 bg-muted/20">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-8 h-8 text-[#C59A2E] mx-auto mb-4" />
          
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
            Get Weekly Startup Intelligence
          </h2>
          <p className="font-serif italic text-muted-foreground mb-8">
            Verified market insights, emerging trends, and UFRN updates. No spam.
          </p>
          
          {submitted ? (
            <div className="bg-[#C59A2E]/10 border border-[#C59A2E] p-4">
              <p className="text-[#C59A2E] font-bold">Thank you! You're subscribed.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-4 py-3 bg-background border-2 border-foreground text-foreground placeholder:text-muted-foreground font-serif italic focus:outline-none focus:border-[#C59A2E] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-foreground text-background font-mono font-bold text-[10px] uppercase tracking-wider hover:bg-[#C59A2E] transition-colors flex items-center justify-center gap-2"
              >
                Subscribe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
