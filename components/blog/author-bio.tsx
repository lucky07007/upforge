import Link from "next/link"
import Image from "next/image"
import { ShieldCheck, ArrowUpRight } from "lucide-react"

interface AuthorBioProps {
  authorName?: string
  authorRole?: string
  publishDate?: string
}

export function AuthorBio({
  authorName = "Lucky Tiwari",
  authorRole = "Founder & Editor-in-Chief",
  publishDate,
}: AuthorBioProps) {
  return (
    <div className="my-8 p-6 border-2 border-foreground/15 rounded-xl bg-muted/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#C59A2E] shrink-0 bg-slate-900">
          <Image
            src="https://images.upforge.org/avatars/lucky-tiwari.jpg"
            alt={authorName}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback if image unavailable
              const target = e.target as HTMLElement
              target.style.display = "none"
            }}
          />
          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white bg-slate-800">
            LT
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-base font-bold text-foreground">{authorName}</h4>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C59A2E]/15 text-[#8A6A10] border border-[#C59A2E]/30">
              <ShieldCheck className="w-3 h-3 text-[#C59A2E]" /> Verified Author
            </span>
          </div>
          <p className="text-xs font-mono text-muted-foreground mt-0.5">{authorRole}</p>
          {publishDate && (
            <p className="text-[11px] text-muted-foreground/80 font-sans mt-1">
              Published on {publishDate} • Reviewed under UpForge Editorial Standards
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="/about"
          className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-foreground hover:text-[#C59A2E] transition-colors"
        >
          Editorial Bio <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
        <span className="text-muted-foreground/40">|</span>
        <Link
          href="/editorial-standards"
          className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          Standards
        </Link>
      </div>
    </div>
  )
}
