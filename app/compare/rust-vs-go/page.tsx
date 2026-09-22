// app/compare/rust-vs-go/page.tsx
// SERVER COMPONENT - Rust vs Go Comparison

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
    ? "https://upforge.org/compare/rust-vs-go" 
    : "https://www.upforge.in/compare/rust-vs-go"

  return {
    title: "Rust vs Go — Which Systems Language Wins in 2026? | UpForge",
    description: "Complete comparison of Rust vs Go. Compare performance, concurrency, memory safety, learning curve, ecosystem, web development, and DevOps use cases. Find which language fits your next project.",
    keywords: [
      "Rust vs Go", "best systems language 2026", "Go vs Rust comparison",
      "Rust vs Golang", "systems programming comparison", "Rust vs Go performance",
      "which is better Rust or Go", "Rust vs Go for web development",
      "Rust vs Go concurrency", "programming language comparison 2026"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Rust vs Go — Complete Systems Language Comparison 2026",
      description: "Side-by-side comparison: performance, concurrency, memory safety, ecosystem, learning curve, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "Rust",
    company: "Rust Foundation",
    logo: "https://cdn.worldvectorlogo.com/logos/rust.svg",
    description: "Rust is a systems programming language focused on safety, speed, and concurrency without a garbage collector. Created by Graydon Hoare at Mozilla Research and now governed by the Rust Foundation, it guarantees memory safety through its revolutionary ownership model. Voted 'most loved language' on Stack Overflow for 8 consecutive years (2016-2024), it powers everything from operating systems to web browsers and blockchain.",
    founded: "2015 (1.0 stable release)",
    headquarters: "Global open-source (Rust Foundation)",
    latestVersion: "Rust 1.85 (February 2026)",
    users: "3.7M+ developers worldwide",
    adoption: "Linux kernel, Android, Windows, AWS, Discord, Dropbox",
    strengths: [
      "Zero-cost abstractions with C/C++-level performance",
      "Memory safety without garbage collector (ownership model)",
      "Fearless concurrency — compiler prevents data races",
      "Best-in-class package manager (Cargo) and tooling",
      "Rich type system with pattern matching and algebraic types"
    ],
    weaknesses: [
      "Steep learning curve — borrow checker takes time to master",
      "Slow compilation times, especially for large projects",
      "Smaller web development ecosystem vs Go",
      "Fewer experienced developers in the job market",
      "Overkill for simple CRUD applications and scripts"
    ],
    bestFor: [
      "Systems programming and embedded devices",
      "WebAssembly and browser engines",
      "Blockchain and cryptographic applications",
      "Performance-critical CLI tools and services"
    ],
    score: 93
  },
  item2: {
    name: "Go",
    company: "Google LLC",
    logo: "https://cdn.worldvectorlogo.com/logos/go-logo-1.svg",
    description: "Go (Golang) is Google's statically typed, compiled programming language designed for simplicity, concurrency, and scalability. Created by Robert Griesemer, Rob Pike, and Ken Thompson in 2009, it's the language behind Docker, Kubernetes, Terraform, and most modern cloud infrastructure. With goroutines and channels, Go makes concurrent programming accessible and productive.",
    founded: "2009 (public release, 1.0 in 2012)",
    headquarters: "Mountain View, California, USA (Google)",
    latestVersion: "Go 1.24 (February 2026)",
    users: "3.2M+ developers worldwide",
    adoption: "Docker, Kubernetes, Terraform, Prometheus, CockroachDB",
    strengths: [
      "Ultra-fast compilation — compiles in milliseconds",
      "Goroutines: lightweight concurrency for millions of tasks",
      "Extremely simple syntax — learnable in a weekend",
      "Rich standard library (HTTP, crypto, testing, JSON)",
      "First-class concurrency with channels and select"
    ],
    weaknesses: [
      "Garbage collector adds latency for real-time systems",
      "No generics until Go 1.18 (still limited vs Rust traits)",
      "Error handling is verbose (if err != nil everywhere)",
      "No manual memory management for zero-allocation code",
      "Less expressive type system — no enums or pattern matching"
    ],
    bestFor: [
      "Cloud-native microservices and Kubernetes tools",
      "DevOps CLI tools and infrastructure automation",
      "High-concurrency web servers and APIs",
      "Network services and distributed systems"
    ],
    score: 91
  },
  features: [
    { name: "Performance (Raw Speed)", rust: "C/C++ level, zero-cost abstractions", go: "Fast, but garbage collector adds overhead", winner: "rust" },
    { name: "Memory Safety", rust: "Guaranteed at compile time (ownership)", go: "Garbage collected, memory-safe at runtime", winner: "rust" },
    { name: "Concurrency Model", rust: "async/await + threads, compile-time safety", go: "Goroutines + channels, elegant simplicity", winner: "go" },
    { name: "Learning Curve", rust: "Steep — borrow checker, lifetimes", go: "Gentle — learnable in a weekend", winner: "go" },
    { name: "Compilation Speed", rust: "Slow (especially with generics/macros)", go: "Ultra-fast (milliseconds for most projects)", winner: "go" },
    { name: "Package Management", rust: "Cargo — best-in-class, feature-rich", go: "Go Modules — simple, effective", winner: "rust" },
    { name: "Web Frameworks", rust: "Actix, Axum, Rocket — growing ecosystem", go: "Gin, Echo, Fiber — mature and battle-tested", winner: "go" },
    { name: "Standard Library", rust: "Minimal by design, community-driven", go: "Extensive — HTTP, crypto, testing, JSON built-in", winner: "go" },
    { name: "Generics/Metaprogramming", rust: "Powerful generics + traits + macros", go: "Generics since 1.18, limited metaprogramming", winner: "rust" },
    { name: "DevOps & Cloud Native", rust: "Growing — CLI tools, WebAssembly", go: "Dominant — Docker, K8s, Terraform, Prometheus", winner: "go" },
    { name: "Ecosystem Maturity", rust: "Rapidly growing, 150,000+ crates", go: "Mature, 200,000+ packages", winner: "tie" },
    { name: "Job Market (2026)", rust: "High demand, premium salaries, fewer roles", go: "Massive demand, abundant cloud/devops roles", winner: "go" }
  ],
  verdict: {
    winner: "Go for productivity & cloud, Rust for performance & safety",
    summary: "Go dominates cloud-native infrastructure and DevOps — it's the language of Kubernetes, Docker, and every major CNCF project. If you're building microservices, CLI tools, or high-concurrency servers, Go is the pragmatic choice with unbeatable productivity. Rust excels where performance and safety are non-negotiable: systems programming, embedded devices, WebAssembly, and blockchain. Its ownership model eliminates memory bugs at compile time, making it ideal for security-critical software. In 2026, both languages are thriving — Go leads in cloud and DevOps jobs, while Rust commands premium salaries for systems and performance-critical roles.",
    recommendation: "Choose Go if you're building cloud-native services, DevOps tools, API servers, or any concurrent application where development speed matters — you'll ship faster with a simpler codebase. Choose Rust if you need C/C++-level performance with memory safety guarantees, are building embedded systems, blockchain infrastructure, or WebAssembly modules — the learning curve pays off in runtime reliability."
  }
}

