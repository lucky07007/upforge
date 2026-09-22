"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Startup {
  id: string
  name: string
  slug: string
  logo_url?: string
  website?: string
}

export default function DashboardClient({
  latestStartup,
}: {
  latestStartup: Startup | null
  comments: any[]
  teamCount: number
}) {
  const router = useRouter()
  const [activeUrl, setActiveUrl] = useState<string>("https://www.sarvam.ai/")

  const featuredStartups = [
    { name: "Sarvam", url: "https://www.sarvam.ai/" },
    { name: "Factacy AI", url: "https://www.factacy.ai/" },
    { name: "Registry", url: "https://upforge.org/registry" },
    { name: "Cava", url: "https://cavaathleisure.com/" },
    { name: "Visey", url: "https://visey.co.in/" },
    { name: "Entellus", url: "https://entellusind.com/" },
  ]

  return (
    <div className="flex flex-col md:flex-row 
                    h-[65vh] min-h-[500px] max-h-[700px] 
                    w-full bg-white text-xs 
                    overflow-hidden border border-black/5 rounded-lg">

      {/* SIDEBAR */}
      <div className="md:w-[200px] w-full 
                      bg-gray-50 
                      border-r md:border-r border-b md:border-b-0 
                      border-black/5 flex flex-col">

        {/* Title */}
        <div className="px-4 pt-4 md:pt-5">
          <h2 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3 hidden md:block">
            Featured
          </h2>
        </div>

        {/* Startup List */}
        <div className="flex md:flex-col gap-2 
                        overflow-x-auto md:overflow-visible 
                        px-3 pb-3 md:px-4">

          {featuredStartups.map((startup) => (
            <button
              key={startup.name}
              onClick={() => setActiveUrl(startup.url)}
              className={`whitespace-nowrap md:w-full 
                          text-left px-3 py-2 
                          rounded-lg transition-all 
                          border text-[11px] ${
                activeUrl === startup.url
                  ? "bg-white border-black/10 shadow-sm font-semibold text-black"
                  : "border-transparent hover:bg-black/5 text-gray-500"
              }`}
            >
              {startup.name}
            </button>
          ))}

          <button
            onClick={() => router.push("/startup")}
            className="whitespace-nowrap md:w-full 
                       text-center px-3 py-2 text-[11px] 
                       font-semibold text-[#1e3a5f] 
                       border border-dashed 
                       border-[#1e3a5f]/30 rounded-lg"
          >
            More →
          </button>
        </div>
      </div>

      {/* IFRAME AREA */}
      <div className="flex-1 bg-white relative">
        <div className="absolute top-0 left-0 
                        w-full h-[2px] 
                        bg-gradient-to-r 
                        from-blue-500 to-indigo-600" />
        <iframe
          src={activeUrl}
          className="w-full h-full border-none"
          title="Startup Preview"
        />
      </div>
    </div>
  )
}
