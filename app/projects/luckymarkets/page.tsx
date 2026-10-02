import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "LuckyMarkets Project | UpForge",
  description: "Explore LuckyMarkets, a developing finance and market education project, its direction and contributor opportunities.",
  alternates: { canonical: "https://upforge.org/projects/luckymarkets" },
}

const areas = [
  { title: "Web & Product Engineering", text: "Develop practical finance tools and product experiences, including an IPO tracker, IPO-related data and analysis workflows, company expansion research pages, and market-information features. Scope will depend on research, data availability and product review." },
  { title: "Content & Editorial", text: "Research business and market developments, turn verified source material into clear explainers, and help maintain accuracy, structure and editorial consistency." },
  { title: "Video & Creative", text: "Edit short- and long-form videos, shape visual storytelling, and create clean, credible graphics that support the explanation rather than distract from it." },
  { title: "Growth, Community & Support", text: "Support audience research, thoughtful distribution, community communication, website assistance and feedback collection." },
]

export default function LuckyMarketsProjectPage() {
 return <main className="min-h-screen bg-background text-foreground"><section className="mx-auto max-w-5xl px-5 pb-20 pt-14 md:px-8 md:pt-20">
  <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground">← All projects</Link>
  <div className="mt-9 flex flex-wrap items-center gap-3"><span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">UpForge project</span><span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-600">Currently building</span></div>
  <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">LuckyMarkets</h1>
  <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">A finance and market education initiative built around understandable business stories, market context and useful digital experiences. We are inviting thoughtful contributors who can bring skill, sound judgment and initiative to the work.</p>
  <div className="mt-9 flex flex-wrap gap-3"><a href="https://youtu.be/RYjQ4eGIbOA" target="_blank" rel="noreferrer" className="rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background hover:opacity-85">Watch a sample video ↗</a><a href="https://www.youtube.com/results?search_query=LuckyMarkets+finance" target="_blank" rel="noreferrer" className="rounded-lg border border-border px-5 py-3 text-sm font-semibold hover:bg-muted">Explore YouTube ↗</a></div>
  <div className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">Project direction</p><h2 className="mt-3 text-2xl font-semibold">What we are working toward</h2><p className="mt-3 leading-7 text-muted-foreground">Alongside research-led videos and educational content, the longer-term product direction includes accessible market information and focused tools. Ideas may include IPO tracking, IPO data and analysis, company expansion coverage, and stock or company research experiences. These are development directions, not promises of investment outcomes or recommendations.</p></div>
  <section className="mt-12"><h2 className="text-2xl font-semibold">Where contributors may add value</h2><p className="mt-3 max-w-2xl leading-7 text-muted-foreground">We are not limiting interest to a fixed title. Tell us the area where your ability is strongest and what you would take ownership of.</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{areas.map((a,i)=><article key={a.title} className="rounded-xl border border-border p-6"><p className="text-xs text-orange-500">0{i+1}</p><h3 className="mt-2 text-lg font-semibold">{a.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{a.text}</p></article>)}</div></section>
  <section className="mt-12 rounded-2xl border border-border bg-muted/30 p-6 md:p-8"><h2 className="text-2xl font-semibold">How to introduce yourself</h2><ol className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground"><li><strong className="text-foreground">01.</strong> Review this brief and explore the sample video and project’s public content.</li><li><strong className="text-foreground">02.</strong> Reply with your strongest skill area, relevant work or experience, and a practical idea for how you would contribute.</li><li><strong className="text-foreground">03.</strong> Use your own judgment and voice. Specific, honest thinking is more useful than a generic or AI-generated application.</li><li><strong className="text-foreground">04.</strong> Send your response within 7 days of receiving the invitation email.</li></ol><p className="mt-5 text-sm leading-6 text-muted-foreground">Initial review is based on the relevance and substance of your response. Complete role details, responsibilities, engagement structure and next steps will be shared with candidates selected to proceed.</p><a href="mailto:team@upforge.org?subject=LuckyMarkets%20Contributor%20Proposal" className="mt-6 inline-flex rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background hover:opacity-85">Send your proposal to team@upforge.org</a></section>
  <p className="mt-8 text-xs leading-5 text-muted-foreground">LuckyMarkets content is for educational and informational purposes. Any future market tools will require clear methodology, source transparency and appropriate disclaimers.</p>
 </section></main>
}
