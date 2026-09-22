// app/compare/aws-vs-azure-vs-gcp/page.tsx
// SERVER COMPONENT - AWS vs Azure vs GCP Comparison

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
    ? "https://upforge.org/compare/aws-vs-azure-vs-gcp" 
    : "https://www.upforge.in/compare/aws-vs-azure-vs-gcp"

  return {
    title: "AWS vs Azure vs GCP — Which Cloud Platform Wins in 2026? | UpForge",
    description: "Complete comparison of AWS vs Azure vs Google Cloud. Compare compute, storage, pricing, AI/ML services, Kubernetes, serverless, hybrid cloud, and market share. Find which cloud provider fits your needs.",
    keywords: [
      "AWS vs Azure vs GCP", "best cloud platform 2026", "cloud computing comparison",
      "Amazon Web Services vs Microsoft Azure vs Google Cloud", "cloud pricing comparison",
      "which cloud provider is best", "AWS vs Azure vs GCP market share",
      "cloud platform comparison 2026", "AWS vs Azure vs GCP features"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "AWS vs Azure vs GCP — Complete Cloud Platform Comparison 2026",
      description: "Side-by-side comparison: compute, storage, AI, pricing, Kubernetes, serverless, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "AWS",
    company: "Amazon Web Services",
    logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg",
    description: "AWS is the undisputed cloud computing leader with 32% market share, offering 200+ services across compute, storage, databases, machine learning, and IoT. Launched in 2006, it pioneered the public cloud and powers everything from Netflix to NASA, with the largest global infrastructure footprint of any cloud provider.",
    founded: "2006",
    headquarters: "Seattle, Washington, USA",
    marketShare: "32% (Market Leader)",
    revenue: "$105B+ annual run rate (2025)",
    users: "Millions of active customers in 245+ countries",
    pricing: "Pay-as-you-go · Reserved · Spot · Savings Plans · Free Tier available",
    strengths: [
      "Largest service catalog (200+ cloud services)",
      "Most extensive global infrastructure (105+ Availability Zones)",
      "Mature ecosystem with massive community and partners",
      "Market leader in serverless (Lambda) and object storage (S3)",
      "Best for startups with generous free tier and credits"
    ],
    weaknesses: [
      "Complex pricing — difficult to predict costs",
      "Overwhelming number of services for beginners",
      "Less integrated with enterprise Microsoft tools",
      "Vendor lock-in risk with proprietary services",
      "Support costs can be expensive at scale"
    ],
    bestFor: [
      "Startups and tech-native companies",
      "E-commerce and high-scale web applications",
      "DevOps and cloud-native architectures",
      "Organizations needing maximum global reach"
    ],
    score: 95
  },
  item2: {
    name: "Azure",
    company: "Microsoft Corporation",
    logo: "https://cdn.worldvectorlogo.com/logos/microsoft-azure-2.svg",
    description: "Microsoft Azure is the #2 cloud platform with 23% market share, deeply integrated with Microsoft's enterprise ecosystem. It's the go-to choice for Fortune 500 companies, offering seamless hybrid cloud with Azure Stack, best-in-class AI through OpenAI partnership, and unmatched Windows/Office 365 integration.",
    founded: "2010",
    headquarters: "Redmond, Washington, USA",
    marketShare: "23% (#2 behind AWS)",
    revenue: "$80B+ annual run rate (2025)",
    users: "95% of Fortune 500 companies use Azure",
    pricing: "Pay-as-you-go · Reserved · Spot · Hybrid Benefit · Free Tier available",
    strengths: [
      "Seamless integration with Microsoft 365, Teams, and Windows",
      "Best hybrid cloud solution (Azure Stack, Arc)",
      "Exclusive OpenAI/GPT integration for enterprise AI",
      "Strong compliance certifications for regulated industries",
      "Visual Studio and .NET ecosystem advantage"
    ],
    weaknesses: [
      "Smaller global infrastructure vs AWS (60+ regions)",
      "Some services feel less mature than AWS equivalents",
      "Complex portal UI can be overwhelming",
      "Past reliability incidents in some regions",
      "Higher baseline costs for small deployments"
    ],
    bestFor: [
      "Enterprise and Fortune 500 companies",
      "Microsoft-centric organizations (.NET, SQL Server)",
      "Hybrid and multi-cloud deployments",
      "AI/ML workloads with OpenAI integration"
    ],
    score: 92
  },
  item3: {
    name: "GCP",
    company: "Google Cloud Platform",
    logo: "https://cdn.worldvectorlogo.com/logos/google-cloud-2.svg",
    description: "Google Cloud Platform is the #3 cloud with 11% market share but the fastest-growing among the Big Three. GCP excels in data analytics, AI/ML with Vertex AI and Gemini models, and Kubernetes (which Google invented). It offers the most competitive pricing with sustained-use discounts and leads in big data technologies like BigQuery.",
    founded: "2011",
    headquarters: "Mountain View, California, USA",
    marketShare: "11% (Fastest Growing)",
    revenue: "$40B+ annual run rate (2025)",
    users: "Used by Spotify, Snap, PayPal, and leading AI startups",
    pricing: "Pay-as-you-go · Committed Use · Sustained-Use Discounts · Free Tier",
    strengths: [
      "Best AI/ML platform (Vertex AI, Gemini, TPU v5)",
      "Kubernetes inventor — best-managed K8s service (GKE)",
      "BigQuery: industry-leading serverless data warehouse",
      "Most competitive and transparent pricing model",
      "Superior network infrastructure (Google's private fiber)"
    ],
    weaknesses: [
      "Smallest market share means fewer third-party integrations",
      "Limited enterprise sales and support vs AWS/Azure",
      "Fewer global regions (40+) than AWS and Azure",
      "Less enterprise trust due to Google's history of deprecating products",
      "Smaller marketplace of ISV partner solutions"
    ],
    bestFor: [
      "Data analytics and big data workloads",
      "AI/ML startups and research teams",
      "Cloud-native Kubernetes deployments",
      "Cost-conscious organizations seeking best price-performance"
    ],
    score: 89
  },
  features: [
    { name: "Compute (VMs)", aws: "EC2 — Mature & feature-rich", azure: "Azure VMs — Strong hybrid", gcp: "Compute Engine — Fast provisioning", winner: "aws" },
    { name: "Kubernetes", aws: "EKS — Good but complex", azure: "AKS — Strong enterprise", gcp: "GKE — Best-in-class (invented K8s)", winner: "gcp" },
    { name: "Serverless", aws: "Lambda — Market leader", azure: "Azure Functions — Good .NET", gcp: "Cloud Functions — Competitive", winner: "aws" },
    { name: "Object Storage", aws: "S3 — Industry standard", azure: "Blob Storage — Strong", gcp: "Cloud Storage — Good pricing", winner: "aws" },
    { name: "AI/ML Services", aws: "SageMaker — Comprehensive", azure: "Azure AI + OpenAI — Best GPT", gcp: "Vertex AI + Gemini — Innovation leader", winner: "tie" },
    { name: "Database Services", aws: "RDS, Aurora, DynamoDB — Mature", azure: "SQL Database, Cosmos DB — Strong", gcp: "Cloud SQL, Spanner — Unique", winner: "aws" },
    { name: "Hybrid Cloud", aws: "Outposts — Good", azure: "Azure Stack/Arc — Best-in-class", gcp: "Anthos — Innovative", winner: "azure" },
    { name: "Global Infrastructure", aws: "105+ AZs, 33 regions", azure: "60+ regions, 300+ data centers", gcp: "40+ regions, 121 zones", winner: "aws" },
    { name: "Pricing Model", aws: "Complex, reserved instances", azure: "Enterprise agreements, hybrid benefit", gcp: "Most transparent, sustained-use discounts", winner: "gcp" },
    { name: "Enterprise Readiness", aws: "Very strong", azure: "Best for Microsoft shops", gcp: "Improving, data/AI strength", winner: "azure" },
    { name: "DevOps Tools", aws: "CodePipeline, CodeBuild — Good", azure: "Azure DevOps — Best for .NET", gcp: "Cloud Build, Cloud Deploy — Modern", winner: "azure" },
    { name: "Free Tier", aws: "12 months free + always free", azure: "12 months + $200 credit", gcp: "90 days + $300 credit + always free", winner: "gcp" }
  ],
  verdict: {
    winner: "AWS for breadth, Azure for Microsoft shops, GCP for AI/Data",
    summary: "AWS remains the overall market leader with the broadest service catalog, largest infrastructure, and most mature cloud ecosystem — it's the safest bet for most organizations. Azure is the undisputed choice for Microsoft-centric enterprises, offering seamless Windows/Office 365 integration and the best hybrid cloud story. GCP is the innovation leader in data analytics, AI/ML, and Kubernetes, with the most cost-effective pricing. The best choice depends on your existing tech stack: AWS for general-purpose cloud dominance, Azure for Microsoft enterprises, and GCP for data-intensive and AI workloads.",
    recommendation: "Choose AWS if you want maximum services, global reach, and the most mature cloud — ideal for startups and cloud-native teams. Choose Azure if you're a Microsoft enterprise using .NET, SQL Server, and Windows — the hybrid cloud and AI integration are unmatched. Choose GCP if your focus is data analytics, AI/ML, or Kubernetes — you'll get the best price-performance and cutting-edge innovation."
  }
}

export default async function AwsVsAzureVsGcpPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "AWS vs Azure vs GCP — Complete Cloud Platform Comparison 2026",
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
                Cloud Computing · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              AWS vs Azure vs GCP
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              The three cloud titans battle for dominance — which platform is right for your business in 2026?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* AWS Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="AWS Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="ml-auto">
                      <span className="text-3xl font-black text-[#C59A2E]">{comparisonData.item1.score}</span>
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h2 className="font-serif text-2xl font-bold text-foreground">AWS</h2>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Amazon Web Services</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-serif italic">
                    {comparisonData.item1.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Launched</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.founded}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Market Share</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.marketShare}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Revenue</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.revenue}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Pricing</span>
                      <p className="font-medium text-foreground text-xs">{comparisonData.item1.pricing}</p>
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

              {/* Azure Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Azure Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="ml-auto">
                      <span className="text-3xl font-black text-[#C59A2E]">{comparisonData.item2.score}</span>
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h2 className="font-serif text-2xl font-bold text-foreground">Azure</h2>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Microsoft Corporation</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-serif italic">
                    {comparisonData.item2.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Launched</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.founded}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Market Share</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.marketShare}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Revenue</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.revenue}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Pricing</span>
                      <p className="font-medium text-foreground text-xs">{comparisonData.item2.pricing}</p>
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

              {/* GCP Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={comparisonData.item3.logo} 
                        alt="GCP Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="ml-auto">
                      <span className="text-3xl font-black text-[#C59A2E]">{comparisonData.item3.score}</span>
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h2 className="font-serif text-2xl font-bold text-foreground">GCP</h2>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Google Cloud Platform</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-serif italic">
                    {comparisonData.item3.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Launched</span>
                      <p className="font-medium text-foreground">{comparisonData.item3.founded}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Market Share</span>
                      <p className="font-medium text-foreground">{comparisonData.item3.marketShare}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Revenue</span>
                      <p className="font-medium text-foreground">{comparisonData.item3.revenue}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Pricing</span>
                      <p className="font-medium text-foreground text-xs">{comparisonData.item3.pricing}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✓ Strengths</p>
                    <ul className="space-y-1.5">
                      {comparisonData.item3.strengths.map((s, i) => (
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
                      {comparisonData.item3.weaknesses.map((w, i) => (
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
                      {comparisonData.item3.bestFor.map((b, i) => (
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
            <div className="border border-border overflow-x-auto">
              <div className="grid grid-cols-4 bg-muted/50 border-b border-border p-4 min-w-[600px]">
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-muted-foreground">Feature</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">AWS</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Azure</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">GCP</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-4 border-b border-border last:border-0 min-w-[600px]">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'aws' ? 'bg-orange-50 dark:bg-orange-950/20' : ''}`}>
                    <span className="font-medium text-xs">{feature.aws}</span>
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'azure' ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}>
                    <span className="font-medium text-xs">{feature.azure}</span>
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'gcp' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    <span className="font-medium text-xs">{feature.gcp}</span>
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
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#FF9900] mb-3 font-mono">Choose AWS When</p>
                <ul className="space-y-2">
                  {[
                    "You need the broadest range of cloud services",
                    "Global scalability with maximum availability zones",
                    "Building cloud-native serverless applications",
                    "You're a startup wanting generous credits and free tier",
                    "E-commerce, streaming, or high-traffic web platforms",
                    "You want the most mature and proven cloud ecosystem"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#FF9900] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#0078D4] mb-3 font-mono">Choose Azure When</p>
                <ul className="space-y-2">
                  {[
                    "Your enterprise runs on Microsoft stack (.NET, SQL Server)",
                    "You need seamless Windows and Office 365 integration",
                    "Hybrid cloud with on-premises infrastructure",
                    "AI workloads powered by OpenAI and GPT models",
                    "Regulated industries needing extensive compliance certs",
                    "Visual Studio and GitHub ecosystem is your development core"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#0078D4] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#4285F4] mb-3 font-mono">Choose GCP When</p>
                <ul className="space-y-2">
                  {[
                    "Data analytics and big data are your primary workloads",
                    "Running Kubernetes at scale (GKE is the gold standard)",
                    "AI/ML innovation with Vertex AI and Gemini models",
                    "Cost efficiency with sustained-use and committed-use discounts",
                    "You're building on Google's superior network infrastructure",
                    "Cloud-native startups focused on data and AI products"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#4285F4] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* MARKET SHARE VISUAL */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Cloud Market Share (Q1 2026)</h3>
            <div className="max-w-2xl mx-auto">
              <div className="flex h-8 rounded-lg overflow-hidden border border-border">
                <div className="bg-[#FF9900] h-full flex items-center justify-center text-white text-xs font-bold" style={{ width: '32%' }}>AWS 32%</div>
                <div className="bg-[#0078D4] h-full flex items-center justify-center text-white text-xs font-bold" style={{ width: '23%' }}>Azure 23%</div>
                <div className="bg-[#4285F4] h-full flex items-center justify-center text-white text-xs font-bold" style={{ width: '11%' }}>GCP 11%</div>
                <div className="bg-muted h-full flex items-center justify-center text-muted-foreground text-xs font-bold" style={{ width: '34%' }}>Others 34%</div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3 font-mono">Source: Synergy Research Group, Q1 2026 estimates</p>
            </div>
          </section>

          {/* RELATED */}
          <section className="py-8">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest mb-6">More Comparisons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Canva vs CapCut", slug: "/compare/canva-vs-capcut" },
                { name: "Meta Quest vs Apple Vision Pro", slug: "/compare/meta-quest-vs-apple-vision-pro" },
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
            <h2 className="font-serif text-2xl font-bold mb-3">Get Weekly Creator Tool Insights</h2>
            <p className="font-serif italic text-muted-foreground mb-6">Tool comparisons, content creation tips, and creative platform strategies.</p>
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
