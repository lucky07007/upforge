"use client"

import React, { useRef, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Loader2, Crown, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function BusinessForm({ 
  isMobile = false, 
  forceOpen = false 
}: { 
  isMobile?: boolean, 
  forceOpen?: boolean 
}) {
  const form = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Agar forceOpen true hai (jaise /apply page pe), toh state true rahegi
  const [isOpen, setIsOpen] = useState(forceOpen)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (pathname === "/apply") {
      setIsOpen(true)
    }
  }, [pathname])

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await emailjs.sendForm(
        "service_hez7mw9",
        "template_htai0ev",
        form.current!,
        "qsf9Wt-yXfBKQ7CD7"
      )
      setIsSubmitted(true)
    } catch (error) {
      setIsSubmitted(true)
    } finally {
      setIsLoading(false)
    }
  }

  // Proper navigation to home on close
  const handleClose = () => {
    setIsOpen(false)
    setIsSubmitted(false)
    router.push("/")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleClose()
      else setIsOpen(true)
    }}>
      {/* Trigger sirf tab dikhao jab forceOpen na ho */}
      {!forceOpen && (
        <DialogTrigger asChild>
          {isMobile ? (
            <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-black border-b-2 border-black pb-0.5">
              Connect then Grow
            </button>
          ) : (
            <Button className="h-12 rounded-full px-8">
              List Your Startup
            </Button>
          )}
        </DialogTrigger>
      )}

      <DialogContent 
        // /apply page par background click se close hona disable karne ke liye interactOutside handle kiya
        onInteractOutside={(e) => {
          if(pathname === "/apply") e.preventDefault()
        }}
        className="sm:max-w-[480px] p-0 bg-white border border-zinc-200 rounded-2xl shadow-xl"
      >
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4 text-zinc-500" />
        </button>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 text-center">
              <div className="flex justify-center mb-6">
                <div className="h-14 w-14 rounded-full bg-black text-white flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Application Received</h3>
              <p className="text-zinc-600 text-sm">Your startup has been logged into the registry queue.</p>
              <Button className="mt-8 w-full h-11 rounded-lg" onClick={handleClose}>
                Done
              </Button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
              <DialogHeader className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-4 w-4 text-amber-500" />
                  <span className="text-xs uppercase tracking-widest text-zinc-500">Founder Submission</span>
                </div>
                <DialogTitle className="text-2xl font-semibold">Apply for Listing</DialogTitle>
                <DialogDescription className="text-zinc-600 text-sm">Submit your startup details for registry review.</DialogDescription>
              </DialogHeader>

              <form ref={form} onSubmit={sendEmail} className="grid gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input name="from_name" placeholder="Founder Name" required />
                  <Input name="business_name" placeholder="Startup Name" required />
                </div>
                <Input name="reply_to" type="email" placeholder="Work Email" required />
                <Input name="website" type="url" placeholder="Website URL" required />
                <Textarea name="message" placeholder="Short description..." required />
                <Button type="submit" disabled={isLoading} className="mt-2 h-12 rounded-lg">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit for Review"}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
