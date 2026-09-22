// components/creators/apply-modal.tsx

"use client"

import { X, Instagram, Send } from "lucide-react"
import { useState, useEffect } from "react"

interface ApplyModalProps {
  isOpen: boolean
  onClose: () => void
  formUrl: string
}

export function ApplyModal({ isOpen, onClose, formUrl }: ApplyModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background border-2 border-foreground w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b-2 border-foreground bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743]">
          <div className="flex items-center gap-2">
            <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <h2 className="font-serif text-base md:text-xl font-bold text-white">
              Apply for Creator Verification
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>
        </div>

        {/* Google Form Embed */}
        <div className="relative h-[500px] md:h-[600px] bg-white">
          <iframe
            src={formUrl}
            className="w-full h-full border-0"
            title="Creator Application Form"
          >
            Loading...
          </iframe>
        </div>

        {/* Footer */}
        <div className="p-3 md:p-4 border-t-2 border-foreground bg-muted/30">
          <p className="text-[10px] md:text-xs text-center text-muted-foreground">
            Powered by UpForge • 100% Free • Response within 48 hours
          </p>
        </div>
      </div>
    </div>
  )
}
