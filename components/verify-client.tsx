"use client"
/**
 * components/verify-client.tsx — UpForge UFRN Verification v5
 * - Full dark / light theme via CSS variables (no hardcoded colors)
 * - Share URL is slug-based: /startup/{slug}
 * - Smart search: numeric ≤5 digits → suffix match across ALL country codes
 * - EB Garamond + Space Mono editorial typography
 * - Gold #C59A2E brand accent stays fixed (reads on both modes)
 */

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  CheckCircle2, Share2, RotateCcw,
  ShieldCheck, MapPin, Calendar, Layers, Globe, ArrowRight, XCircle, Building2
} from "lucide-react"

interface StartupRecord {
  id: string; name: string; slug: string; ufrn: string
  description?: string | null; founders?: string | null
  founded_year?: number | null; category?: string | null
  city?: string | null; country_code?: string | null; country_name?: string | null
  status: string; logo_url?: string | null; website?: string | null
  funding_stage?: string | null; funding_amount?: number | null
  created_at?: string; updated_at?: string
}

type Phase = "idle" | "searching" | "found" | "notfound" | "error"
interface Props { totalCount: number; isOrg: boolean }

const CITIES = [
  { px: 17.8, py: 34.5, label: "New York" },
  { px: 14.2, py: 33.0, label: "Chicago" },
  { px: 11.0, py: 38.0, label: "Los Angeles" },
  { px: 13.8, py: 48.5, label: "Mexico City" },
  { px: 16.0, py: 60.0, label: "São Paulo" },
  { px: 21.8, py: 56.2, label: "Lagos" },
  { px: 23.2, py: 45.2, label: "Cairo" },
  { px: 27.0, py: 44.5, label: "Dubai" },
  { px: 48.5, py: 23.5, label: "London" },
  { px: 50.5, py: 24.5, label: "Paris" },
  { px: 55.2, py: 20.8, label: "Berlin" },
  { px: 57.2, py: 30.5, label: "Moscow" },
  { px: 62.0, py: 54.8, label: "Nairobi" },
  { px: 67.5, py: 32.5, label: "Delhi" },
  { px: 67.0, py: 37.2, label: "Mumbai" },
  { px: 69.5, py: 41.5, label: "Bangalore" },
  { px: 73.2, py: 28.0, label: "Beijing" },
  { px: 76.5, py: 32.0, label: "Shanghai" },
  { px: 79.8, py: 28.0, label: "Tokyo" },
  { px: 81.2, py: 26.5, label: "Seoul" },
  { px: 78.5, py: 37.0, label: "Bangkok" },
  { px: 79.5, py: 40.5, label: "Singapore" },
  { px: 82.0, py: 72.2, label: "Sydney" },
  { px: 42.8, py: 26.2, label: "Stockholm" },
  { px: 55.0, py: 30.8, label: "Istanbul" },
  { px: 64.8, py: 34.5, label: "Karachi" },
  { px: 60.8, py: 62.0, label: "Johannesburg" },
  { px: 30.8, py: 30.5, label: "Casablanca" },
]

const SIMPLEMAPS_URL =
  "https://simplemaps.com/static/demos/resources/svg-library/svgs/world.svg"

