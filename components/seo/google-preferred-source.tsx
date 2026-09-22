// components/seo/google-preferred-source.tsx
//
// Single source of truth for the "Add Us On Google" / Preferred Sources
// integration (the same feature you see as "Add Us On Google" on Forbes).
// Docs: https://developers.google.com/search/docs/appearance/preferred-sources
//
// Implementation choice: pure deeplink `<a>` tag — NOT the Google JS widget.
// - Zero JavaScript, zero extra network request, zero render-blocking cost.
// - Works identically everywhere it's dropped in (footer, share rows,
//   profile badges, infobox tables) with no per-page setup.
// - Server-renderable (no "use client" needed) so it costs nothing extra
//   even on pages that are otherwise fully static/ISR.
//
// Eligibility note: the button only *does* something once upforge.org is
// recognized as a domain-level source in Google's preferred-sources tool
// (check: google.com/preferences/source). Until then it's a harmless,
// inert link — safe to ship everywhere ahead of approval.

const SITE_DOMAIN = "upforge.org";

export const GOOGLE_PREFERRED_SOURCE_HREF = `https://www.google.com/preferences/source?q=${SITE_DOMAIN}`;

export function GoogleGIcon({
  size = 14,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  );
}

type BadgeVariant =
  | "pill"       // rounded-full chip — matches TrustScoreBadge / UFRN pill rows
  | "icon-only"  // bare circular icon button — matches SocialShareRow icons
  | "text-link"; // inline "Add Us On Google ↗" text link — matches footer trust strip

interface GooglePreferredSourceBadgeProps {
  variant?: BadgeVariant;
  className?: string;
  iconSize?: number;
}

export function GooglePreferredSourceBadge({
  variant = "pill",
  className = "",
  iconSize,
}: GooglePreferredSourceBadgeProps) {
  const commonProps = {
    href: GOOGLE_PREFERRED_SOURCE_HREF,
    target: "_blank" as const,
    rel: "noopener noreferrer",
    title: "Add UpForge as a preferred source on Google Search",
    "aria-label": "Add UpForge as a preferred source on Google Search",
  };

  if (variant === "icon-only") {
    return (
      <a
        {...commonProps}
        className={
          className ||
          "w-8 h-8 rounded-xl bg-card border border-border/70 hover:border-blue-400/50 hover:bg-blue-400/10 flex items-center justify-center transition-all shadow-xs"
        }
      >
        <GoogleGIcon size={iconSize ?? 14} />
      </a>
    );
  }

  if (variant === "text-link") {
    return (
      <a
        {...commonProps}
        className={className || "flex items-center gap-2 hover:text-[var(--accent-gold)] transition-colors"}
      >
        <GoogleGIcon size={iconSize ?? 13} />
        <span>Add Us On Google ↗</span>
      </a>
    );
  }

  // "pill" — default
  return (
    <a
      {...commonProps}
      className={
        className ||
        "inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-muted border border-border text-foreground hover:border-blue-400/50 hover:text-blue-500 transition-colors"
      }
    >
      <GoogleGIcon size={iconSize ?? 11} />
      Prefer us on Google
    </a>
  );
}
