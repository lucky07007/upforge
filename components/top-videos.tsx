// components/top-videos.tsx — MAGAZINE EDITORIAL v4
"use client"

import { useState, useEffect } from "react"
import { Play } from "lucide-react"

export const YOUTUBE_IDS: { id: string; tag: string; date: string }[] = [
  { id: "Tqke3h25UwI", tag: "Strategy Insights", date: "4 April 2026" },
  { id: "rUA5wMBsrfw", tag: "Growth Playbook", date: "15 March 2026" },
  { id: "QN7FRDlZhRg", tag: "Venture Analysis", date: "22 March 2026" },
  { id: "PRltUBPyDm4", tag: "D2C Deep Dive", date: "15 March 2026" },
  { id: "UB9XT-St2sQ", tag: "Edtech Markets", date: "8 March 2026" },
]

interface VideoMeta {
  id: string
  title: string
  author: string
  thumbnail: string
  tag: string
  date: string
  loaded: boolean
  error: boolean
}

async function fetchYouTubeMeta(id: string): Promise<{ title: string; author: string; thumbnail: string }> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
    )
    if (!res.ok) throw new Error("oEmbed failed")
    const data = await res.json()
    return {
      title: data.title ?? "Untitled Intelligence Report",
      author: data.author_name ?? "UpForge",
      thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    }
  } catch {
    return {
      title: "UpForge Intelligence Briefing",
      author: "UpForge Editorial",
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    }
  }
}

function VideoSkeleton({ featured }: { featured?: boolean }) {
  if (featured) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animate-pulse bg-muted border border-border" style={{ aspectRatio: "16/9" }} />
        <div className="flex flex-col gap-4 justify-center">
          <div className="h-8 bg-muted border border-border w-3/4" />
          <div className="h-4 bg-muted border border-border w-full" />
          <div className="h-4 bg-muted border border-border w-5/6" />
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col sm:flex-row gap-5 py-6 border-b border-border">
      <div className="flex-shrink-0 animate-pulse bg-muted border border-border" style={{ width: 180, aspectRatio: "16/9" }} />
      <div className="flex-1 flex flex-col gap-3 justify-center">
        <div className="h-4 bg-muted border border-border w-3/4" />
        <div className="h-3 bg-muted border border-border w-1/2" />
      </div>
    </div>
  )
}

function FeaturedVideoCard({ video }: { video: VideoMeta }) {
  const [hovered, setHovered] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const href = `https://www.youtube.com/watch?v=${video.id}`

  if (!video.loaded) return <VideoSkeleton featured />

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block pb-12 mb-0 border-b-2 border-foreground"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative overflow-hidden border border-border bg-muted" style={{ aspectRatio: "16/9" }}>
          {!imgFailed ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
              style={{ transform: hovered ? "scale(1.03)" : "scale(1)", filter: hovered ? "grayscale(0%)" : "grayscale(20%)" }}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover grayscale"
            />
          )}

          <div className="absolute inset-0 flex items-center justify-center transition-all bg-black/10 group-hover:bg-black/20">
            <div className="w-16 h-16 flex items-center justify-center bg-background text-foreground rounded-full shadow-lg border border-border transition-transform group-hover:scale-110">
              <Play className="w-6 h-6 ml-1 fill-foreground" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <span className="text-[10px] tracking-widest uppercase font-bold px-3 py-1 border border-border text-foreground font-sans bg-muted">
              {video.tag}
            </span>
          </div>

          <h3
            className="leading-tight mb-5 transition-colors duration-300 font-bold"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(24px, 3.5vw, 36px)",
              color: "var(--foreground)",
            }}
          >
            {video.title}
          </h3>

          <div className="flex items-center justify-between pt-6 border-t border-border mt-4">
            <span className="text-[11px] font-bold tracking-widest font-sans uppercase text-muted-foreground">
              {video.author} <span className="mx-2 font-normal text-border">|</span> {video.date}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-foreground flex items-center gap-2 group-hover:gap-3 transition-all">
              Play Feature <span>→</span>
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

function SecondaryVideoCard({ video, index }: { video: VideoMeta; index: number }) {
  const [hovered, setHovered] = useState(false)
  const href = `https://www.youtube.com/watch?v=${video.id}`

  if (!video.loaded) return <VideoSkeleton />

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col sm:flex-row gap-6 items-start py-8 border-b border-border transition-colors hover:bg-muted/30 px-2 -mx-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative flex-shrink-0 overflow-hidden border border-border w-full sm:w-[220px]"
        style={{ aspectRatio: "16/9", background: "var(--muted)" }}
      >
        <img
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          onError={(e) => {
            const el = e.target as HTMLImageElement
            el.src = `https://img.youtube.com/vi/${video.id}/default.jpg`
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center transition-all bg-black/5 group-hover:bg-black/10">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-background shadow-md">
            <Play className="w-4 h-4 ml-0.5 text-foreground fill-foreground" />
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col h-full justify-center">
        <div className="mb-3">
          <span className="text-[9px] tracking-widest uppercase font-bold text-muted-foreground font-sans">
            {video.tag}
          </span>
        </div>
        <h3
          className="leading-snug mb-3 font-bold"
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "18px",
            color: "var(--foreground)",
          }}
        >
          {video.title}
        </h3>
        <div className="text-[10px] uppercase font-bold tracking-widest font-sans text-muted-foreground mt-1">
          {video.author} <span className="mx-1 font-normal text-border">|</span> {video.date}
        </div>
      </div>

      <div className="hidden sm:block flex-shrink-0 text-3xl font-bold font-serif opacity-30 pr-2 mt-2 text-border">
        {(index + 2).toString().padStart(2, "0")}
      </div>
    </a>
  )
}

export function TopVideosSection() {
  const [videos, setVideos] = useState<VideoMeta[]>(
    YOUTUBE_IDS.map(({ id, tag, date }) => ({
      id, tag, date,
      title: "", author: "", thumbnail: "",
      loaded: false, error: false,
    }))
  )

  useEffect(() => {
    YOUTUBE_IDS.forEach(async ({ id }, i) => {
      try {
        const meta = await fetchYouTubeMeta(id)
        setVideos(prev => prev.map((v, vi) =>
          vi === i ? { ...v, ...meta, loaded: true } : v
        ))
      } catch {
        setVideos(prev => prev.map((v, vi) =>
          vi === i ? { ...v, loaded: true, error: true, title: "UpForge Intelligence Briefing" } : v
        ))
      }
    })
  }, [])

  const featured = videos[0]
  const rest = videos.slice(1)

  return (
    <section className="bg-background border-t-4 border-foreground">
      <div className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 flex items-baseline justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <h2
              className="text-3xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Intelligence Briefings
            </h2>
            <span className="text-[11px] tracking-widest uppercase text-muted-foreground font-sans font-bold hidden sm:inline border-l border-border pl-4">
              Visual Analysis & Reports
            </span>
          </div>
          <a
             href="https://www.youtube.com/@upforge"
             target="_blank"
             rel="noopener noreferrer"
             className="text-[11px] font-bold tracking-widest uppercase text-foreground transition-all hover:text-muted-foreground border border-foreground px-4 py-2 hover:bg-muted font-sans"
          >
             View All Reports <span className="ml-1">→</span>
          </a>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16">
        <div className="mb-12">
          <FeaturedVideoCard video={featured} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-2">
          {rest.map((video, i) => (
            <SecondaryVideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