export default async function RustVsGoPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Rust vs Go — Complete Systems Language Comparison 2026",
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
                Programming Languages · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Rust vs Go
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              The safety-obsessed systems language vs the pragmatic cloud-native champion — which one deserves your next commit?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Rust Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="Rust Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Rust</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Rust Foundation</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Latest Version</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.latestVersion}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Developer Base</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.users}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Used By</span>
                      <p className="font-medium text-foreground text-xs">{comparisonData.item1.adoption}</p>
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

              {/* Go Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Go Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Go</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Google LLC</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Latest Version</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.latestVersion}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Developer Base</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.users}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Used By</span>
                      <p className="font-medium text-foreground text-xs">{comparisonData.item2.adoption}</p>
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
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Rust</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Go</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'rust' ? 'bg-orange-50 dark:bg-orange-950/20' : ''}`}>
                    {typeof feature.rust === 'boolean' ? (
                      feature.rust ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.rust}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'go' ? 'bg-cyan-50 dark:bg-cyan-950/20' : ''}`}>
                    {typeof feature.go === 'boolean' ? (
                      feature.go ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.go}</span>}
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
                <p className="text-[10px] font-black uppercase tracking-wider text-[#DEA584] mb-3 font-mono">Choose Rust When</p>
                <ul className="space-y-2">
                  {[
                    "Building operating systems, kernels, or embedded firmware",
                    "WebAssembly modules for browser or edge computing",
                    "Blockchain infrastructure (Solana, Polkadot, NEAR)",
                    "Performance-critical CLI tools that need zero overhead",
                    "Security-first applications — eliminating memory bugs",
                    "Game engines and real-time rendering pipelines"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#DEA584] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#00ADD8] mb-3 font-mono">Choose Go When</p>
                <ul className="space-y-2">
                  {[
                    "Building cloud-native microservices and REST APIs",
                    "DevOps and infrastructure tools (Docker, K8s, Terraform)",
                    "High-concurrency network services and proxies",
                    "Your team values fast onboarding and simple codebases",
                    "CLI tools where development speed > raw performance",
                    "Distributed systems with millions of concurrent connections"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#00ADD8] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* DEVELOPER SENTIMENT */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Developer Sentiment (Stack Overflow 2025)</h3>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="border border-border p-5 text-center bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2 font-mono">Most Loved</p>
                <p className="text-3xl font-black text-[#C59A2E] font-serif">Rust</p>
                <p className="text-xs text-muted-foreground mt-1">84% of developers want to keep using it</p>
              </div>
              <div className="border border-border p-5 text-center bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2 font-mono">Most Wanted</p>
                <p className="text-3xl font-black text-[#C59A2E] font-serif">Rust</p>
                <p className="text-xs text-muted-foreground mt-1">#1 language developers want to learn</p>
              </div>
              <div className="border border-border p-5 text-center bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2 font-mono">Top Paying</p>
                <p className="text-3xl font-black text-[#C59A2E] font-serif">Rust</p>
                <p className="text-xs text-muted-foreground mt-1">Median salary $195K (USA, 2025)</p>
              </div>
            </div>
          </section>

          {/* RELATED */}
          <section className="py-8">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest mb-6">More Comparisons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Supabase vs Firebase", slug: "/compare/supabase-vs-firebase" },
                { name: "AWS vs Azure vs GCP", slug: "/compare/aws-vs-azure-vs-gcp" },
                { name: "Claude vs OpenAI", slug: "/compare/claude-vs-openai" }
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
            <h2 className="font-serif text-2xl font-bold mb-3">Get Weekly Developer Tool Insights</h2>
            <p className="font-serif italic text-muted-foreground mb-6">Language comparisons, tool reviews, and programming career strategies.</p>
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