export function VerifyClient({ totalCount, isOrg }: Props) {
  const [input, setInput]     = useState("")
  const [phase, setPhase]     = useState<Phase>("idle")
  const [result, setResult]   = useState<StartupRecord | null>(null)
  const [copied, setCopied]   = useState(false)
  const [beamPct, setBeamPct] = useState(-15)
  const [scanLog, setScanLog] = useState<string[]>([])
  const inputRef  = useRef<HTMLInputElement>(null)
  const rafRef    = useRef<number>(0)
  const logTimers = useRef<ReturnType<typeof setTimeout>[]>([])
  const startTs   = useRef<number>(0)

  /* ── Radar beam rAF loop ── */
  useEffect(() => {
    if (phase !== "searching") {
      cancelAnimationFrame(rafRef.current)
      setBeamPct(-15)
      return
    }
    startTs.current = 0
    const SWEEP = 2400
    const step = (ts: number) => {
      if (!startTs.current) startTs.current = ts
      const t = ((ts - startTs.current) % SWEEP) / SWEEP
      setBeamPct(-15 + t * 130)
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [phase])

  /* ── Scan log messages ── */
  const startScanLog = (ufrn: string) => {
    const msgs = [
      ["QUERY",  ufrn],
      ["NODE",   "Connecting to registry cluster…"],
      ["AUTH",   "Secure channel established"],
      ["SCAN",   "Cross-referencing global index…"],
      ["INDEX",  "Checking editorial audit ledger…"],
      ["VERIFY", "Validating UFRN signature…"],
    ]
    setScanLog([])
    msgs.forEach(([tag, msg], i) => {
      const t = setTimeout(
        () => setScanLog(p => [...p, `${tag}||${msg}`]),
        i * 420
      )
      logTimers.current.push(t)
    })
  }
  const clearScanLog = () => {
    logTimers.current.forEach(clearTimeout)
    logTimers.current = []
    setScanLog([])
  }

  function parseInput(raw: string): { mode: "exact"; ufrn: string } | { mode: "suffix"; digits: string } {
    const s = raw.trim().toUpperCase().replace(/\s/g, "")
    if (/^\d{1,5}$/.test(s)) return { mode: "suffix", digits: s.padStart(5, "0") }
    if (/^UF-\d{4}-[A-Z]{2,4}-\d+$/.test(s)) return { mode: "exact", ufrn: s }
    const stripped = s.startsWith("UF-") ? s.slice(3) : s
    if (/^\d{4}-[A-Z]{2,4}-\d+$/.test(stripped)) return { mode: "exact", ufrn: `UF-${stripped}` }
    if (/^[A-Z]{2,4}-\d+$/.test(stripped)) return { mode: "exact", ufrn: `UF-2026-${stripped}` }
    if (/^\d{6,9}$/.test(s)) return { mode: "suffix", digits: s.padStart(5, "0").slice(-5) }
    return { mode: "exact", ufrn: s.startsWith("UF-") ? s : `UF-${s}` }
  }

  function displayLabel(raw: string): string {
    const q = parseInput(raw)
    if (q.mode === "suffix") return `#${q.digits} (global)`
    return q.ufrn
  }

  const handleVerify = useCallback(async () => {
    const raw = input.trim()
    if (!raw) return
    const query = parseInput(raw)
    setPhase("searching"); setResult(null)
    startScanLog(displayLabel(raw))
    try {
      let data: StartupRecord | null = null

      const searchParams = new URLSearchParams()
      if (query.mode === "exact") {
        searchParams.set("ufrn", query.ufrn)
      } else {
        searchParams.set("digits", query.digits)
      }

      const res = await fetch(`/api/verify?${searchParams.toString()}`)
      if (!res.ok) {
        throw new Error("Verification failed")
      }
      const json = await res.json()
      data = json.data as StartupRecord | null

      await new Promise(r => setTimeout(r, 2600))
      clearScanLog()
      if (!data) setPhase("notfound")
      else { setResult(data as StartupRecord); setPhase("found") }
    } catch { clearScanLog(); setPhase("error") }
  }, [input])

  const handleReset = () => {
    clearScanLog()
    setPhase("idle"); setResult(null); setInput("")
    setTimeout(() => inputRef.current?.focus(), 80)
  }

  /* ── Slug-based share URL ── */
  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(`https://upforge.org/startup/${result.slug}`)
    setCopied(true); setTimeout(() => setCopied(false), 2500)
  }

  const isScanning = phase === "searching"

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Space+Mono:wght@400;700&display=swap');

        /* ── Theme tokens ── */
        .vf {
          --vf-bg:         var(--background, #FDFCF8);
          --vf-bg2:        var(--muted, #F5F2EC);
          --vf-bg3:        var(--muted, #ECEAE3);
          --vf-fg:         var(--foreground, #1C1C1C);
          --vf-fg2:        var(--muted-foreground, #8A8478);
          --vf-fg3:        var(--muted-foreground, #AAA);
          --vf-border:     var(--border, #E2DDD5);
          --vf-border2:    var(--border, #DDD8CE);
          --vf-gold:       #C59A2E;
          --vf-gold-dark:  #B8872A;
          --vf-gold-light: #E8C86A;
          --vf-invert-bg:  var(--foreground, #1C1C1C);
          --vf-invert-fg:  var(--background, #FDFCF8);

          font-family: system-ui, -apple-system, sans-serif;
          color: var(--vf-fg);
          background: var(--vf-bg);
          transition: background 0.3s, color 0.3s;
        }

        /* Search bar */
        .vf-search {
          display: flex; max-width: 640px; margin: 0 auto;
          border: 1.5px solid var(--vf-border);
          border-radius: 9999px;
          background: var(--vf-bg);
          overflow: hidden;
          transition: box-shadow .22s, transform .22s, border-color .22s;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .vf-search:focus-within {
          transform: translateY(-2px);
          border-color: var(--vf-gold);
          box-shadow: 0 8px 24px rgba(197,154,46,0.15);
        }
        .vf-input {
          flex: 1; padding: 17px 24px; border: none; outline: none;
          font-family: 'Space Mono', monospace; font-size: .88rem;
          background: transparent; color: var(--vf-fg); letter-spacing: .04em;
        }
        .vf-input::placeholder { color: var(--vf-fg3); }
        .vf-btn {
          background: var(--vf-invert-bg); color: var(--vf-invert-fg);
          border: none; padding: 0 28px; border-radius: 9999px; margin: 4px;
          font-size: 9px; font-weight: 700; letter-spacing: .22em;
          text-transform: uppercase; cursor: pointer; white-space: nowrap;
          transition: background .18s, color .18s;
        }
        .vf-btn:hover:not(:disabled) { background: var(--vf-gold); color: #000; }
        .vf-btn:disabled { opacity: .35; cursor: not-allowed; }

        /* Map */
        .vf-map-wrap {
          position: relative; width: 100%; max-width: 1240px; margin: 0 auto; overflow: hidden;
          background: var(--vf-bg3);
          border: 1px solid var(--vf-border);
          border-radius: 1.5rem;
          line-height: 0; user-select: none;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .vf-map-img {
          display: block; width: 100%; height: auto;
          opacity: .75;
          filter: saturate(.25) brightness(.96) contrast(1.05);
          transition: opacity .5s, filter .5s;
        }
        .vf-map-img.scanning {
          opacity: .5;
          filter: saturate(.12) brightness(.82) contrast(1.1);
        }
        :is(.dark, [data-theme="dark"]) .vf-map-img {
          filter: saturate(.18) brightness(1.15) contrast(1.08);
        }
        :is(.dark, [data-theme="dark"]) .vf-map-img.scanning {
          filter: saturate(.08) brightness(.9) contrast(1.15);
        }

        .vf-overlay {
          position: absolute; inset: 0; width: 100%; height: 100%;
          pointer-events: none; overflow: hidden;
        }

        /* Terminal */
        .vf-terminal {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: min(460px, 88%);
          background: rgba(6,6,8,.94);
          border: 1px solid rgba(255,255,255,.07);
          padding: 20px 24px 22px;
          pointer-events: none;
          animation: termIn .22s ease;
        }
        @keyframes termIn {
          from { opacity: 0; transform: translate(-50%, -48%); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
        .vf-term-dots { display: flex; gap: 6px; margin-bottom: 14px; }
        .vf-term-dot  { width: 10px; height: 10px; border-radius: 50%; }
        .vf-term-title {
          font-family: 'Space Mono', monospace; font-size: 8px; font-weight: 700;
          letter-spacing: .24em; text-transform: uppercase;
          color: rgba(255,255,255,.2); margin-bottom: 14px;
        }
        .vf-log-row {
          display: flex; gap: 12px; font-family: 'Space Mono', monospace;
          font-size: 11px; line-height: 2.1; opacity: 0;
          animation: rowIn .16s ease forwards;
        }
        @keyframes rowIn {
          from { opacity: 0; transform: translateX(-4px); }
          to   { opacity: 1; transform: none; }
        }
        .vf-log-row.done   .vf-log-tag  { color: #22C55E; }
        .vf-log-row.done   .vf-log-text { color: rgba(255,255,255,.38); }
        .vf-log-row.active .vf-log-tag  { color: #5BC4FF; }
        .vf-log-row.active .vf-log-text { color: rgba(255,255,255,.82); }
        .vf-log-tag  { min-width: 52px; font-weight: 700; font-size: 9.5px; letter-spacing: .06em; }

        .vf-cursor {
          display: inline-block; width: 6px; height: 11px;
          background: var(--vf-gold); animation: blink .85s step-end infinite;
          vertical-align: middle; margin-left: 3px;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* Progress bar */
        .vf-progress { height: 2px; background: rgba(255,255,255,.07); margin-top: 18px; overflow: hidden; }
        .vf-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #B8872A, #E8C86A, #B8872A);
          background-size: 200% 100%;
          animation: progressSweep 2.6s linear forwards;
        }
        @keyframes progressSweep {
          from { width: 4%; background-position: 100%; }
          to   { width: 100%; background-position: 0%; }
        }

        /* Map legend */
        .vf-legend {
          position: absolute; bottom: 0; left: 0; right: 0;
          display: flex; justify-content: space-between; padding: 6px 16px;
          background: rgba(0,0,0,.52);
          font-family: 'Space Mono', monospace; font-size: 7px;
          font-weight: 700; letter-spacing: .2em; text-transform: uppercase;
          color: rgba(255,255,255,.28); pointer-events: none;
        }
        .vf-legend .hi { color: rgba(255,255,255,.5); }

        /* Certificate */
        .vf-cert {
          max-width: 780px; margin: 44px auto 64px;
          background: var(--vf-bg);
          border: 1px solid var(--vf-border2);
          animation: certIn .55s cubic-bezier(.16,1,.3,1);
        }
        @keyframes certIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }
        .vf-cert-head {
          background: var(--vf-invert-bg); color: var(--vf-invert-fg);
          padding: 28px 40px;
          display: flex; justify-content: space-between;
          align-items: center; gap: 20px; flex-wrap: wrap;
        }
        .vf-cert-body { padding: 40px 44px; }
        .vf-fg {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 28px; border-top: 1px solid var(--vf-border);
          padding-top: 28px; margin-top: 28px;
        }
        @media(max-width:640px) {
          .vf-fg { grid-template-columns: 1fr 1fr; }
          .vf-cert-body, .vf-cert-head { padding: 22px 18px; }
        }
        @media(max-width:380px) { .vf-fg { grid-template-columns: 1fr; } }

        /* Actions */
        .vf-action {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; font-size: 9px; font-weight: 700;
          letter-spacing: .22em; text-transform: uppercase;
          cursor: pointer; transition: background .18s, color .18s;
          text-decoration: none;
        }
        .vf-action-primary {
          background: var(--vf-invert-bg); color: var(--vf-invert-fg); border: none;
        }
        .vf-action-primary:hover { background: var(--vf-gold-dark); color: #fff; }
        .vf-action-outline {
          background: transparent; color: var(--vf-fg);
          border: 1.5px solid var(--vf-fg);
        }
        .vf-action-outline:hover { background: var(--vf-bg2); }

        /* Badges */
        .vf-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 13px;
          background: var(--vf-bg2); border: 1px solid var(--vf-border);
          font-size: 9px; font-weight: 700; letter-spacing: .18em;
          text-transform: uppercase; color: var(--vf-fg3);
          font-family: 'Space Mono', monospace;
        }

        /* Gold hint pill */
        .vf-hint {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 10px;
          background: rgba(197,154,46,.08);
          border: 1px solid rgba(197,154,46,.22);
          border-radius: 2px;
          font-family: 'Space Mono', monospace; font-size: 8px;
          color: var(--vf-gold-dark); letter-spacing: .06em;
        }

        /* Category badge on cert */
        .vf-cat-badge {
          display: inline-block; padding: 3px 9px;
          background: rgba(197,154,46,.12);
          color: var(--vf-gold-dark);
          font-size: 8px; font-weight: 700; letter-spacing: .2em;
          text-transform: uppercase;
          border: 1px solid rgba(197,154,46,.28);
          margin-bottom: 9px;
        }

        /* Not-found box */
        .vf-notfound {
          max-width: 500px; margin: 44px auto 64px;
          text-align: center; padding: 52px 28px;
          border: 1.5px dashed var(--vf-border2);
          background: var(--vf-bg2);
        }

        /* Steps / how it works */
        .vf-step {
          border-left: 2px solid var(--vf-border);
          padding: 4px 0 4px 20px;
          transition: border-color .2s; text-align: left;
        }
        .vf-step:hover { border-color: var(--vf-gold); }

        /* Dividers */
        .vf-divider { border: none; border-top: 1px solid var(--vf-border); }

        @keyframes shake {
          0%,100% { transform: none; }
          25%      { transform: translateX(-5px); }
          75%      { transform: translateX(5px); }
        }
        .vf-shake { animation: shake .32s ease; }
      `}</style>

      <div className="vf">

        {/* ═══ MASTHEAD ══════════════════════════════════════════════════════ */}
        <header style={{ textAlign:"center", padding:"28px 24px 40px" }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-[#C59A2E]/40 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59A2E]" />
            <span className="text-[10px] font-mono font-bold text-[#C59A2E] uppercase tracking-widest">
              INDEPENDENT STARTUP INTELLIGENCE
            </span>
          </div>

          <h1 style={{
            fontFamily:"'EB Garamond',Georgia,serif",
            fontSize:"clamp(2.4rem,6vw,4.2rem)",
            color:"var(--vf-fg)",
            lineHeight:1.06, letterSpacing:"-.025em", marginBottom:12
          }}>
            UFRN Registry Lookup
          </h1>
          <p style={{ color:"var(--vf-fg2)", fontSize:".93rem", maxWidth:460, margin:"0 auto 6px", lineHeight:1.85 }}>
            Enter any <strong style={{ fontWeight:600, color:"var(--vf-fg)" }}>UpForge Registry Number</strong> to instantly verify a startup's operational status, founders, and official record.
          </p>

          {/* Gold hint row */}
          <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap", margin:"10px 0 28px" }}>
            <span className="vf-hint">✦ Type just <strong>13</strong> → matches any country</span>
            <span className="vf-hint">Full: UF-2026-IND-00013</span>
          </div>

          <div className="vf-search">
            <input
              ref={inputRef}
              className="vf-input"
              placeholder="13  ·  00013  ·  UF-2026-IND-00013"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !isScanning && handleVerify()}
              disabled={isScanning}
              aria-label="Enter UFRN to verify"
            />
            <button className="vf-btn" onClick={handleVerify} disabled={!input.trim() || isScanning}>
              {isScanning ? "Scanning…" : "Verify →"}
            </button>
          </div>

          <div style={{ marginTop:18, display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap" }}>
            <span className="vf-badge"><CheckCircle2 size={9}/> {totalCount.toLocaleString()}+ verified</span>
            <span className="vf-badge">Free · No login</span>
            <span className="vf-badge">Global · Real-time</span>
          </div>
        </header>

        {/* ═══ MAP ══════════════════════════════════════════════════════════ */}
        <div className="vf-map-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`vf-map-img${isScanning ? " scanning" : ""}`}
            src={SIMPLEMAPS_URL}
            alt="World map — UpForge verified startup locations"
            draggable={false}
          />

          <svg
            className="vf-overlay"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="vfBeam" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%"   stopColor="#C59A2E" stopOpacity="0"/>
                <stop offset="30%"  stopColor="#C59A2E" stopOpacity="0.04"/>
                <stop offset="48%"  stopColor="#E8C86A" stopOpacity="0.72"/>
                <stop offset="52%"  stopColor="#E8C86A" stopOpacity="0.72"/>
                <stop offset="70%"  stopColor="#C59A2E" stopOpacity="0.04"/>
                <stop offset="100%" stopColor="#C59A2E" stopOpacity="0"/>
              </linearGradient>
              <clipPath id="vfClip">
                <rect x="0" y="0" width="1000" height="500"/>
              </clipPath>
            </defs>

            {isScanning && (() => {
              const bx = (beamPct / 100) * 1000
              return (
                <g clipPath="url(#vfClip)">
                  <rect x={bx-130} y={0} width={260} height={500} fill="url(#vfBeam)"/>
                  <line x1={bx} y1={0} x2={bx} y2={500} stroke="#F0D47A" strokeWidth={1.8} opacity={.95}/>
                  <line x1={bx-8} y1={0} x2={bx-8} y2={500} stroke="#C59A2E" strokeWidth={.5} opacity={.22}/>
                  <line x1={bx+8} y1={0} x2={bx+8} y2={500} stroke="#C59A2E" strokeWidth={.5} opacity={.22}/>
                </g>
              )
            })()}

            {CITIES.map((c, i) => {
              const cx = (c.px / 100) * 1000
              const cy = (c.py / 100) * 500
              const bx = (beamPct / 100) * 1000
              const dist = Math.abs(cx - bx)
              const isLit = isScanning && dist < 90
              const intensity = isLit ? Math.max(0, 1 - dist / 90) : 0

              return (
                <g key={i}>
                  {isLit && (
                    <circle cx={cx} cy={cy}
                      r={7 + intensity * 18}
                      fill="none" stroke="#C59A2E" strokeWidth={.9}
                      opacity={intensity * .5}
                      style={{ transition:"all .07s linear" }}
                    />
                  )}
                  {isLit && intensity > 0.45 && (
                    <circle cx={cx} cy={cy}
                      r={4 + intensity * 8}
                      fill="none" stroke="#E8C86A" strokeWidth={.6}
                      opacity={intensity * .38}
                      style={{ transition:"all .06s linear" }}
                    />
                  )}
                  <circle cx={cx} cy={cy}
                    r={isLit ? 3.8 : 2.2}
                    fill={isLit ? "#F0D47A" : "var(--vf-fg3)"}
                    opacity={isLit ? 1 : .48}
                    style={{ transition:"r .1s linear,fill .1s linear,opacity .1s linear" }}
                  />
                </g>
              )
            })}
          </svg>

          {isScanning && (
            <div className="vf-terminal">
              <div className="vf-term-dots">
                <span className="vf-term-dot" style={{ background:"#FF5F57" }}/>
                <span className="vf-term-dot" style={{ background:"#FEBC2E" }}/>
                <span className="vf-term-dot" style={{ background:"#28C840" }}/>
              </div>
              <div className="vf-term-title">UpForge Registry — Global UFRN Lookup Engine</div>

              {scanLog.map((raw, i) => {
                const [tag, msg] = raw.split("||")
                const isLast = i === scanLog.length - 1
                return (
                  <div key={i} className={`vf-log-row ${isLast ? "active" : "done"}`}>
                    <span className="vf-log-tag">{tag}</span>
                    <span className="vf-log-text">
                      {msg}
                      {isLast && <span className="vf-cursor"/>}
                    </span>
                  </div>
                )
              })}

              <div className="vf-progress">
                <div className="vf-progress-bar"/>
              </div>
            </div>
          )}

          <div className="vf-legend">
            <span>Global Node Audit</span>
            <span className="hi">{totalCount.toLocaleString()}+ Verified</span>
            <span>Real-time Index</span>
          </div>
        </div>

        {/* ═══ RESULT AREA ═════════════════════════════════════════════════ */}
        <div style={{ padding:"0 24px" }}>

          {/* ── FOUND ── */}
          {phase === "found" && result && (
            <div className="vf-cert">
              <div className="vf-cert-head">
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{
                    background:"#22C55E", borderRadius:"50%", padding:10,
                    display:"flex", flexShrink:0,
                    boxShadow:"0 0 0 5px rgba(34,197,94,.15)"
                  }}>
                    <CheckCircle2 size={18} color="#fff"/>
                  </div>
                  <div>
                    <div style={{
                      fontSize:8, fontWeight:700, letterSpacing:"0.26em",
                      textTransform:"uppercase", opacity:.4, marginBottom:4,
                      fontFamily:"'Space Mono',monospace"
                    }}>Identity Confirmed</div>
                    <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"1.5rem", letterSpacing:"-.01em" }}>
                      {result.name}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign:"right", borderLeft:"1px solid rgba(255,255,255,.1)", paddingLeft:22 }}>
                  <div style={{
                    fontSize:8, fontWeight:700, letterSpacing:"0.2em",
                    textTransform:"uppercase", opacity:.36, marginBottom:5,
                    fontFamily:"'Space Mono',monospace"
                  }}>UFRN</div>
                  <div style={{
                    fontFamily:"'Space Mono',monospace", fontSize:".9rem",
                    color:"#D4AF5A", fontWeight:700, letterSpacing:".05em"
                  }}>{result.ufrn}</div>
                </div>
              </div>

              <div className="vf-cert-body">
                <div style={{ display:"flex", gap:20, alignItems:"flex-start", flexWrap:"wrap" }}>
                  <div style={{
                    width:74, height:74,
                    background:"var(--vf-bg2)",
                    border:"1px solid var(--vf-border)",
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0
                  }}>
                    {result.logo_url
                      ? <Image src={result.logo_url} width={74} height={74} className="w-full h-full object-cover" alt={result.name} loading="lazy" />
                      : <span style={{ fontFamily:"'EB Garamond',serif", fontSize:"2rem", color:"var(--vf-fg3)" }}>
                          {result.name[0]}
                        </span>
                    }
                  </div>
                  <div style={{ flex:1 }}>
                    <span className="vf-cat-badge">{result.category}</span>
                    <h2 style={{
                      fontFamily:"'EB Garamond',Georgia,serif", fontSize:"1.55rem",
                      color:"var(--vf-fg)", marginBottom:4, letterSpacing:"-.01em"
                    }}>{result.name}</h2>
                    <p style={{ fontSize:".84rem", color:"var(--vf-fg2)" }}>{result.founders}</p>
                    {result.description && (
                      <p style={{ marginTop:9, fontSize:".82rem", color:"var(--vf-fg2)", lineHeight:1.78, maxWidth:420 }}>
                        {result.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="vf-fg">
                  <FField icon={ShieldCheck} label="Audit Status"  value="Editorial Board Verified"/>
                  <FField icon={MapPin}      label="HQ"            value={`${result.city || "Global"}, ${result.country_code}`}/>
                  <FField icon={Layers}      label="Stage"         value={result.funding_stage || "Private"}/>
                  <FField icon={Calendar}    label="Founded"       value={result.founded_year?.toString() || "2026"}/>
                  <FField icon={RotateCcw}   label="Last Updated"  value={new Date(result.updated_at || "").toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}/>
                  <FField icon={Globe}       label="Ledger ID"     value={`#${result.id.slice(0,8).toUpperCase()}`}/>
                </div>

                <div style={{ marginTop:36, display:"flex", flexWrap:"wrap", alignItems:"center", gap:10 }}>
                  {/* Full dossier → slug route */}
                  <Link href={`/startup/${result.slug}`} className="vf-action vf-action-primary">
                    Full Dossier <ArrowRight size={11}/>
                  </Link>
                  {/* Share → copies slug-based URL */}
                  <button onClick={handleCopy} className="vf-action vf-action-outline">
                    <Share2 size={11}/> {copied ? "Copied!" : "Share Profile"}
                  </button>
                  <button
                    onClick={handleReset}
                    style={{
                      marginLeft:"auto", background:"none", border:"none",
                      fontSize:9, fontWeight:700, letterSpacing:"0.18em",
                      textTransform:"uppercase", color:"var(--vf-fg3)",
                      cursor:"pointer", transition:"color .18s"
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--vf-fg)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--vf-fg3)")}
                  >
                    New Search
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── NOT FOUND ── */}
          {phase === "notfound" && (
            <div className="vf-shake vf-notfound">
              <div style={{ color:"var(--vf-fg3)", display:"flex", justifyContent:"center", marginBottom:16 }}>
                <XCircle size={38} strokeWidth={1.2}/>
              </div>
              <h3 style={{
                fontFamily:"'EB Garamond',Georgia,serif", fontSize:"1.6rem",
                color:"var(--vf-fg)", marginBottom:10
              }}>Record Not Located</h3>
              <p style={{ color:"var(--vf-fg2)", fontSize:".87rem", lineHeight:1.8, marginBottom:28 }}>
                <code style={{
                  fontFamily:"'Space Mono',monospace", fontWeight:700,
                  color:"var(--vf-fg)", fontSize:".76rem"
                }}>{displayLabel(input)}</code>
                {" "}does not match any approved entity in our global index.
              </p>
              <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
                <button onClick={handleReset} className="vf-action vf-action-outline">Try Again</button>
                <Link href="/submit" className="vf-action vf-action-primary">Submit Entity</Link>
              </div>
            </div>
          )}

          {/* ── ERROR ── */}
          {phase === "error" && (
            <div style={{ textAlign:"center", padding:"48px 24px 64px" }}>
              <p style={{ color:"var(--vf-fg2)", marginBottom:18, fontSize:".87rem" }}>
                Something went wrong. Please try again.
              </p>
              <button onClick={handleReset} className="vf-action vf-action-outline">Retry</button>
            </div>
          )}
        </div>

        {/* ═══ HOW IT WORKS ════════════════════════════════════════════════ */}
        <section style={{ padding:"72px 32px", borderTop:"1px solid var(--vf-border)", textAlign:"center" }}>
          <div style={{
            fontSize:9, fontWeight:700, letterSpacing:"0.26em",
            textTransform:"uppercase", color:"var(--vf-gold)", marginBottom:12,
            fontFamily:"'Space Mono',monospace"
          }}>
            System Architecture
          </div>
          <h2 style={{
            fontFamily:"'EB Garamond',Georgia,serif",
            fontSize:"clamp(1.7rem,3.8vw,2.6rem)",
            color:"var(--vf-fg)", marginBottom:48, letterSpacing:"-.02em"
          }}>
            How UFRN Verification Works
          </h2>
          <div style={{
            display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",
            maxWidth:960, margin:"0 auto", gap:36
          }}>
            <VStep num="01" title="Data Ingestion"  desc="Entities submit operational data through secure encrypted gateways."/>
            <VStep num="02" title="Manual Audit"    desc="Our editorial board performs manual due diligence on founders and status."/>
            <VStep num="03" title="UFRN Assignment" desc="Upon approval, a unique sequential Registry Number is permanently issued."/>
            <VStep num="04" title="Public Ledger"   desc="The verified record enters the global searchable index for instant lookup."/>
          </div>
        </section>

        {/* ═══ TRUST ═══════════════════════════════════════════════════════ */}
        <section style={{
          padding:"56px 32px",
          borderTop:"1px solid var(--vf-border)",
          background:"var(--vf-bg2)",
          textAlign:"center"
        }}>
          <p style={{
            fontFamily:"'EB Garamond',Georgia,serif", fontSize:"1.1rem",
            color:"var(--vf-fg2)", maxWidth:540, margin:"0 auto 26px",
            lineHeight:1.9, fontStyle:"italic"
          }}>
            "UpForge UFRN is the only independent startup verification standard with real editorial oversight — not just self-reported data."
          </p>
          <div style={{ display:"flex", justifyContent:"center", gap:10, flexWrap:"wrap" }}>
            <span className="vf-badge"><Building2 size={9}/> Editorial Board Reviewed</span>
            <span className="vf-badge"><ShieldCheck size={9}/> Founder-Verified</span>
            <span className="vf-badge"><Globe size={9}/> Global Coverage</span>
          </div>
        </section>

      </div>
    </>
  )
}

/* ── Sub-components ── */

function FField({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:6 }}>
        <Icon size={10} color="#C59A2E"/>
        <span style={{
          fontSize:8, fontWeight:700, letterSpacing:"0.2em",
          textTransform:"uppercase", color:"var(--vf-fg3)",
          fontFamily:"'Space Mono',monospace"
        }}>{label}</span>
      </div>
      <div style={{ fontSize:".88rem", fontWeight:600, color:"var(--vf-fg)" }}>{value}</div>
    </div>
  )
}

function VStep({ num, title, desc }: { num:string; title:string; desc:string }) {
  return (
    <div className="vf-step">
      <div style={{
        fontFamily:"'EB Garamond',Georgia,serif",
        fontSize:"2.6rem", color:"var(--vf-border)", lineHeight:1, marginBottom:10
      }}>{num}</div>
      <h4 style={{
        fontSize:9, fontWeight:700, letterSpacing:"0.2em",
        textTransform:"uppercase", color:"var(--vf-fg)", marginBottom:8
      }}>{title}</h4>
      <p style={{ fontSize:".8rem", color:"var(--vf-fg2)", lineHeight:1.8 }}>{desc}</p>
    </div>
  )
}
