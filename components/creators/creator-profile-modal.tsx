// components/creators/creator-profile-modal.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { 
  X, Instagram, Copy, Check, Share2, Twitter, 
  Linkedin, Facebook, MessageCircle, Download, RefreshCw 
} from "lucide-react"
import { toPng } from "html-to-image"
import { SheetCreator, formatFollowerCount } from "@/lib/sheets"

interface CreatorProfileModalProps {
  creator: SheetCreator | null
  isOpen: boolean
  onClose: () => void
}

export function CreatorProfileModal({ creator, isOpen, onClose }: CreatorProfileModalProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [emailRevealed, setEmailRevealed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  // Ref to the front-face card template that we always keep in the DOM (hidden or absolute) 
  // to ensure html-to-image captures the front face correctly even if the visible card is flipped.
  const downloadCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setIsFlipped(false)
      setEmailRevealed(false)
      setShareOpen(false)
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen || !creator) return null

  // Generate unique credential ID based on creator sheet ID
  const rawId = creator.id.replace("sheet-", "")
  const registryNum = rawId.padStart(5, "0")
  const registryId = `UPF-CR-2026-${registryNum}`

  // Format Join Date
  const joinDate = creator.joinedAt
    ? new Date(creator.joinedAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      })
    : ""

  // Share text and links
  const shareText = `Check out ${creator.fullName}'s Official Creator Registry Record on UpForge!`
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/creators?creator=${creator.instagramHandle}`
    : ""

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setShareCopied(true)
      setTimeout(() => setShareCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL", err)
    }
  }

  const handleDownload = async () => {
    if (!downloadCardRef.current) return
    setDownloading(true)
    try {
      // Small timeout to allow styles to settle
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      const dataUrl = await toPng(downloadCardRef.current, {
        quality: 0.95,
        pixelRatio: 3, // Very high quality export
        skipFonts: true,
        style: {
          transform: "scale(1)",
        }
      })

      const link = document.createElement("a")
      link.download = `${creator.instagramHandle}-upforge-registry-card.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error generating creator card image:", error)
    } finally {
      setDownloading(false)
    }
  }

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const initials = getInitials(creator.fullName)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 overflow-y-auto bg-black/60 backdrop-blur-sm">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-background border-2 border-foreground rounded-2xl shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 gap-0 max-h-[95vh] md:max-h-[90vh]">
        
        {/* Left Side: Card Canvas (8 cols on desktop) */}
        <div className="md:col-span-7 bg-muted/40 p-4 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r-2 border-foreground overflow-y-auto">
          
          {/* Card Frame with Perspective */}
          <div 
            className="w-[210px] sm:w-[320px] md:w-[340px] h-[300px] sm:h-[460px] md:h-[490px] cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Flippable Card Wrapper */}
            <div 
              className="relative w-full h-full duration-700 ease-in-out"
              style={{ 
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
              }}
            >
              
              {/* CARD FRONT FACE */}
              <div 
                className="absolute inset-0 bg-white border border-slate-300 rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-6 shadow-md flex flex-col justify-between select-none"
                style={{ backfaceVisibility: "hidden" }}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 sm:pb-3">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#e6683c] rounded flex items-center justify-center">
                      <span className="text-[8px] sm:text-[10px] text-white font-black">UF</span>
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-black tracking-widest text-slate-800 uppercase font-serif">
                      UpForge Registry
                    </span>
                  </div>
                  <span className="text-[6px] sm:text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                    Official Credential
                  </span>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col items-center justify-center py-2 sm:py-4">
                  {/* Profile Pic with Premium Verified Rings */}
                  <div className="relative mb-2 sm:mb-3.5">
                    <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 sm:ring-4 ring-slate-100 ring-offset-1 sm:ring-offset-2 ring-offset-slate-200 shadow-inner flex items-center justify-center bg-slate-50">
                      {creator.profilePicture ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={creator.profilePicture} 
                          alt={creator.fullName} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const t = e.target as HTMLImageElement
                            t.style.display = "none"
                            if (t.parentElement) t.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f09433] to-[#dc2743] text-white text-xs sm:text-xl font-bold">${initials}</div>`
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f09433] to-[#dc2743] text-white text-xs sm:text-xl font-bold">
                          {initials}
                        </div>
                      )}
                    </div>
                    {/* Blue check stamp */}
                    <div className="absolute bottom-0 right-0 sm:right-1 bg-white rounded-full p-0.5 shadow-md">
                      <svg className="w-4 h-4 sm:w-6 sm:h-6 text-[#0095F6]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                  </div>

                  {/* Creator Info */}
                  <h3 className="font-serif text-sm sm:text-xl font-black text-slate-800 text-center mb-0.5 sm:mb-1">
                    {creator.fullName}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium mb-1 sm:mb-2">
                    @{creator.instagramHandle}
                  </p>

                  {/* Niche / Category */}
                  <span className="px-2 sm:px-3 py-0.5 rounded-full border border-amber-300 bg-amber-50 text-[8px] sm:text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-2 sm:mb-3">
                    {creator.niche}
                  </span>

                  {/* Verification Status Banner */}
                  <div className="w-full bg-slate-50 border border-slate-100 rounded-lg sm:rounded-xl py-1 sm:py-2 px-2 sm:px-3 flex items-center justify-around gap-0.5 sm:gap-1">
                    <div className="text-center">
                      <p className="text-[6px] sm:text-[8px] text-slate-400 uppercase tracking-wider font-semibold">Audience Reach</p>
                      <p className="text-[10px] sm:text-xs font-black text-slate-800">
                        {creator.followerCount > 0 ? formatFollowerCount(creator.followerCount) : creator.followerCountRaw}
                      </p>
                    </div>
                    <div className="h-4 sm:h-6 w-px bg-slate-200" />
                    <div className="text-center">
                      <p className="text-[6px] sm:text-[8px] text-slate-400 uppercase tracking-wider font-semibold">Trust Score</p>
                      <p className="text-[10px] sm:text-xs font-black text-emerald-600">
                        {creator.motivationScore > 0 ? `${creator.motivationScore}/10` : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-100 pt-2 sm:pt-3 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[6px] sm:text-[7px] text-slate-400 uppercase tracking-widest font-semibold">Registry Number</p>
                    <p className="text-[8px] sm:text-[9px] font-mono font-bold text-slate-600">{registryId}</p>
                  </div>
                  <div className="flex items-center gap-0.5 sm:gap-1 bg-emerald-50 text-emerald-700 px-1.5 sm:px-2 py-0.5 rounded-md border border-emerald-100">
                    <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[6px] sm:text-[8px] font-black uppercase tracking-wider">Active</span>
                  </div>
                </div>
              </div>

              {/* CARD BACK FACE */}
              <div 
                className="absolute inset-0 bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-6 shadow-md flex flex-col justify-between select-none"
                style={{ 
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 sm:pb-3">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-500 rounded flex items-center justify-center">
                      <span className="text-[8px] sm:text-[10px] text-slate-950 font-black">★</span>
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-black tracking-widest text-white uppercase font-serif">
                      Registry Metadata
                    </span>
                  </div>
                  <span className="text-[6px] sm:text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                    Data Records
                  </span>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col justify-center py-2 sm:py-4 text-slate-300">
                  {/* Dynamic Bio Intro */}
                  <div className="bg-slate-950/40 border border-slate-800 rounded-lg sm:rounded-xl p-2 sm:p-3 mb-2 sm:mb-4">
                    <p className="text-[9px] sm:text-[11px] leading-relaxed italic text-slate-300 line-clamp-3 sm:line-clamp-none">
                      &ldquo;{creator.fullName} is an officially verified content creator specializing in the {creator.niche} category. Recognized as an active registry member at UpForge, they maintain a verified audience reach of {creator.followerCount > 0 ? formatFollowerCount(creator.followerCount) : creator.followerCountRaw} followers.&rdquo;
                    </p>
                  </div>

                  {/* Metadata Stats Grid */}
                  <div className="space-y-1 sm:space-y-2 text-[10px] sm:text-xs">
                    <div className="flex justify-between py-0.5 sm:py-1 border-b border-slate-800/60">
                      <span className="text-slate-500">Registry Stamp</span>
                      <span className="font-mono text-slate-300 font-bold">{registryId}</span>
                    </div>
                    <div className="flex justify-between py-0.5 sm:py-1 border-b border-slate-800/60">
                      <span className="text-slate-500">Registry Join Date</span>
                      <span className="text-slate-300 font-semibold">{joinDate}</span>
                    </div>
                    
                    {/* Reveal Email section */}
                    <div className="flex justify-between items-center py-1 sm:py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-500">Business Inquiry</span>
                      {creator.email ? (
                        emailRevealed ? (
                          <div className="flex items-center gap-1 bg-slate-950 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-slate-800">
                            <span className="text-[8px] sm:text-[10px] font-mono text-yellow-400">
                              {creator.email}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                navigator.clipboard.writeText(creator.email || "")
                                setCopied(true)
                                setTimeout(() => setCopied(false), 2000)
                              }}
                              className="p-0.5 sm:p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                            >
                              {copied ? <Check className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-emerald-500" /> : <Copy className="w-2.5 sm:w-3 h-2.5 sm:h-3" />}
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setEmailRevealed(true)
                            }}
                            className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-[8px] sm:text-[10px] uppercase tracking-wider transition-colors shadow-sm"
                          >
                            Reveal Email
                          </button>
                        )
                      ) : (
                        <span className="text-slate-400 font-mono text-[9px] sm:text-xs">
                          Not Provided
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-800 pt-2 sm:pt-3 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[6px] sm:text-[7px] text-slate-505 uppercase tracking-widest font-semibold font-serif">Verified Issuer</p>
                    <p className="text-[8px] sm:text-[9px] font-black text-slate-400 tracking-wider">UPFORGE GLOBAL INC.</p>
                  </div>
                  <span className="text-[6px] sm:text-[8px] font-semibold text-slate-500 uppercase">
                    Click Card to Flip
                  </span>
                </div>
              </div>

            </div>
          </div>

          <button 
            onClick={() => setIsFlipped(!isFlipped)}
            className="mt-4 flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-foreground bg-background text-foreground text-xs font-bold hover:bg-muted transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {isFlipped ? "View Card Front" : "Flip to Details"}
          </button>
        </div>

        {/* Right Side: Action Kit (5 cols on desktop) */}
        <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-background overflow-y-auto">
          {/* Close button & Title */}
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[9px] font-bold text-[#e6683c] uppercase tracking-widest block mb-1">
                  Creator Registry Profile
                </span>
                <h2 className="font-serif text-2xl font-black text-foreground leading-tight">
                  {creator.fullName}
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-full border border-slate-200 hover:bg-muted text-slate-600 hover:text-black transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              Verify membership, download a high-fidelity digital card, and share their credentials with your network or brands for collaborations.
            </p>

            {/* Download section */}
            <div className="border-t border-border pt-5 mb-6">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Download Card Kit
              </h4>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                {downloading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating PNG...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Registry Card (PNG)
                  </>
                )}
              </button>
            </div>

            {/* Share section */}
            <div className="border-t border-border pt-5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Share Verification
              </h4>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-border hover:bg-muted text-xs font-semibold text-foreground transition-all"
                >
                  {shareCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Link
                    </>
                  )}
                </button>

                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-green-50 hover:bg-green-100/80 border border-green-200 text-green-700 text-xs font-semibold transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>

                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-all"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  Twitter / X
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Registry Verification Stamp */}
          <div className="border-t border-border pt-4 mt-6 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-foreground">Verified Registry Record</p>
              <p className="text-[9px] text-muted-foreground">UpForge Global Index verifies identity, niche category and audience reach metrics.</p>
            </div>
          </div>

        </div>

      </div>

      {/* 
        OFF-SCREEN CARD FOR EXPORT:
        We render a perfect front face of the card in a fixed, off-screen container.
        This container is styled explicitly to guarantee high fidelity PNG capture,
        regardless of whether the visible card is currently flipped, scaled or loading.
        It uses a custom data attribute to identify it, and sits at a large container.
      */}
      <div className="fixed top-[-9999px] left-[-9999px] pointer-events-none" aria-hidden="true">
        <div 
          ref={downloadCardRef}
          className="w-[380px] h-[520px] bg-white border border-slate-300 rounded-[28px] p-7 shadow-lg flex flex-col justify-between flex-shrink-0"
          style={{ boxSizing: "border-box" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#e6683c] rounded flex items-center justify-center">
                <span className="text-[11px] text-white font-black">UF</span>
              </div>
              <span className="text-[11px] font-black tracking-widest text-slate-800 uppercase font-serif">
                UpForge Registry
              </span>
            </div>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
              Official Credential
            </span>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col items-center justify-center py-5">
            {/* Profile Pic with Premium Verified Rings */}
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-slate-100 ring-offset-2 ring-offset-slate-200 shadow-inner flex items-center justify-center bg-slate-50">
                {creator.profilePicture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={`/api/creator-avatar?url=${encodeURIComponent(creator.profilePicture)}`} 
                    alt={creator.fullName} 
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous" // Set CORS anonymous to enable canvas pixel reading
                    onError={(e) => {
                      const t = e.target as HTMLImageElement
                      t.style.display = "none"
                      if (t.parentElement) t.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f09433] to-[#dc2743] text-white text-xl font-bold">${initials}</div>`
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f09433] to-[#dc2743] text-white text-xl font-bold">
                    {initials}
                  </div>
                )}
              </div>
              {/* Blue check stamp */}
              <div className="absolute bottom-0 right-1 bg-white rounded-full p-0.5 shadow-md">
                <svg className="w-6 h-6 text-[#0095F6]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
            </div>

            {/* Creator Info */}
            <h3 className="font-serif text-xl font-black text-slate-800 text-center mb-1">
              {creator.fullName}
            </h3>
            <p className="text-xs text-slate-500 font-medium mb-3">
              @{creator.instagramHandle}
            </p>

            {/* Niche / Category */}
            <span className="px-3.5 py-0.5 rounded-full border border-amber-300 bg-amber-50 text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-4">
              {creator.niche}
            </span>

            {/* Verification Status Banner */}
            <div className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 flex items-center justify-around gap-1">
              <div className="text-center">
                <p className="text-[8px] text-slate-400 uppercase tracking-wider font-semibold">Audience Reach</p>
                <p className="text-xs font-black text-slate-800">
                  {creator.followerCount > 0 ? formatFollowerCount(creator.followerCount) : creator.followerCountRaw}
                </p>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div className="text-center">
                <p className="text-[8px] text-slate-400 uppercase tracking-wider font-semibold">Trust Score</p>
                <p className="text-xs font-black text-emerald-600">
                  {creator.motivationScore > 0 ? `${creator.motivationScore}/10` : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
            <div className="text-left">
              <p className="text-[7px] text-slate-400 uppercase tracking-widest font-semibold">Registry Number</p>
              <p className="text-[9px] font-mono font-bold text-slate-600">{registryId}</p>
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md border border-emerald-100">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-[8px] font-black uppercase tracking-wider">Active</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
