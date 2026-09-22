// app/compare/layout.tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI & Startup Comparisons | UpForge",
  description: "In-depth comparisons of AI models, SaaS tools, and startups. Make informed decisions with verified data.",
  keywords: ["AI comparison", "startup comparison", "tool comparison", "vs", "versus"]
}

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
