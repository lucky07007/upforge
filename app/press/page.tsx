import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

const BASE = "https://upforge.org"

export const metadata: Metadata = {
  title: "Press & Media Kit | UpForge",
  description: "Official UpForge press and media resources: company description, registry methodology, brand assets, and editorial contact paths.",
  alternates: { canonical: `${BASE}/press` },
  openGraph: {
    title: "UpForge Press & Media Kit",
    description: "Official brand, registry, and editorial information for journalists and partners.",
    url: `${BASE}/press`,
    siteName: "UpForge",
    type: "website",
    images: [{ url: `${BASE}/og/global-registry.png`, width: 1200, height: 630, alt: "UpForge Press and Media Kit" }],
  },
  robots: { index: true, follow: true },
}

export default function PressPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "UpForge Press & Media Kit",
    "url": `${BASE}/press`,
    "about": { "@type": "Organization", "name": "UpForge", "url": BASE, "logo": `${BASE}/logo.jpg` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <main className="min-h-screen bg-background text-foreground">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-14 md:py-20">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">Official Media Resources</span>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl font-black tracking-tight">UpForge Press & Media Kit</h1>
          <p className="mt-5 max-w-3xl text-base md:text-xl text-muted-foreground leading-relaxed">Use this page for an accurate overview of UpForge, its global startup registry, founder intelligence, UFRN framework, and editorial standards.</p>

          <section className="mt-10 grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-border bg-card p-6"><h2 className="font-serif text-2xl font-bold">Short description</h2><p className="mt-3 text-muted-foreground leading-relaxed">UpForge is a global startup registry and intelligence platform connecting structured startup records, founder stories, sector research, and UFRN-based registry identity.</p></div>
            <div className="rounded-2xl border border-border bg-card p-6"><h2 className="font-serif text-2xl font-bold">Long description</h2><p className="mt-3 text-muted-foreground leading-relaxed">UpForge publishes a searchable startup registry alongside founder profiles, market intelligence, funding analysis, and editorial research. Its goal is to make emerging-company discovery more structured, transparent, and useful for founders, investors, researchers, journalists, and ecosystem operators.</p></div>
          </section>

          <section className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-serif text-2xl font-bold">Brand assets</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-6 items-center">
              <div className="rounded-2xl border border-border bg-muted/20 p-6 flex items-center justify-center"><Image src="/logo.jpg" alt="UpForge logo" width={260} height={100} className="max-h-24 w-auto object-contain" /></div>
              <div className="space-y-3 text-sm text-muted-foreground"><p>Use the UpForge name consistently and link to <strong className="text-foreground">upforge.org</strong> when referencing the registry or published intelligence.</p><p>For official editorial or partnership requests, use the contact page.</p><Link href="/contact" className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Contact UpForge →</Link></div>
            </div>
          </section>

          <section className="mt-10 grid md:grid-cols-3 gap-5">
            <Link href="/methodology" className="rounded-2xl border border-border bg-card p-6 hover:border-amber-500/50"><h2 className="font-bold">Methodology</h2><p className="mt-2 text-sm text-muted-foreground">How the registry and data standards work.</p></Link>
            <Link href="/editorial-standards" className="rounded-2xl border border-border bg-card p-6 hover:border-amber-500/50"><h2 className="font-bold">Editorial standards</h2><p className="mt-2 text-sm text-muted-foreground">How UpForge approaches reporting and editorial quality.</p></Link>
            <Link href="/verified-startup-database" className="rounded-2xl border border-border bg-card p-6 hover:border-amber-500/50"><h2 className="font-bold">Verified database</h2><p className="mt-2 text-sm text-muted-foreground">Understand UFRN and registry classification.</p></Link>
          </section>
        </div>
      </main>
    </>
  )
}
