"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"

export function FounderNewsletter() {
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
    <section className="bg-[#1A1208] text-white py-12">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#C59A2E] text-[10px] font-black uppercase tracking-[0.3em] mb-4 font-mono">
            The Founder Chronicle
          </p>
          <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Get the latest founder stories in your inbox.
          </h2>
          <p className="text-white/60 text-sm mb-8 font-serif italic">
            Weekly deep-dives into the builders reshaping the global economy. No spam, unsubscribe anytime.
          </p>
          
          {submitted ? (
            <div className="bg-[#C59A2E]/20 border border-[#C59A2E] p-4">
              <p className="text-[#C59A2E] font-bold">Thank you for subscribing!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#C59A2E] text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C59A2E] text-white font-bold uppercase tracking-wider text-[10px] hover:bg-[#A8821E] transition-colors flex items-center justify-center gap-2 font-mono"
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
