// app/docs/page.tsx
import { Button } from "@/components/ui/button";
import { Mail, Phone, Code, Shield, Zap, BarChart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "API Access | UpForge Developer Platform",
  description: "Integrate verified startup data into your applications. Request API access for real‑time founder registry data.",
};

export default function DocsPage() {
  return (
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />
      <main className="relative pt-20">
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-10 bg-black/20 hidden sm:block"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  DEVELOPER API
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
                Integrate <span className="text-gray-500 italic font-medium">Verified Data.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Access the UpForge registry programmatically. Build applications, run analysis, or embed startup data with our REST API.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {[
                {
                  icon: Zap,
                  title: "Real‑time Data",
                  desc: "Always up‑to‑date startup profiles, verification status, and sponsor information.",
                },
                {
                  icon: Shield,
                  title: "Verified Only",
                  desc: "All startups in our API are manually verified – no unvetted listings.",
                },
                {
                  icon: BarChart,
                  title: "Rich Insights",
                  desc: "Access traction metrics, founder profiles, and market categories.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="h-14 w-14 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center mb-6 group-hover:bg-[#c6a43f]/10 group-hover:text-[#c6a43f] transition-colors">
                    <item.icon className="h-6 w-6 text-[#1e3a5f] group-hover:text-[#c6a43f]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Access Details */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-black/5 rounded-2xl p-8 md:p-12 shadow-sm">
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-center mb-4">
                  API Access is <span className="text-gray-500 italic font-medium">On Demand</span>
                </h2>
                <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                  We provide API keys to trusted partners and serious developers. Tell us about your use case, and we’ll set you up with documentation and access.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Phone Card */}
                  <div className="bg-white border border-black/5 rounded-2xl p-8 text-center hover:shadow-lg transition-all group">
                    <div className="h-16 w-16 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c6a43f]/10 transition-colors">
                      <Phone className="h-8 w-8 text-[#1e3a5f] group-hover:text-[#c6a43f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Call or WhatsApp</h3>
                    <p className="text-gray-400 mb-4">Speak with our developer relations team.</p>
                    <a
                      href="tel:+919217713161"
                      className="inline-block text-2xl font-bold text-[#1e3a5f] hover:text-[#c6a43f] transition-colors"
                    >
                      +91 92177 13161
                    </a>
                  </div>

                  {/* Email Card */}
                  <div className="bg-white border border-black/5 rounded-2xl p-8 text-center hover:shadow-lg transition-all group">
                    <div className="h-16 w-16 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c6a43f]/10 transition-colors">
                      <Mail className="h-8 w-8 text-[#1e3a5f] group-hover:text-[#c6a43f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                    <p className="text-gray-400 mb-4">Send your project details.</p>
                    <div className="space-y-2">
                      <a
                        href="mailto:info@upforge.in"
                        className="block text-lg font-medium text-[#1e3a5f] hover:text-[#c6a43f] transition-colors"
                      >
                        info@upforge.in
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <p className="text-sm text-gray-400 mb-6">
                    All API plans include comprehensive documentation and developer support.
                  </p>
                  <Link href="/contact">
                    <Button className="h-14 px-12 rounded-full bg-[#1e3a5f] hover:bg-[#14304a] text-white text-xs uppercase tracking-[0.2em] shadow-lg">
                      Request API Access
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer strip (already in Footer component, but if you want a separator) */}
            <div className="text-center mt-20">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">
                UpForge · Independent Founder Registry
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
