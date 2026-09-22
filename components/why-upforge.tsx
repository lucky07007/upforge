import { Shield, Eye, TrendingUp } from "lucide-react"

const reasons = [
  {
    icon: Shield,
    title: "Curated Recognition",
    description:
      "Every startup on UPFORGE is vetted. This is not a generic directory. Being listed here signals credibility and ambition.",
  },
  {
    icon: Eye,
    title: "Investor Visibility",
    description:
      "UPFORGE puts India's most promising startups in front of the people who matter — investors, partners, and talent.",
  },
  {
    icon: TrendingUp,
    title: "Founder Network",
    description:
      "Join a community of India's most ambitious founders. Share insights, build connections, and grow together.",
  },
]

export function WhyUpforge() {
  return (
    <section id="why-upforge" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Why UPFORGE
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            We are building the most credible startup recognition platform in
            India. Here is why founders aspire to be listed.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex flex-col items-start rounded-lg border border-border bg-card p-8"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <reason.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
