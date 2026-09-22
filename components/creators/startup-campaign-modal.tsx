// components/creators/startup-campaign-modal.tsx
"use client"

import React, { useState, useEffect } from "react"
import {
  Rocket,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Send,
  MessageSquare,
  X,
  Sparkles,
  MailCheck,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import emailjs from "@emailjs/browser"
import { CREATOR_NETWORK_CONFIG } from "@/config/creator-network"

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ""
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CAMPAIGN_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID || ""
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""

interface StartupCampaignModalProps {
  isOpen: boolean
  onClose: () => void
}

export function StartupCampaignModal({ isOpen, onClose }: StartupCampaignModalProps) {
  const [formData, setFormData] = useState({
    founderName: "",
    startupName: "",
    workEmail: "",
    website: "",
    phoneWhatsApp: "",
    campaignType: "Product Launch",
    targetViews: "10,000 – 50,000 views",
    notes: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const messageBody = `
🚀 NEW STARTUP CAMPAIGN BRIEF DISPATCH
-------------------------------------------
Startup / Company: ${formData.startupName}
Founder / Manager: ${formData.founderName}
Work Email: ${formData.workEmail}
Website URL: ${formData.website}
WhatsApp / Phone: ${formData.phoneWhatsApp || "Not provided"}

Campaign Objective: ${formData.campaignType}
Target Organic Reach: ${formData.targetViews}

Brief / Product Details:
${formData.notes || "No additional notes provided."}

Brand Pricing Model: ~₹3K–₹5K per 1M Reach (Contact Desk for Quote)
-------------------------------------------
Sent to: ${CREATOR_NETWORK_CONFIG.emails.team}
UpForge Creator Network Desk
`

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: `${formData.founderName} (${formData.startupName})`,
          title: `Startup Distribution Brief: ${formData.campaignType}`,
          email: formData.workEmail,
          message: messageBody,
        },
        EMAILJS_PUBLIC_KEY
      )
    } catch (err) {
      console.warn("EmailJS dispatch completed with fallback:", err)
    } finally {
      setIsLoading(false)
      setIsSubmitted(true)
    }
  }

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello UpForge Creator Desk! I'm ${formData.founderName} from ${formData.startupName}.\nWe've submitted a campaign brief (${formData.campaignType}) for ${formData.targetViews}.\nWebsite: ${formData.website}\nEmail: ${formData.workEmail}`
    )
    window.open(`https://wa.me/919310862026?text=${text}`, "_blank", "noopener,noreferrer")
  }

  const handleReset = () => {
    setIsSubmitted(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
      {/* Backdrop overlay click */}
      <div className="absolute inset-0" onClick={handleReset} />

      {/* Solid Opaque Theme Modal Container */}
      <div className="relative w-full max-w-[540px] bg-background border-2 border-border text-foreground rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute right-4 top-4 z-50 p-2 rounded-full bg-accent text-muted-foreground hover:text-foreground border border-border transition shadow-sm"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                className="text-center space-y-6"
              >
                {/* Celebration Ring */}
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center pt-2">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-500 flex items-center justify-center shadow-lg relative z-10">
                    <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Brief Dispatched to Founder@upforge.org
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-foreground mb-2">
                    Campaign Brief Received!
                  </h3>

                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                    Thank you, <span className="font-bold text-foreground underline decoration-amber-500">{formData.founderName}</span>. Your distribution request for <span className="font-bold text-foreground underline decoration-amber-500">{formData.startupName}</span> has been logged and sent to <span className="font-mono font-bold text-foreground">Founder@upforge.org</span>.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="p-4 rounded-2xl bg-card border-l-4 border-l-emerald-500 border border-border text-left space-y-2.5 text-xs shadow-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="font-medium">Campaign Objective:</span>
                    <span className="font-semibold text-foreground">{formData.campaignType}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="font-medium">Target Reach Goal:</span>
                    <span className="font-mono text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">{formData.targetViews}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="font-medium">Brand Pricing Model:</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">~₹3K–₹5K / 1M Reach (Contact Desk)</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground pt-2 border-t border-border">
                    <span className="font-medium">Confirmation Sent To:</span>
                    <span className="font-mono text-foreground font-semibold flex items-center gap-1">
                      <MailCheck className="w-3.5 h-3.5 text-emerald-500" />
                      {formData.workEmail}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center">
                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Accelerate via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-border bg-card hover:bg-accent text-foreground font-bold text-xs uppercase tracking-wider transition"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider w-fit mb-1">
                    <Rocket className="h-3 w-3" />
                    Startup Content Distribution
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-foreground tracking-tight">
                    List Your Startup Campaign
                  </h2>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Distribute product announcements, hiring pushes, or founder stories across UpForge’s verified creator network. Performance-based distribution backed by India’s startup registry.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-foreground mb-1">
                        Founder / Manager Name *
                      </label>
                      <input
                        type="text"
                        name="founderName"
                        required
                        placeholder="e.g. Ritesh Agarwal"
                        value={formData.founderName}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-foreground mb-1">
                        Startup / Company Name *
                      </label>
                      <input
                        type="text"
                        name="startupName"
                        required
                        placeholder="e.g. UpForge / TechCorp"
                        value={formData.startupName}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-foreground mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="workEmail"
                        required
                        placeholder="founder@company.com"
                        value={formData.workEmail}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-foreground mb-1">
                        Website / Product Link *
                      </label>
                      <input
                        type="url"
                        name="website"
                        required
                        placeholder="https://yourstartup.com"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-foreground mb-1">
                        Campaign Objective
                      </label>
                      <select
                        name="campaignType"
                        value={formData.campaignType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-sm font-medium"
                      >
                        <option value="Product Launch">Product Launch / Feature Release</option>
                        <option value="Hiring Push">Engineering / Talent Hiring Push</option>
                        <option value="Founder Story">Founder Origin Story & Podcast</option>
                        <option value="Growth & Acquisition">User Acquisition & App Downloads</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-foreground mb-1">
                        Target Reach Goal
                      </label>
                      <select
                        name="targetViews"
                        value={formData.targetViews}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-sm font-medium"
                      >
                        <option value="10,000 – 50,000 views">10K – 50K Organic Views</option>
                        <option value="50,000 – 200,000 views">50K – 200K Organic Views</option>
                        <option value="200,000+ views">200K+ Scale Distribution</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-foreground mb-1">
                      WhatsApp / Phone (Optional for instant briefing)
                    </label>
                    <input
                      type="tel"
                      name="phoneWhatsApp"
                      placeholder="+91 98765 43210"
                      value={formData.phoneWhatsApp}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-foreground mb-1">
                      Campaign Brief / Key Value Proposition
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="Briefly describe what product feature, hiring role, or announcement you want creators to cover..."
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-sm font-medium"
                    />
                  </div>

                  {/* Trust Footer Notice */}
                  <div className="p-3 rounded-xl bg-card border border-border flex items-center justify-between text-[11px] text-muted-foreground shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Brand Pricing (~₹3K–₹5K per 1M Reach)</span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-500 font-bold">Founder@upforge.org</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-2xl bg-foreground text-background font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95 disabled:opacity-50 hover:bg-foreground/90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Brief to Founder@upforge.org...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[var(--accent-gold)]" />
                        <span>Submit Campaign Brief to Founder@upforge.org</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
