"use client"   
import { useState } from "react"
import { motion } from "framer-motion"
import { Linkedin, Twitter, Mail, MapPin, Award } from "lucide-react"

interface FounderFlipCardProps {
  name: string
  role: string
  photo: string
  initials: string
  bio: string
  expertise: string[]
  location: string
}

export function FounderFlipCard({
  name,
  role,
  photo,
  initials,
  bio,
  expertise,
  location,
}: FounderFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="w-full max-w-2xl mx-auto h-[400px] cursor-pointer"
      style={{ perspective: 1200 }}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 w-full h-full p-8 rounded-2xl border-2 border-foreground bg-background flex flex-col md:flex-row items-center md:items-start gap-8 shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Photo */}
          <div className="shrink-0">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-foreground bg-[#C59A2E20] flex items-center justify-center font-bold text-3xl text-[#C59A2E]" style={{ fontFamily: "Georgia, serif" }}>
              <span className="absolute inset-0 flex items-center justify-center z-0">{initials}</span>
              <img
                src={photo}
                alt={`${name} — Founder`}
                className="absolute inset-0 w-full h-full object-cover z-10 bg-background"
                onError={(e) => {
                  // Hide image on error to show initials fallback
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center md:text-left flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="text-[#C59A2E] text-xs">✦</span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C59A2E]">FOUNDER SPOTLIGHT</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1" style={{ fontFamily: "'Georgia', serif" }}>
                {name}
              </h2>
              <p className="font-mono text-xs font-black uppercase tracking-[0.15em] text-[#C59A2E] mb-4">
                {role}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed font-serif italic mb-4">
                {bio.split(".")[0]}. Click/Hover to read full editorial profile and expertise.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center md:justify-start gap-1 text-xs text-muted-foreground font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>{location}</span>
              </div>
              <span className="text-[10px] font-mono text-[#C59A2E] animate-pulse">
                ↻ CLICK OR HOVER CARD TO FLIP
              </span>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full p-8 rounded-2xl border-2 border-[#C59A2E] bg-background flex flex-col shadow-xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-[#C59A2E]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C59A2E]">
                  EDITORIAL MISSION & EXPERTISE
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "'Georgia', serif" }}>
                Lucky Tiwari
              </h3>
              
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-serif mb-6">
                {bio}
              </p>

              <div className="space-y-2">
                <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-foreground">Areas of Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#C59A2E]/10 border border-[#C59A2E]/30 px-2.5 py-1 text-[10px] font-mono text-[#C59A2E] rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex gap-4">
                <a
                  href="#"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-full border border-border hover:border-[#C59A2E] hover:text-[#C59A2E] transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-full border border-border hover:border-[#C59A2E] hover:text-[#C59A2E] transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="mailto:lucky@upforge.org"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-full border border-border hover:border-[#C59A2E] hover:text-[#C59A2E] transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              
              <span className="font-mono text-[10px] text-[#C59A2E]">
                UpForge Editorial Leadership
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
