// components/home/trust-bar.tsx
"use client"

export function PrestigeTrustBar() {
  const partners = [
    "IIM Ahmedabad", 
    "Elevation Capital", 
    "Blume Ventures", 
    "McKinsey & Co.",
    "Y Combinator Alumni"
  ]

  return (
    <div className="border-y border-border bg-muted/30">
      <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-muted-foreground font-sans whitespace-nowrap">
          Data Verified & Referenced By
        </span>
        
        <div className="flex items-center justify-center md:justify-end gap-x-12 gap-y-4 flex-wrap w-full opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map(partner => (
            <span 
              key={partner} 
              className="font-serif font-semibold text-sm md:text-base text-foreground"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
