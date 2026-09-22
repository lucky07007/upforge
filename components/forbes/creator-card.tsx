// components/forbes/creator-card.tsx

import Image from "next/image"
import Link from "next/link"
import { Instagram, Users, Grid3x3, TrendingUp, Award, Calendar } from "lucide-react"

interface CreatorCardProps {
  creator: {
    id: string
    uf_id: string
    name: string
    instagram_handle: string
    category?: string
    profile_pic_url: string
    followers_count: number
    posts_count: number
    is_verified: boolean
    biography?: string
    engagement_rate?: string
    joined_date?: string
  }
  featured?: boolean
  index?: number
}

export function CreatorCard({ creator, featured = false, index }: CreatorCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  if (featured) {
    return (
      <Link
        href={`https://instagram.com/${creator.instagram_handle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <article className="relative bg-background border border-border hover:border-foreground transition-all duration-300">
          {/* UF ID Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="font-sans font-black text-[8px] uppercase tracking-[0.15em] bg-foreground text-background px-2 py-0.5 border border-border">
              {creator.uf_id}
            </span>
          </div>

          {/* Featured Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className="font-sans font-black text-[8px] uppercase tracking-[0.2em] bg-[#C59A2E] text-background px-2 py-0.5 flex items-center gap-1">
              <Award className="w-2.5 h-2.5" />
              Featured
            </span>
          </div>

          {/* Profile Image */}
          <div className="aspect-square relative overflow-hidden bg-muted">
            <Image
              src={creator.profile_pic_url}
              alt={creator.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            
            {/* Verified Overlay */}
            {creator.is_verified && (
              <div className="absolute bottom-3 left-3">
                <div className="bg-background/90 backdrop-blur-sm border border-[#C59A2E] px-2 py-1 flex items-center gap-1">
                  <span className="text-[#C59A2E] text-lg leading-none">✓</span>
                  <span className="font-sans font-black text-[8px] uppercase tracking-wider text-foreground">
                    Verified
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 border-t border-border">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3
                  className="font-serif text-xl font-bold text-foreground group-hover:text-[#C59A2E] transition-colors"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {creator.name}
                </h3>
                <p className="font-sans text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
                  @{creator.instagram_handle}
                </p>
              </div>
              <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-[#C59A2E] transition-colors shrink-0" />
            </div>

            {creator.category && (
              <p className="font-sans text-[10px] font-black uppercase tracking-[0.15em] text-[#C59A2E] mb-3">
                {creator.category}
              </p>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
              <div className="text-center">
                <Users className="w-3 h-3 text-muted-foreground mx-auto mb-1" />
                <div className="font-sans font-bold text-sm text-foreground">
                  {formatNumber(creator.followers_count)}
                </div>
                <div className="font-sans text-[8px] uppercase tracking-wider text-muted-foreground">
                  Followers
                </div>
              </div>
              <div className="text-center">
                <Grid3x3 className="w-3 h-3 text-muted-foreground mx-auto mb-1" />
                <div className="font-sans font-bold text-sm text-foreground">
                  {formatNumber(creator.posts_count)}
                </div>
                <div className="font-sans text-[8px] uppercase tracking-wider text-muted-foreground">
                  Posts
                </div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-3 h-3 text-muted-foreground mx-auto mb-1" />
                <div className="font-sans font-bold text-sm text-foreground">
                  {creator.engagement_rate}%
                </div>
                <div className="font-sans text-[8px] uppercase tracking-wider text-muted-foreground">
                  Engagement
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Regular card with circular format
  return (
    <Link
      href={`https://instagram.com/${creator.instagram_handle}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <article className="flex flex-col items-center text-center">
        {/* Circular Profile Image */}
        <div className="relative mb-4">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-border group-hover:border-[#C59A2E] transition-all duration-300 relative">
            <Image
              src={creator.profile_pic_url}
              alt={creator.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              sizes="128px"
            />
          </div>
          
          {/* UF ID Badge */}
          <div className="absolute -top-2 -left-2 bg-foreground border border-border px-1.5 py-0.5">
            <span className="font-sans font-black text-[8px] text-background tracking-wider">
              {creator.uf_id}
            </span>
          </div>

          {/* Verified Badge */}
          {creator.is_verified && (
            <div className="absolute -bottom-1 -right-1 bg-background border-2 border-[#C59A2E] rounded-full p-0.5">
              <span className="text-[#C59A2E] text-sm leading-none">✓</span>
            </div>
          )}
        </div>

        {/* Content */}
        <h3
          className="font-serif text-lg font-bold text-foreground group-hover:text-[#C59A2E] transition-colors"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {creator.name}
        </h3>
        
        <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5 mb-1">
          @{creator.instagram_handle}
        </p>

        {creator.category && (
          <p className="font-sans text-[9px] font-black uppercase tracking-[0.15em] text-[#C59A2E] mt-1 mb-2">
            {creator.category}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-muted-foreground" />
            <span className="font-sans font-bold text-xs text-foreground">
              {formatNumber(creator.followers_count)}
            </span>
          </div>
          <div className="w-1 h-1 bg-border rounded-full" />
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-muted-foreground" />
            <span className="font-sans font-bold text-xs text-foreground">
              {creator.engagement_rate}%
            </span>
          </div>
        </div>

        {/* Joined Date */}
        {creator.joined_date && (
          <div className="flex items-center gap-1 mt-2 text-muted-foreground">
            <Calendar className="w-2.5 h-2.5" />
            <span className="font-sans text-[8px] uppercase tracking-wider">
              Joined {new Date(creator.joined_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          </div>
        )}

        {/* View Profile Button */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1.5 font-sans font-black text-[9px] uppercase tracking-[0.15em] text-muted-foreground hover:text-[#C59A2E] transition-colors">
            View Instagram <Instagram className="w-3 h-3" />
          </span>
        </div>
      </article>
    </Link>
  )
}
