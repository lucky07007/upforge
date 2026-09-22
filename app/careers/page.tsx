// app/careers/page.tsx — UpForge Careers & Opportunities
import type { Metadata } from "next"
import { InteractiveCareersView } from "@/components/careers/interactive-careers-view"

export const metadata: Metadata = {
  title: "Careers at UpForge | Build With Us",
  description:
    "Explore career and internship opportunities at UpForge. Learn about our application process and discover how you can contribute to a growing startup.",
  alternates: {
    canonical: "https://upforge.org/careers",
  },
  openGraph: {
    title: "Careers at UpForge | Build With Us",
    description:
      "Explore career and internship opportunities at UpForge. Learn about our transparent application process and join our growing team.",
    url: "https://upforge.org/careers",
    siteName: "UpForge",
    images: [
      {
        url: "https://upforge.org/og/global-registry.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@upforge_in",
    creator: "@upforge_in",
    title: "Careers at UpForge | Build With Us",
    description:
      "Join a growing startup where your ideas, skills, and initiative create real impact.",
    images: ["https://upforge.org/og/global-registry.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CareersPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://upforge.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Careers",
        item: "https://upforge.org/careers",
      },
    ],
  }

  const webpageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Careers at UpForge | Build With Us",
    description:
      "Explore career and internship opportunities at UpForge. Learn about our application process and discover how you can contribute to a growing startup.",
    url: "https://upforge.org/careers",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
      />

      <InteractiveCareersView />
    </>
  )
}
