// components/share-buttons.tsx
"use client"

import { Share2, Linkedin, Twitter, LinkIcon, Check } from "lucide-react"
import { useState } from "react"

export function ShareButtons({
  profileUrl,
  startupName,
  ufrn
}: {
  profileUrl: string
  startupName: string
  ufrn?: string | null
}) {
  const [copied, setCopied] = useState(false)

  const text = `Check out ${startupName}'s Official Registry Record on UpForge.`
  const url = profileUrl

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy", err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${startupName} — UpForge Registry`,
          text: text,
          url: url,
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing", err)
        }
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
      <button 
        onClick={handleShare}
        className="hover:bg-slate-100 transition-colors"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          backgroundColor: "#f8fafc",
          border: "1px solid #cbd5e1",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: 700,
          color: "#475569",
          cursor: "pointer",
        }}
      >
        <Share2 size={14} />
        Share
      </button>

      <a 
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:bg-sky-100 transition-colors"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          backgroundColor: "#f0f9ff",
          border: "1px solid #bae6fd",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: 700,
          color: "#0284c7",
          textDecoration: "none",
        }}
      >
        <Twitter size={14} />
        Post
      </a>

      <a 
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:bg-blue-100 transition-colors"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          backgroundColor: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: 700,
          color: "#2563eb",
          textDecoration: "none",
        }}
      >
        <Linkedin size={14} />
        LinkedIn
      </a>

      <button 
        onClick={handleCopy}
        className="hover:bg-slate-100 transition-colors"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          backgroundColor: "#f8fafc",
          border: "1px solid #cbd5e1",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: 700,
          color: "#475569",
          cursor: "pointer",
        }}
      >
        {copied ? <Check size={14} color="#16a34a" /> : <LinkIcon size={14} />}
        <span style={{ color: copied ? "#16a34a" : "inherit" }}>
          {copied ? "Copied!" : "Copy Link"}
        </span>
      </button>
    </div>
  )
}
