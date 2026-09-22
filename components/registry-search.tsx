"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"

export default function RegistrySearch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [value, setValue] = useState(searchParams.get("search") || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("search", value)
      params.set("page", "1")
    } else {
      params.delete("search")
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-0 max-w-xl">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search startups..."
        className="w-full border border-r-0 px-4 py-2"
      />
      <button className="px-5 bg-black text-white flex items-center gap-2">
        <Search className="w-4 h-4" />
      </button>
    </form>
  )
}
