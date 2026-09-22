// app/creators/page.tsx

import { Metadata } from "next"
import { CreatorsClient } from "./creators-client"
import { fetchCreatorsFromSheet } from "@/lib/sheets"

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Official UpForge Creator Network — Startup Distribution & Partner Program",
    description:
      "Promote product launches, hiring pushes, and feature announcements across UpForge's verified creator network. Backed by India's startup registry.",
    keywords: [
      "upforge creator network",
      "startup distribution platform",
      "creator partner program",
      "verified creator directory",
      "startup influencer marketing",
      "performance video distribution",
      "india creator network",
    ],
    alternates: {
      canonical: "https://upforge.org/creators",
    },
    openGraph: {
      title: "Official UpForge Creator Network — Startup Distribution & Partner Program",
      description:
        "Distribution for startups, backed by India's startup registry. Connect with verified creators for performance-based product campaigns.",
      type: "website",
      url: "https://upforge.org/creators",
    },
  }
}

export default async function CreatorsPage() {
  const initialCreators = await fetchCreatorsFromSheet()
  return <CreatorsClient initialCreators={initialCreators} />
}


