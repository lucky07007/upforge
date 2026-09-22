"use client"

// components/theme-toggle.tsx
// Drop this anywhere in your layout or verify page.
// Reads system preference on first load, then persists to localStorage.
// Writes data-theme="dark"|"light" to <html> — the CSS tokens in
// verify/page.tsx (or globals.css) handle the rest.

import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("upforge-theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initial = stored ? stored === "dark" : prefersDark
    setDark(initial)
    document.documentElement.setAttribute("data-theme", initial ? "dark" : "light")
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light")
    localStorage.setItem("upforge-theme", next ? "dark" : "light")
  }

  // Don't render until we know the theme (avoids flash)
  if (dark === null) return null

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        border: "1px solid var(--border, #e5e7eb)",
        backgroundColor: "var(--surface, #f9fafb)",
        color: "var(--text, #111827)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "15px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
        transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
        outline: "none",
      }}
    >
      {dark ? (
        // Sun icon
        <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15" aria-hidden="true">
          <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z" />
        </svg>
      ) : (
        // Moon icon
        <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
          <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  )
}
