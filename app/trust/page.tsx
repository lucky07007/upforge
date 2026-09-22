// app/trust/page.tsx
import { ShieldCheck, Users, FileCheck, Eye, Mail } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Trust & Safety | UpForge",
  description: "How UpForge ensures a trusted environment for founders, investors, and partners.",
};

export default function TrustPage() {
  return (
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />
      <main className="relative pt-20">
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-10 bg-black/20 hidden sm:block"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  TRUST & SAFETY
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
                Built on <br />
                <span className="text-gray-500 italic font-medium">Integrity.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                We take the responsibility of hosting your startup's reputation seriously. Here's how we maintain a safe and trustworthy environment.
              </p>
            </div>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {[
                {
                  icon: Users,
                  title: "Founder Verification",
                  desc: "Every founder undergoes manual identity verification. We cross-check with public records, professional networks, and incorporation documents.",
                },
                {
                  icon: FileCheck,
                  title: "Startup Vetting",
                  desc: "We verify business registration, operational history, and traction metrics. Only genuine, active startups receive the UpForge Seal.",
                },
                {
                  icon: Eye,
                  title: "Transparency",
                  desc: "Each profile shows verification status and the date of verification. Sponsored listings are clearly marked.",
                },
                {
                  icon: ShieldCheck,
                  title: "Data Protection",
                  desc: "We adhere to strict data handling practices. Your personal information is never sold or misused.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="h-12 w-12 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center mb-6 group-hover:bg-[#c6a43f]/10 group-hover:text-[#c6a43f] transition-colors">
                    <item.icon className="h-6 w-6 text-[#1e3a5f] group-hover:text-[#c6a43f]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Detailed Sections */}
            <div className="bg-white border border-black/5 rounded-2xl shadow-sm p-6 sm:p-8 md:p-12 space-y-8">
              <section>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Our Verification Process</h2>
                <p className="text-gray-500 leading-relaxed">
                  The UpForge verification process is rigorous and multi-step. We review:
                </p>
                <ul className="list-disc pl-6 text-gray-500 mt-4 space-y-2">
                  <li>Certificate of Incorporation or equivalent registration.</li>
                  <li>Founder identity via government ID and professional profiles.</li>
                  <li>Operational history (e.g., website, product, customer traction).</li>
                  <li>Public records and any relevant news or mentions.</li>
                </ul>
                <p className="text-gray-500 mt-4">
                  Only after passing these checks does a startup receive the verified seal.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Reporting Concerns</h2>
                <p className="text-gray-500 leading-relaxed">
                  If you believe a listing is inaccurate or fraudulent, please report it immediately. We investigate all reports within 48 hours.
                </p>
                <div className="bg-white border border-black/5 rounded-xl p-6 mt-4">
                  <p className="flex items-center gap-2 text-black">
                    <Mail className="h-4 w-4 text-[#c6a43f]" />
                    <a
                      href="mailto:safety@upforge.in"
                      className="hover:text-[#c6a43f] transition-colors"
                    >
                      safety@upforge.in
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Commitment to Quality</h2>
                <p className="text-gray-500 leading-relaxed">
                  We continuously monitor the registry and remove startups that no longer meet our standards or that engage in misleading practices. Our goal is to maintain a high-quality, trustworthy directory for the entire ecosystem.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
