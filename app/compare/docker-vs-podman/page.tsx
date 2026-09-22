// app/compare/docker-vs-podman/page.tsx
// SERVER COMPONENT - Docker vs Podman Comparison

import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Check, X, Award, ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/seo/json-ld"

async function getDomain(): Promise<"org" | "in"> {
  return "org"
}


export async function generateMetadata(): Promise<Metadata> {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const canonicalUrl = isOrg 
    ? "https://upforge.org/compare/docker-vs-podman" 
    : "https://www.upforge.in/compare/docker-vs-podman"

  return {
    title: "Docker vs Podman — Which Container Runtime Wins in 2026? | UpForge",
    description: "Complete comparison of Docker vs Podman. Compare daemonless architecture, rootless containers, Docker Compose vs Pods, Kubernetes integration, security, and migration. Find which container tool fits your workflow.",
    keywords: [
      "Docker vs Podman", "best container runtime 2026", "Docker alternative",
      "Podman vs Docker comparison", "container runtime comparison",
      "Docker vs Podman performance", "rootless containers",
      "which is better Docker or Podman", "Podman Docker replacement",
      "container orchestration tools 2026"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Docker vs Podman — Complete Container Runtime Comparison 2026",
      description: "Side-by-side comparison: daemonless architecture, rootless containers, compose, Kubernetes, security, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "Docker",
    company: "Docker Inc.",
    logo: "https://cdn.worldvectorlogo.com/logos/docker-4.svg",
    description: "Docker revolutionized software deployment by popularizing containerization, making 'containers' a household term in DevOps. With 20M+ monthly active developers, Docker Desktop, Docker Hub, and Docker Compose form the industry-standard container ecosystem. Despite facing competition, Docker remains the default container runtime for most organizations, CI/CD pipelines, and cloud platforms.",
    founded: "2013",
    headquarters: "Palo Alto, California, USA",
    valuation: "$2.1B (2022 Series C)",
    users: "20M+ monthly active developers, 13M+ Docker Hub repositories",
    licensing: "Docker Engine: Apache 2.0 · Docker Desktop: Free for individuals/SMBs",
    strengths: [
      "Industry standard — every cloud, CI/CD, and tutorial uses Docker",
      "Docker Compose: simple multi-container orchestration",
      "Docker Hub: 13M+ images, largest container registry",
      "Mature ecosystem with unparalleled community support",
      "Docker Desktop: polished GUI for Mac, Windows, Linux"
    ],
    weaknesses: [
      "Requires root daemon (dockerd) — security risk surface",
      "Docker Desktop licensing changes caused enterprise friction",
      "Single daemon is a single point of failure",
      "Higher resource overhead (daemon always running)",
      "Vendor lock-in risk with Docker-specific features"
    ],
    bestFor: [
      "Teams standardized on Docker workflows",
      "Docker Compose multi-service applications",
      "Developers wanting polished GUI (Docker Desktop)",
      "Organizations using Docker Hub for registries"
    ],
    score: 93
  },
  item2: {
    name: "Podman",
    company: "Red Hat (IBM)",
    logo: "https://icon.icepanel.io/Technology/svg/Podman.svg",
    description: "Podman is Red Hat's daemonless, rootless container engine designed as a drop-in Docker replacement with enhanced security. It operates without a background daemon, supports pods (Kubernetes-style groupings), and runs containers as non-root users by default. Backed by Red Hat and the CNCF ecosystem, Podman is the default container runtime in RHEL, Fedora, and OpenShift.",
    founded: "2018 (v1.0 in 2019)",
    headquarters: "Raleigh, North Carolina, USA (Red Hat)",
    valuation: "Part of IBM ($200B+ market cap)",
    users: "Default in RHEL 8+, Fedora, CentOS Stream, OpenShift",
    licensing: "Apache 2.0 — fully open source",
    strengths: [
      "Daemonless — no background process, direct fork-exec model",
      "Rootless by default — enhanced container security",
      "Kubernetes-native pods for multi-container grouping",
      "Drop-in Docker replacement (alias docker=podman works)",
      "Systemd integration — run containers as system services"
    ],
    weaknesses: [
      "Smaller community and fewer tutorials vs Docker",
      "Docker Compose support via podman-compose (not native)",
      "No official GUI equivalent to Docker Desktop",
      "Some Docker-specific features not fully compatible",
      "Smaller registry ecosystem (no Podman Hub equivalent)"
    ],
    bestFor: [
      "Security-conscious enterprises and regulated industries",
      "RHEL/Fedora/CentOS environments",
      "Kubernetes-native development workflows",
      "CI/CD pipelines prioritizing rootless security"
    ],
    score: 91
  },
  features: [
    { name: "Architecture", docker: "Client-server (dockerd daemon)", podman: "Daemonless (direct fork-exec)", winner: "podman" },
    { name: "Rootless Operation", docker: "Experimental rootless mode (since 19.03)", podman: "Rootless by default, designed for it", winner: "podman" },
    { name: "Security Model", docker: "Root daemon + user namespaces", podman: "Fork-exec, no daemon, SELinux support", winner: "podman" },
    { name: "Docker Compose", docker: "Native Docker Compose v2", podman: "Via podman-compose (third-party)", winner: "docker" },
    { name: "Kubernetes Integration", docker: "Deprecated (dockershim removed)", podman: "Native pods, generate K8s YAML", winner: "podman" },
    { name: "Container Registry", docker: "Docker Hub (13M+ images)", podman: "Compatible with any OCI registry", winner: "docker" },
    { name: "GUI Desktop App", docker: "Docker Desktop (polished)", podman: "Podman Desktop (emerging)", winner: "docker" },
    { name: "Systemd Integration", docker: "Via docker.service unit", podman: "Native systemd generation (podman generate systemd)", winner: "podman" },
    { name: "Docker API Compatibility", docker: "Native Docker API", podman: "Docker-compatible REST API (v4.0+)", winner: "docker" },
    { name: "Multi-Platform Builds", docker: "buildx — mature multi-arch", podman: "buildah integration — growing", winner: "docker" },
    { name: "Enterprise Support", docker: "Docker Business subscription", podman: "Red Hat OpenShift + RHEL support", winner: "tie" },
    { name: "Community & Ecosystem", docker: "Massive — 20M+ developers", podman: "Growing — default in RHEL ecosystems", winner: "docker" }
  ],
  verdict: {
    winner: "Docker for ecosystem & ease, Podman for security & Kubernetes",
    summary: "Docker remains the undisputed king of containerization with unparalleled ecosystem maturity, Docker Hub's massive registry, and Docker Desktop's polished developer experience — it's still the safest choice for most teams in 2026. Podman has emerged as the security-first alternative, winning in RHEL/Fedora environments and Kubernetes-native workflows with its daemonless, rootless architecture. With Red Hat's backing and growing enterprise adoption, Podman is no longer just an alternative — it's becoming the standard for security-conscious deployments. The best choice depends on your infrastructure: Docker for cross-platform ease and ecosystem, Podman for Linux-first security and Kubernetes-native development.",
    recommendation: "Choose Docker if your team is already invested in Docker workflows, you need Docker Desktop's polished GUI, rely on Docker Hub, or want the broadest community support — it's still the industry standard. Choose Podman if security is critical (rootless by default), you're on RHEL/Fedora/CentOS, want native Kubernetes pod support, or need tighter systemd integration — it's the future of secure containerization."
  }
}

export default async function DockerVsPodmanPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Docker vs Podman — Complete Container Runtime Comparison 2026",
    "description": comparisonData.verdict.summary,
    "datePublished": "2026-04-01",
    "dateModified": "2026-04-24",
    "author": { "@type": "Organization", "name": "UpForge Editorial", "url": baseUrl }
  }

  return (
    <>
      <JsonLd data={comparisonSchema} />
      
      <div className="bg-background min-h-screen text-foreground">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          
          {/* MASTHEAD */}
          <section className="border-b-2 border-foreground pb-4 pt-6 flex flex-col items-center text-center w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C59A2E] font-mono">
                DevOps & Containers · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Docker vs Podman
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              The industry-standard container engine vs the daemonless security champion — which runtime should power your containers?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Docker Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="Docker Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Docker</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Docker Inc.</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-3xl font-black text-[#C59A2E]">{comparisonData.item1.score}</span>
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-serif italic">
                    {comparisonData.item1.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Released</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.founded}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Valuation</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.valuation}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">User Base</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.users}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Licensing</span>
                      <p className="font-medium text-foreground text-xs">{comparisonData.item1.licensing}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✓ Strengths</p>
                    <ul className="space-y-1.5">
                      {comparisonData.item1.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✗ Weaknesses</p>
                    <ul className="space-y-1.5">
                      {comparisonData.item1.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#C59A2E] mb-2 font-mono">Best For</p>
                    <div className="flex flex-wrap gap-2">
                      {comparisonData.item1.bestFor.map((b, i) => (
                        <span key={i} className="text-[10px] bg-muted px-2 py-1 border border-border font-mono">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Podman Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Podman Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Podman</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Red Hat (IBM)</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-3xl font-black text-[#C59A2E]">{comparisonData.item2.score}</span>
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-serif italic">
                    {comparisonData.item2.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Released</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.founded}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Backed By</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.valuation}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Adoption</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.users}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Licensing</span>
                      <p className="font-medium text-foreground text-xs">{comparisonData.item2.licensing}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✓ Strengths</p>
                    <ul className="space-y-1.5">
                      {comparisonData.item2.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✗ Weaknesses</p>
                    <ul className="space-y-1.5">
                      {comparisonData.item2.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#C59A2E] mb-2 font-mono">Best For</p>
                    <div className="flex flex-wrap gap-2">
                      {comparisonData.item2.bestFor.map((b, i) => (
                        <span key={i} className="text-[10px] bg-muted px-2 py-1 border border-border font-mono">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURE TABLE */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Feature Comparison</h3>
            <div className="border border-border">
              <div className="grid grid-cols-3 bg-muted/50 border-b border-border p-4">
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-muted-foreground">Feature</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Docker</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Podman</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'docker' ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}>
                    {typeof feature.docker === 'boolean' ? (
                      feature.docker ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.docker}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'podman' ? 'bg-purple-50 dark:bg-purple-950/20' : ''}`}>
                    {typeof feature.podman === 'boolean' ? (
                      feature.podman ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.podman}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* VERDICT */}
          <section className="py-8 border-b border-border">
            <div className="max-w-3xl mx-auto text-center">
              <Award className="w-10 h-10 text-[#C59A2E] mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-4">Verdict: {comparisonData.verdict.winner}</h3>
              <p className="font-serif italic text-muted-foreground leading-relaxed mb-6">{comparisonData.verdict.summary}</p>
              <div className="bg-muted/30 border border-border p-5 text-left">
                <p className="text-sm"><span className="font-bold">💡 Recommendation:</span> {comparisonData.verdict.recommendation}</p>
              </div>
            </div>
          </section>

          {/* USE CASE COMPARISON */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">When to Use Which</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#0DB7ED] mb-3 font-mono">Choose Docker When</p>
                <ul className="space-y-2">
                  {[
                    "Your team already uses Docker and Docker Compose workflows",
                    "You need Docker Desktop's polished cross-platform GUI",
                    "Accessing Docker Hub's 13M+ container images is essential",
                    "Your CI/CD pipelines are built around Docker (GitHub Actions, GitLab)",
                    "Multi-platform builds with buildx are critical",
                    "You want the largest community, tutorials, and troubleshooting resources"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#0DB7ED] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#892CA0] mb-3 font-mono">Choose Podman When</p>
                <ul className="space-y-2">
                  {[
                    "Security is paramount — you need rootless containers by default",
                    "Running RHEL, Fedora, or CentOS in production environments",
                    "Kubernetes-native development with pod abstractions",
                    "You want daemonless architecture without background processes",
                    "Tight systemd integration for production container services",
                    "Enterprise Red Hat OpenShift deployment is your target"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#892CA0] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* MIGRATION TIP */}
          <section className="py-8 border-b border-border">
            <div className="max-w-3xl mx-auto bg-muted/30 border border-border p-6">
              <h3 className="font-sans font-black text-[13px] uppercase tracking-widest mb-4 text-center">🔄 Migrating from Docker to Podman?</h3>
              <div className="bg-background border border-border p-4 font-mono text-sm">
                <p className="text-muted-foreground mb-2"># Add this to your .bashrc or .zshrc for a drop-in replacement:</p>
                <code className="text-foreground">alias docker=podman</code>
                <p className="text-muted-foreground mt-3 mb-2"># For Docker Compose compatibility:</p>
                <code className="text-foreground">pip install podman-compose</code>
                <p className="text-muted-foreground mt-3 mb-2"># Then run:</p>
                <code className="text-foreground">podman-compose up -d</code>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3 font-mono">Podman supports 95%+ of Docker CLI commands with identical syntax</p>
            </div>
          </section>

          {/* MARKET ADOPTION */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Container Runtime Adoption (2026)</h3>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="border border-border p-5 text-center bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2 font-mono">Industry Standard</p>
                <p className="text-3xl font-black text-[#0DB7ED] font-serif">Docker</p>
                <p className="text-xs text-muted-foreground mt-1">Used in 83% of organizations</p>
              </div>
              <div className="border border-border p-5 text-center bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2 font-mono">Fastest Growing</p>
                <p className="text-3xl font-black text-[#892CA0] font-serif">Podman</p>
                <p className="text-xs text-muted-foreground mt-1">47% YoY adoption growth in enterprises</p>
              </div>
              <div className="border border-border p-5 text-center bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2 font-mono">RHEL Default</p>
                <p className="text-3xl font-black text-[#EE0000] font-serif">Podman</p>
                <p className="text-xs text-muted-foreground mt-1">Replaced Docker in RHEL 8+ and CentOS Stream</p>
              </div>
            </div>
          </section>

          {/* RELATED */}
          <section className="py-8">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest mb-6">More Comparisons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Rust vs Go", slug: "/compare/rust-vs-go" },
                { name: "Supabase vs Firebase", slug: "/compare/supabase-vs-firebase" },
                { name: "AWS vs Azure vs GCP", slug: "/compare/aws-vs-azure-vs-gcp" }
              ].map((link, i) => (
                <Link key={i} href={link.slug} className="p-4 border border-border hover:border-foreground transition-all group">
                  <span className="font-serif group-hover:text-[#C59A2E] transition-colors">{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-border group-hover:text-[#C59A2E] mt-2 transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* NEWSLETTER */}
        <section className="bg-muted/30 border-t-2 border-foreground py-12 mt-8">
          <div className="max-w-[1300px] mx-auto px-4 md:px-8 text-center">
            <h2 className="font-serif text-2xl font-bold mb-3">Get Weekly DevOps & Container Insights</h2>
            <p className="font-serif italic text-muted-foreground mb-6">Tool comparisons, container best practices, and cloud-native infrastructure strategies.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Your email" className="flex-1 px-4 py-3 bg-background border-2 border-foreground font-serif italic" />
              <button className="px-6 py-3 bg-foreground text-background font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-[#C59A2E] transition-colors">Subscribe</button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
