import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "ArjunaAI | AI & Machine Learning Project | UpForge",
  description: "Explore ArjunaAI, an applied AI and machine learning initiative, and share how you could contribute through engineering, research, product or growth.",
  alternates: { canonical: "https://upforge.org/projects/arjunaai.in" },
}

const tracks = [
  { n: "01", title: "AI & Machine Learning", tags: ["ML / AI Engineer", "Python Developer", "LLM & RAG Engineer", "Data / MLOps Engineer"], detail: "Explore practical AI workflows, model evaluation, data preparation, retrieval systems and responsible deployment. Proposed work will be scoped to validated product needs." },
  { n: "02", title: "Product & Engineering", tags: ["Full-stack Developer", "Backend / API Engineer", "UI / UX Designer", "QA & Automation"], detail: "Help shape usable product experiences, reliable APIs, integrations, testing and the foundations needed to turn concepts into useful tools." },
  { n: "03", title: "Research & Applied Solutions", tags: ["AI Research Associate", "Domain Researcher", "Technical Writer", "Product Analyst"], detail: "Investigate real user problems, assess technical feasibility, document findings and translate complex AI capabilities into clear product requirements." },
  { n: "04", title: "Growth & Community", tags: ["Content & SEO", "Business Development", "Customer Discovery", "Community Support"], detail: "Support product discovery through thoughtful communication, audience research, feedback loops and credible go-to-market experiments." },
]

export default function ArjunaAIPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative isolate overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_12%,rgba(249,115,22,0.13),transparent_36%),radial-gradient(ellipse_at_8%_85%,rgba(14,116,144,0.10),transparent_34%)]" />
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-8 md:px-8 md:pb-12 md:pt-10">
          <div className="grid items-center gap-7 md:grid-cols-[1.3fr_0.7fr] md:gap-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-orange-600"><span className="h-2 w-2 rounded-full bg-orange-500" /> UPFORGE PROJECT 02 · CONTRIBUTOR INTEREST</div>
              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">ArjunaAI<span className="text-orange-500">.</span></h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">Exploring practical AI and machine learning solutions, with a focus on turning technical possibilities into useful, understandable products.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="mailto:team@upforge.org?subject=ArjunaAI%20Contributor%20Proposal" className="inline-flex items-center justify-center rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-sm transition hover:-translate-y-0.5 hover:opacity-90">Share your proposal <span aria-hidden="true" className="ml-2">↗</span></a>
                <a href="https://www.arjunaai.in/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition hover:border-orange-500/50">Explore ArjunaAI website ↗</a>
              </div>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">Early-stage project · Contributor interest, not a guaranteed employment offer</p>
            </div>
            <div className="mx-auto w-full max-w-[220px] rounded-2xl border border-border bg-card p-2 shadow-md shadow-orange-950/5">
              <Image src="/arjunaai.jpg" alt="ArjunaAI project identity" width={900} height={900} priority className="aspect-square w-full rounded-xl object-contain" />
              <div className="flex items-center justify-between px-2 pb-1 pt-4"><div><p className="text-sm font-semibold">Applied intelligence</p><p className="mt-1 text-xs text-muted-foreground">AI · ML · Product thinking</p></div><span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-600">In exploration</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">Where you could contribute</p><h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Build with purpose, not buzzwords.</h2></div><p className="max-w-md text-sm leading-6 text-muted-foreground">Choose the area closest to your strengths. These are contribution tracks; exact scope is confirmed after review.</p></div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {tracks.map((track) => <article key={track.n} className="group rounded-2xl border border-border bg-card p-5 transition duration-200 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-950/5 md:p-6"><div className="flex items-start justify-between gap-3"><span className="text-xs font-bold tracking-widest text-orange-600">TRACK {track.n}</span><span className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground transition group-hover:border-orange-500/50 group-hover:text-orange-600">↗</span></div><h3 className="mt-3 text-lg font-semibold">{track.title}</h3><div className="mt-4 flex flex-wrap gap-2">{track.tags.map(tag => <span key={tag} className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium">{tag}</span>)}</div><p className="mt-4 text-sm leading-6 text-muted-foreground">{track.detail}</p></article>)}
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[0.85fr_1.15fr] md:px-8 md:py-14">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">How to be considered</p><h2 className="mt-2 text-2xl font-bold tracking-tight">A thoughtful proposal is the first step.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">We review fit and clarity before sharing any role-specific next steps.</p></div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {["Explore the official ArjunaAI website and understand its current direction.", "Tell us your strongest skill area and share relevant work, GitHub, portfolio or writing samples.", "Describe one practical way you could contribute, including your approach and assumptions.", "Send an original response within 7 days of receiving your invitation email."] .map((item,i)=><li key={item} className="flex gap-3 rounded-xl border border-border bg-card p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-orange-500/10 text-xs font-bold text-orange-600">{i+1}</span><p className="text-sm leading-6">{item}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <div className="rounded-3xl bg-[#101d32] px-6 py-8 text-white md:flex md:items-center md:justify-between md:gap-8 md:px-10 md:py-10">
          <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">Contributor invitation</p><h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">Have a useful idea or skill to bring?</h2><p className="mt-3 text-sm leading-6 text-slate-300">Send a concise, honest proposal. Do not include confidential information or pay any fee to apply. Scope, work mode, compensation and engagement terms, if applicable, are discussed only with candidates invited to the next stage.</p></div>
          <a href="mailto:team@upforge.org?subject=ArjunaAI%20Contributor%20Proposal" className="mt-6 inline-flex shrink-0 items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400 md:mt-0">Email your proposal ↗</a>
        </div>
        <p className="mt-5 text-center text-xs text-muted-foreground">A project listed by UpForge · Questions: <a className="underline underline-offset-4 hover:text-foreground" href="mailto:team@upforge.org">team@upforge.org</a></p>
      </section>
    </main>
  )
}
