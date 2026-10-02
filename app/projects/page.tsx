import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Projects | UpForge",
  description: "Explore initiatives in development at UpForge, their product direction, contributor opportunities and project briefs.",
  alternates: { canonical: "https://upforge.org/projects" },
}

const projects = [
  {
    number: "01",
    name: "LuckyMarkets",
    logo: "/luckymarkets.jpg",
    alt: "LuckyMarkets brand mark",
    category: "Finance education · Market information",
    status: "Building",
    summary: "Making business and market stories easier to understand, while exploring practical tools for navigating public market information.",
    focus: ["Business explainers", "IPO research concepts", "Market-information tools"],
    href: "/projects/luckymarkets",
    action: "Explore LuckyMarkets",
    tone: "orange",
  },
  {
    number: "02",
    name: "ArjunaAI",
    logo: "/arjunaai.jpg",
    alt: "ArjunaAI brand mark",
    category: "Applied AI · Software exploration",
    status: "In development",
    summary: "An early-stage initiative exploring useful AI and software experiences, with project scope and potential contribution areas described in its brief.",
    focus: ["AI / ML exploration", "Python and product engineering", "Responsible applied use cases"],
    href: "/projects/arjunaai.in",
    action: "Explore ArjunaAI",
    tone: "blue",
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-10 md:px-8 md:pb-16 md:pt-16">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">UpForge <span className="text-muted-foreground">/ Initiatives</span></p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">Projects in progress. <span className="text-muted-foreground">People who move them forward.</span></h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7">A look at initiatives being shaped through UpForge. Review each project’s direction, current stage and areas of work before introducing how you could contribute.</p>
        </div>

        <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.name} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg sm:p-6 md:p-7">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-white p-1.5 sm:size-16">
                    <Image src={project.logo} alt={project.alt} width={64} height={64} className="h-full w-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Initiative {project.number}</p>
                    <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">{project.name}<span className="text-orange-500">.</span></h2>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{project.status}</span>
              </div>

              <p className="mt-5 text-xs font-semibold text-orange-600">{project.category}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.summary}</p>

              <div className="mt-5 border-t border-border pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Current areas of focus</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.focus.map((item) => <li key={item} className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium">{item}</li>)}
                </ul>
              </div>

              <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                <span className="text-xs text-muted-foreground">Project brief & contributor information</span>
                <Link href={project.href} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-xs font-semibold text-background transition hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">{project.action}<span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 rounded-xl border border-border bg-muted/30 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-5">
          <div>
            <p className="text-sm font-semibold">Interested in contributing?</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Read the relevant project brief first, then share your strongest skills, relevant work and a practical idea. No application fee is charged.</p>
          </div>
          <a href="mailto:team@upforge.org?subject=UpForge%20Project%20Contribution" className="mt-3 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-orange-600 hover:underline sm:mt-0">Contact the team <span aria-hidden="true">↗</span></a>
        </div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">These initiatives are in development. Features, responsibilities, engagement terms and timelines are subject to project scope, review and mutual agreement. Project descriptions are informational and do not constitute a guarantee of employment or outcomes.</p>
      </section>
    </main>
  )
}
