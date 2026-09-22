import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  BadgeCheck, 
  Building2, 
  Globe, 
  TrendingUp, 
  ChevronRight, 
  Tag, 
  Zap,
  Box,
  Cpu,
  ExternalLink,
  MapPin
} from 'lucide-react';

/**
 * MOCK TYPES & DATA
 * In the real app, these are imported from @/types/startup
 */
type IndustryCluster = 'Fintech' | 'SaaS' | 'AI' | 'HealthTech';

interface Startup {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string;
  category: string;
  industry_cluster: IndustryCluster;
  ufrn: string;
  city: string;
  created_at: string;
}

const MOCK_STARTUPS: Startup[] = [
  {
    id: '1',
    name: 'NeuralPath AI',
    slug: 'neuralpath-ai',
    description: 'Autonomous supply chain optimization using proprietary LLMs.',
    logo_url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100&h=100&fit=crop',
    category: 'Logistics',
    industry_cluster: 'AI',
    ufrn: 'UF-2026-IND-00042',
    city: 'Bangalore',
    created_at: '2026-01-15'
  },
  {
    id: '2',
    name: 'PayFlow',
    slug: 'payflow',
    description: 'Real-time cross-border settlement for MSMEs.',
    logo_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop',
    category: 'Finance',
    industry_cluster: 'Fintech',
    ufrn: 'UF-2026-IND-00089',
    city: 'Mumbai',
    created_at: '2026-02-01'
  },
  {
    id: '3',
    name: 'CloudScale',
    slug: 'cloudscale',
    description: 'Infrastructure monitoring for multi-cloud deployments.',
    logo_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    category: 'DevOps',
    industry_cluster: 'SaaS',
    ufrn: 'UF-2026-IND-00102',
    city: 'Hyderabad',
    created_at: '2026-02-10'
  }
];

/**
 * StartupCard Component
 * Refactored to use standard img tags optimized for the preview environment.
 */
