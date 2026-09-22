// app/sponsor/page.tsx
import { fetchAllStartups } from "@/lib/google-sheets";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Crown,
  TrendingUp,
  Users,
  Instagram,
  Twitter,
  Linkedin,
  Zap,
  CheckCircle,
  ShieldCheck,
  Globe,
  Award,
} from "lucide-react";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Sponsorship & Institutional Access | UpForge",
  description: "Secure high-tier placement within India’s definitive founder registry. Elite visibility for serious builders.",
};

export default async function SponsorPage() {
  const allStartups = await fetchAllStartups();
  const featured = allStartups
    .filter((s) => s.is_featured === true)
    .sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 6);

  const pricingPlans = [
    {
      name: "Standard Access",
      duration: "24 Hours",
      price: "49",
      description: "Immediate registry entry.",
      features: ["Top 10 Spotlight (1 Day)", "Single Network Feature", "Standard Analytics"],
      highlighted: false,
      cta: "Secure Access",
    },
    {
      name: "Institutional Tier",
      duration: "7 Days",
      price: "199",
      description: "High ecosystem impact.",
      features: [
        "Top 10 Spotlight (7 Days)",
        "Daily Multi-Channel Syndication",
        "Priority Support Ledger",
        "Verified Profile Status",
      ],
      highlighted: true,
      cta: "Secure Tier",
    },
    {
      name: "Legacy Membership",
      duration: "30 Days",
      price: "499",
      description: "Sustained authority.",
      features: [
        "Top 10 Spotlight (30 Days)",
        "Full Network Syndication",
        "Concierge Profile Updates",
        "Executive Newsletter Spotlight",
        "Monthly Growth Report",
      ],
      highlighted: false,
      cta: "Establish Legacy",
    },
  ];

  return (
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />

      <main className="relative pt-2">
        <section className="pt-4 sm:pt-6 pb-16 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* ========== IDENTICAL HERO TO HOME ========== */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-10 bg-black/20 hidden sm:block"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  INSTITUTIONAL VISIBILITY
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
                Architect your <br />
                <span className="text-gray-500 italic font-medium">Authority.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Position your entity within the elite 1% of the Indian startup ecosystem. 
                UpForge provides the structured visibility required for serious institutional trust.
              </p>
            </div>

            {/* ========== BENEFITS GRID (HOME STYLE) ========== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {[
                {
                  icon: ShieldCheck,
                  title: "Registry Dominance",
                  desc: "Achieve premium visibility in the Top 10 Vault, ensuring your profile is monitored by serious stakeholders.",
                },
                {
                  icon: Globe,
                  title: "Network Syndication",
                  desc: "We syndicate your growth story across a verified network of 50K+ stakeholders across LinkedIn & X.",
                },
                {
                  icon: TrendingUp,
                  title: "Curated Discovery",
                  desc: "Move beyond the noise. Our registry is built for high-growth founders and serious capital allocators.",
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="h-16 w-16 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center mb-6 group-hover:bg-[#c6a43f]/10 group-hover:text-[#c6a43f] transition-colors">
                    <benefit.icon className="h-8 w-8 text-[#1e3a5f] group-hover:text-[#c6a43f]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>

            {/* ========== PRICING TIERS ========== */}
            <div className="mb-24">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter uppercase">
                  Membership <span className="text-gray-500 italic font-medium">Structure</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative bg-white border rounded-2xl p-8 ${
                      plan.highlighted
                        ? "border-[#c6a43f] shadow-xl scale-105 z-10"
                        : "border-black/5 shadow-sm hover:shadow-lg"
                    } transition-all`}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c6a43f] text-black text-[10px] font-black uppercase tracking-wider py-1 px-4 rounded-full">
                        Ecosystem Choice
                      </div>
                    )}
                    <div className="text-center mb-6 border-b border-black/5 pb-6">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-2">{plan.name}</h3>
                      <div className="flex items-end justify-center gap-1">
                        <span className="text-5xl font-bold text-black">₹{plan.price}</span>
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">/{plan.duration}</span>
                      </div>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs font-bold uppercase tracking-tight text-gray-600">
                          <CheckCircle className="h-4 w-4 text-[#c6a43f] shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/apply">
                      <Button
                        className={`w-full h-12 rounded-full ${
                          plan.highlighted
                            ? "bg-black text-white hover:bg-gray-800"
                            : "bg-white border border-black/10 text-black hover:bg-black/5"
                        } text-[10px] font-black uppercase tracking-widest transition-all`}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* ========== REGISTRY HISTORY (SIMILAR TO HOME TRUST) ========== */}
            <div className="mb-20">
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-px w-10 bg-black/10" />
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-300">Registry Records</h2>
                <div className="h-px w-10 bg-black/10" />
              </div>

              {featured && featured.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  {featured.map((startup) => (
                    <div
                      key={startup.id}
                      className="bg-white border border-black/5 rounded-xl p-4 text-center shadow-sm"
                    >
                      {startup.logo_url ? (
                        <img src={startup.logo_url} alt={startup.name} className="h-10 w-10 object-contain mx-auto mb-2" />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-black/5 flex items-center justify-center mx-auto mb-2">
                          <span className="text-xs font-bold text-gray-300">{startup.name.charAt(0)}</span>
                        </div>
                      )}
                      <h4 className="font-bold text-[10px] text-black uppercase tracking-tighter truncate">{startup.name}</h4>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border border-dashed border-black/10 rounded-2xl">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Institutional Space Available</p>
                </div>
              )}
            </div>

            {/* ========== UNIFIED SYNDICATION ========== */}
            <div className="bg-black rounded-3xl p-12 md:p-16 text-center relative overflow-hidden text-white shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#c6a43f]/10 blur-[100px] rounded-full" />
              <div className="flex justify-center gap-8 mb-8 relative z-10 opacity-60">
                <Instagram className="h-8 w-8" />
                <Twitter className="h-8 w-8" />
                <Linkedin className="h-8 w-8" />
              </div>
              <h3 className="text-2xl md:text-4xl font-display font-bold tracking-tighter mb-6 relative z-10 uppercase">
                Unified Network Syndication.
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-sm leading-relaxed relative z-10">
                Your entry is syndicate daily across the UpForge Intelligence network, bridging the gap between independent builders and institutional capital.
              </p>
              <Link href="/apply" className="relative z-10">
                <Button className="h-14 px-12 rounded-full bg-[#c6a43f] hover:bg-[#d8b85c] text-black text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
                  Begin Verification
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="py-10 text-center text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold border-t border-black/5">
          UpForge Intelligence Group · Institutional Grade · 2026
        </div>
      </main>

      <Footer />
    </div>
  );
}
