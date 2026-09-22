"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ShieldCheck, Sparkles, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import type { Startup } from "@/types/startup"

interface SponsoredCardProps {
  startup: Startup
}

export function SponsoredCard({ startup }: SponsoredCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="h-full"
    >
      <Link
        href={`/startup/${startup.slug}`}
        className="group relative flex flex-col h-full bg-white rounded-2xl border border-indigo-200 p-6 transition-all duration-300 hover:shadow-2xl hover:border-indigo-400"
      >
        {/* Glow Background */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 rounded-2xl -z-10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-indigo-600 rounded-full p-1.5 shadow-lg border-2 border-white">
            <Sparkles className="h-3 w-3 text-white fill-current" />
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-between items-start mb-6">
          <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-sm flex items-center justify-center p-2">
            {startup.logo_url ? (
              <Image
                src={startup.logo_url}
                alt={startup.name}
                fill
                sizes="64px"
                className="object-contain p-2"
                loading="lazy"
              />
            ) : (
              <span className="text-2xl font-black text-zinc-300">
                {startup.name?.charAt(0)}
              </span>
            )}
          </div>

          <div className="h-9 w-9 rounded-full border border-indigo-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-indigo-600 transition-colors">
              {startup.name}
            </h3>
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-indigo-50 text-indigo-600 border border-indigo-100">
            Sponsored
          </span>

          <p className="text-sm text-zinc-500 line-clamp-3 leading-relaxed font-medium mt-4">
            {startup.description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-zinc-50 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-indigo-600 transition-colors">
            View Details
          </span>

          <div className="flex items-center gap-1 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">
            <span>Verified</span>
            <ExternalLink className="h-3 w-3" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