const StartupCard = ({ startup }: { startup: Startup }) => (
  <div className="group bg-white border border-[#E8E4DC] hover:border-[#1C1C1C] transition-all p-5 flex flex-col h-full relative overflow-hidden">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 relative overflow-hidden bg-[#F7F5F0] border border-[#E8E4DC]">
        <Image 
          src={startup.logo_url} 
          alt={startup.name}
          width={48}
          height={48}
          className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all"
          loading="lazy"
        />
      </div>
      <div className="text-right">
        <span className="text-[9px] font-mono text-[#AAA] block uppercase tracking-tighter">UFRN</span>
        <span className="text-[10px] font-bold text-[#1C1C1C]">{startup.ufrn}</span>
      </div>
    </div>
    
    <h3 className="text-lg font-bold text-[#1C1C1C] mb-1 font-serif">{startup.name}</h3>
    
    <div className="flex items-center gap-2 mb-3">
      <span className="text-[10px] px-2 py-0.5 bg-[#F7F5F0] text-[#666] uppercase font-medium tracking-wider">
        {startup.category}
      </span>
      <span className="flex items-center gap-1 text-[10px] text-[#AAA]">
        <MapPin size={10} /> {startup.city}
      </span>
    </div>

    <p className="text-sm text-[#666] line-clamp-2 mb-6 leading-relaxed flex-grow">
      {startup.description}
    </p>

    <div className="pt-4 border-t border-[#F7F5F0] flex items-center justify-between">
      <div className="flex items-center gap-1">
        {startup.industry_cluster === 'AI' && <Cpu size={12} className="text-purple-500" />}
        {startup.industry_cluster === 'Fintech' && <Zap size={12} className="text-amber-500" />}
        {startup.industry_cluster === 'SaaS' && <Box size={12} className="text-blue-500" />}
        <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest">{startup.industry_cluster}</span>
      </div>
      <a 
        href={`/startup/${startup.slug}`} 
        className="text-[10px] font-bold uppercase tracking-widest text-[#1C1C1C] flex items-center gap-1 group-hover:gap-2 transition-all"
      >
        View Profile <ChevronRight size={12} />
      </a>
    </div>
  </div>
);

/**
 * Main App Component (Registry)
 * Implements internal linking fixes and industry clusters.
 */
export default function App() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating database fetch
    const timer = setTimeout(() => {
      setStartups(MOCK_STARTUPS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const industryClusters: { label: IndustryCluster; icon: any; color: string }[] = [
    { label: 'AI', icon: Cpu, color: 'text-purple-600' },
    { label: 'SaaS', icon: Box, color: 'text-blue-600' },
    { label: 'Fintech', icon: Zap, color: 'text-amber-600' },
    { label: 'HealthTech', icon: BadgeCheck, color: 'text-emerald-600' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-8 h-8 bg-[#1C1C1C] rounded-sm"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#AAA]">Loading Registry</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F5F0] min-h-screen pb-20 pt-10">
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        
        {/* ── SECTION MASTHEAD ─────────────────────────────────────────────── */}
        <div className="border-b-2 border-[#1C1C1C] pb-6 mb-0">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-px bg-[#1C1C1C] block" />
                <span className="text-[10px] tracking-[0.28em] text-[#888] uppercase font-sans">
                  UpForge Founder Registry
                </span>
              </div>
              <h1 className="text-4xl sm:text-[3rem] font-bold text-[#1C1C1C] tracking-tight leading-none font-serif">
                Indian Startup Directory
              </h1>
              <p className="text-sm text-[#777] mt-3 max-w-xl font-sans">
                The independent source of truth for the Indian ecosystem. 
                Discover verified companies by sector, scale, and UFRN registration.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 font-sans">
              <div className="flex items-center gap-2 border border-[#DDD] bg-white px-4 py-2.5">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[11px] font-bold text-[#1C1C1C] uppercase tracking-wider">
                  {startups.length.toLocaleString()} Verified Companies
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTOR QUICK-LINKS (Internal Linking Fix) ────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 my-8 font-sans">
          <span className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.15em] flex items-center gap-2 mr-2">
            <Tag size={12} /> Filter Clusters:
          </span>
          {industryClusters.map((cluster) => (
            <button
              key={cluster.label}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E4DC] hover:border-[#1C1C1C] hover:shadow-sm transition-all rounded-sm text-[11px] font-bold text-[#555] hover:text-[#1C1C1C]"
            >
              <cluster.icon className={`w-3.5 h-3.5 ${cluster.color}`} />
              {cluster.label}
            </button>
          ))}
        </div>

        {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
        <div className="border-b border-[#E8E4DC] bg-white px-6 py-3 mb-10 flex flex-wrap items-center gap-x-10 gap-y-2 font-sans">
          {[
            { icon: BadgeCheck, text: "Independent Verification" },
            { icon: Globe, text: "Public Registry Data" },
            { icon: TrendingUp, text: "Updated Real-time" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon className="w-3.5 h-3.5 text-[#AAA]" />
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-wide">{item.text}</span>
            </div>
          ))}
        </div>

        {/* ── STARTUP GRID ─────────────────────────────────────────────────── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {startups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>

        {/* ── RELATED SECTIONS (Solving Shallow Linking) ────────────────── */}
        <div className="mt-20 grid md:grid-cols-2 gap-10 border-t-2 border-[#1C1C1C] pt-12 font-sans">
          <div className="bg-white p-8 border border-[#E8E4DC] group hover:border-[#1C1C1C] transition-colors">
            <h3 className="text-xl font-bold text-[#1C1C1C] mb-4 font-serif">
              Global Startup Registry
            </h3>
            <p className="text-sm text-[#666] mb-6 leading-relaxed">
              Explore international founders across 40+ countries. Access the global index of SaaS and AI market leaders.
            </p>
            <a 
              href="https://upforge.org/registry" 
              className="text-[11px] font-bold uppercase tracking-widest text-[#1C1C1C] flex items-center gap-2"
            >
              Explore Global Registry <ExternalLink size={14} className="text-[#AAA]" />
            </a>
          </div>
          
          <div className="bg-[#1C1C1C] p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp size={80} />
             </div>
            <h3 className="text-xl font-bold mb-4 font-serif">
              Growth Intelligence
            </h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Weekly teardowns of the fastest growing Indian startups. Deep dives into unit economics and product strategy.
            </p>
            <a 
              href="/blog" 
              className="text-[11px] font-bold uppercase tracking-widest text-white flex items-center gap-2 hover:gap-3 transition-all"
            >
              Access The Journal <ChevronRight size={14} />
            </a>
          </div>
        </div>

        {/* ── FOOTER CTA ───────────────────────────────────────────────────── */}
        <div className="mt-16 border-t border-[#D5D0C8] pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 font-sans">
          <div>
            <p className="text-md font-bold text-[#1C1C1C] font-serif">
              Registry Application
            </p>
            <p className="text-[11px] text-[#888] mt-1 uppercase tracking-wider">
              Verification takes 24-48 hours. Independent & Founder-focused.
            </p>
          </div>
          <a
            href="/submit"
            className="w-full sm:w-auto text-center px-10 py-4 bg-[#1C1C1C] text-white text-[12px] font-black tracking-[0.2em] uppercase hover:bg-[#333] transition-all shadow-lg"
          >
            List Your Startup
          </a>
        </div>

      </section>
    </div>
  );
}
