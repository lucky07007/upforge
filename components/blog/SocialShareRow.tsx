"use client" 
import { useState } from "react"
import { Share2, Copy, Check, MessageSquare } from "lucide-react"
import { GooglePreferredSourceBadge } from "@/components/seo/google-preferred-source"

interface SocialShareRowProps {
  title: string
  slug: string
  className?: string
}

export function SocialShareRow({ title, slug, className = "" }: SocialShareRowProps) {
  const [copied, setCopied] = useState(false)
  const fullUrl = `https://upforge.org/blog/${slug}`

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl)
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = fullUrl
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const shareLinks = [
    {
      name: "X (Twitter)",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.64a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
        </svg>
      ),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "WhatsApp",
      icon: <MessageSquare className="w-3.5 h-3.5" />,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + fullUrl)}`,
    },
  ]

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mr-1">
        <Share2 className="w-3 h-3 text-amber-500" /> Share
      </span>

      {shareLinks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${item.name}`}
          className="w-8 h-8 rounded-xl bg-card border border-border/70 hover:border-amber-500/50 hover:bg-amber-500/10 text-muted-foreground hover:text-amber-500 flex items-center justify-center transition-all shadow-xs"
        >
          {item.icon}
        </a>
      ))}

      <button
        onClick={handleCopy}
        title="Copy Link"
        className="h-8 px-3 rounded-xl bg-card border border-border/70 hover:border-amber-500/50 hover:bg-amber-500/10 text-muted-foreground hover:text-amber-500 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-500">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>

      {/* Divider before the Google badge so it reads as a distinct action, not a 7th share icon */}
      <span className="w-px h-5 bg-border/70 mx-1" aria-hidden="true" />

      <GooglePreferredSourceBadge
        variant="icon-only"
        iconSize={14}
        className="w-8 h-8 rounded-xl bg-card border border-border/70 hover:border-blue-400/50 hover:bg-blue-400/10 text-muted-foreground flex items-center justify-center transition-all shadow-xs"
      />
    </div>
  )
}
