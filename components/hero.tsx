"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  const router = useRouter()

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden bg-[#0F172A]">
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15)_0%,transparent_70%)]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        
        {/* Subtle Grid overlay */}
        <div className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">
            India&apos;s Independent Founder Network
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.85]"
        >
          Forge <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-purple-400">
            Your Rise.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
        >
          The elite ecosystem for India&apos;s most ambitious independent builders. 
          Vetted startups, verified founders, and institutional grade networking.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
        >
          <Button 
            onClick={() => router.push("/startup")}
            className="h-16 px-10 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-500 transition-all text-sm font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/20"
          >
            Explore Startups <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            onClick={() => router.push("/apply")}
            variant="outline"
            className="h-16 px-10 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md transition-all text-sm font-black uppercase tracking-widest"
          >
            Join Ecosystem <Sparkles className="ml-2 h-4 w-4 text-indigo-400" />
          </Button>
        </motion.div>

        {/* 3D Glass Card Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-20 perspective-1000 hidden md:block"
        >
          <div className="relative mx-auto max-w-4xl h-64 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden -rotate-x-6">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent" />
            <div className="p-8 flex flex-col h-full justify-between items-start text-left">
              <div className="flex gap-4 items-center">
                <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/10" />
                <div className="h-4 w-32 bg-white/10 rounded-lg" />
              </div>
              <div className="space-y-4 w-full">
                <div className="h-3 w-full bg-white/5 rounded-lg" />
                <div className="h-3 w-2/3 bg-white/5 rounded-lg" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
