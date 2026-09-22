// components/creators/creator-card.tsx

"use client"

import Image from "next/image"
import { Instagram, ExternalLink } from "lucide-react"

interface CreatorCardProps {
  creator: {
    id: string
    uf_id: string
    name: string
    instagram_handle: string
    profile_image: string
    category?: string
    verified: boolean
    followers_count?: number
  }
  featured?: boolean
}

export function CreatorCard({ creator, featured = false }: CreatorCardProps) {
  const formatNumber = (num?: number) => {
    if (!num) return "0"
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const handleInstagramClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(`https://instagram.com/${creator.instagram_handle}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-col items-center text-center group">
      {/* Circular Profile Image */}
      <div className="relative mb-2 md:mb-3">
        <div className={`
          w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden relative
          ${featured ? 'ring-3 md:ring-4 ring-blue-400 ring-offset-2 ring-offset-background' : 'border-2 border-border'}
          transition-all duration-300
        `}>
          <Image
            src={creator.profile_image}
            alt={creator.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 80px, 112px"
          />
        </div>
        
        {/* Verified Orange Tick */}
        {creator.verified && (
          <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
            <svg 
              className="w-4 h-4 md:w-5 md:h-5 text-[#C59A2E]" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        )}
      </div>

      {/* Name with Verified Tick */}
      <div className="flex items-center justify-center gap-1 md:gap-1.5 mb-0.5">
        <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-[#C59A2E] transition-colors">
          {creator.name}
        </h3>
        {creator.verified && (
          <svg 
            className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C59A2E]" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        )}
      </div>
      
      {/* Handle */}
      <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5 md:mb-1">
        @{creator.instagram_handle}
      </p>

      {/* Category */}
      {creator.category && (
        <p className="text-[8px] md:text-[10px] font-medium uppercase tracking-wider text-[#C59A2E] mb-1 md:mb-2">
          {creator.category}
        </p>
      )}

      {/* Followers Count */}
      {creator.followers_count && (
        <p className="text-[10px] md:text-xs text-muted-foreground mb-2 md:mb-3">
          <span className="font-semibold text-foreground">{formatNumber(creator.followers_count)}</span> followers
        </p>
      )}

      {/* Instagram Button */}
      <button
        onClick={handleInstagramClick}
        className="inline-flex items-center gap-1 md:gap-1.5 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-medium text-white bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] hover:from-[#e6683c] hover:via-[#dc2743] hover:to-[#cc2366] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
      >
        <Instagram className="w-3 h-3 md:w-3.5 md:h-3.5" />
        View
        <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3" />
      </button>
    </div>
  )
}
