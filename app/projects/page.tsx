import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Projects & Collaborations | UpForge",
  description: "Explore projects being developed through UpForge and learn how to contribute your skills.",
  alternates: { canonical: "https://upforge.org/projects" },
}

const projects = [
  { name: "LuckyMarkets", label: "Finance & market education", description: "A developing finance-media and market intelligence initiative focused on clear business stories, market explainers and useful investor education.", href: "/projects/luckymarkets", status: "Building" },
  { name: "ArjunaAI", label: "AI project", description: "An early-stage project exploring practical AI-led experiences. Project scope and contribution areas are outlined on its project page.", href: "/projects/arjunaai.in", status: "In development" },
]

export default function ProjectsPage() {
  return <main className="min-h-screen bg-background text-foreground">
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pt-24">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">UpForge / Projects</p>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">Ideas move forward when the right people build them.</h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">Explore initiatives currently being developed through UpForge. Each project page explains its direction, current needs and how interested contributors can introduce their strengths.</p>
      <div className="mt-12 grid gap-5 md:grid-cols-2">{projects.map((p, i) => <article key={p.name} className="rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg md:p-8">
        <div className="flex items-center justify-between gap-3"><span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Project 0{i+1}</span><span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{p.status}</span></div>
        <p className="mt-8 text-sm font-medium text-orange-500">{p.label}</p><h2 className="mt-2 text-3xl font-semibold">{p.name}</h2><p className="mt-4 min-h-20 leading-7 text-muted-foreground">{p.description}</p>
        <Link href={p.href} className="mt-7 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-85">Explore project <span aria-hidden="true">→</span></Link>
      </article>)}</div>
      <p className="mt-10 text-sm text-muted-foreground">UpForge shares project information for exploration and contributor applications. Specific engagement terms, responsibilities and next steps are communicated directly after review.</p>
    </section>
  </main>
}
