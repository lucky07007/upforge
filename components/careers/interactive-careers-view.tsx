"use client"

import { useState } from "react"
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Code2,
  Brain,
  BarChart3,
  Compass,
  Layers,
  TrendingUp,
  Target,
  Palette,
  Share2,
  UserCheck,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import { HubSpotCareersForm } from "@/components/careers/hubspot-form"

const OPPORTUNITY_AREAS = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    desc: "Model pipelines & evaluation workflows.",
    icon: Brain,
    responsibilities: [
      "Entity-matching & classification models",
      "Automated taxonomy pipelines",
      "Accuracy benchmarking on live data",
    ],
  },
  {
    id: "software-dev",
    title: "Software Development",
    desc: "Edge web apps, APIs, registry architecture.",
    icon: Code2,
    responsibilities: [
      "Ship features on the Next.js platform",
      "Design registry-facing APIs",
      "Own performance & reliability",
    ],
  },
  {
    id: "data-bi",
    title: "Data Analytics & BI",
    desc: "Ecosystem data, funding & market trends.",
    icon: BarChart3,
    responsibilities: [
      "Founder & investor insight dashboards",
      "Funding trend analysis",
      "Large-scale data validation",
    ],
  },
  {
    id: "biz-analysis",
    title: "Business Analysis & Strategy",
    desc: "Industry research & growth positioning.",
    icon: Compass,
    responsibilities: [
      "Competitive & industry research",
      "Growth strategy modeling",
      "Findings → product recommendations",
    ],
  },
  {
    id: "product-mgmt",
    title: "Product Management",
    desc: "Feature scope & verification workflows.",
    icon: Layers,
    responsibilities: [
      "Own scoping, idea to ship",
      "Streamline verification flows",
      "Partner with design & engineering",
    ],
  },
  {
    id: "growth-marketing",
    title: "Digital Marketing & Growth",
    desc: "SEO, developer marketing, outreach.",
    icon: TrendingUp,
    responsibilities: [
      "Organic search growth",
      "Founder-focused campaigns",
      "Ecosystem partnership content",
    ],
  },
  {
    id: "biz-dev",
    title: "Business Development & Sales",
    desc: "Partnerships & founder networks.",
    icon: Target,
    responsibilities: [
      "Institutional partnerships",
      "Founder & investor network growth",
      "Outbound & deal closure",
    ],
  },
  {
    id: "design-uiux",
    title: "UI/UX & Product Design",
    desc: "Clean, accessible interfaces.",
    icon: Palette,
    responsibilities: [
      "Accessible interface design",
      "Design system ownership",
      "Prototyping & testing",
    ],
  },
  {
    id: "content-media",
    title: "Content & Social Media",
    desc: "Editorial reports & founder stories.",
    icon: Share2,
    responsibilities: [
      "Founder story writing",
      "Social content planning",
      "Editorial accuracy & quality",
    ],
  },
  {
    id: "hr-talent",
    title: "HR & Talent Acquisition",
    desc: "Pipelines & candidate operations.",
    icon: UserCheck,
    responsibilities: [
      "End-to-end pipeline coordination",
      "Clear candidate communication",
      "Onboarding operations",
    ],
  },
]

const FAQ_ITEMS = [
  {
    q: "Who can apply?",
    a: "Students, fresh graduates, and self-starters of any background — we hire for skill, curiosity, initiative, and output.",
  },
  {
    q: "Is prior experience required?",
    a: "No. We weigh problem-solving, learning ability, communication, and practical output alongside previous experience.",
  },
  {
    q: "What goes in the business analysis?",
    a: "2–3 practical ideas showing that you understand UpForge and how you could contribute to the selected area.",
  },
  {
    q: "Is the assessment or interview conducted by UpForge?",
    a: "Yes. Any assessment, interview, or recruitment discussion that is part of the UpForge hiring process is conducted or coordinated directly by the UpForge team.",
  },
  {
    q: "Does UpForge ever charge candidates?",
    a: "No. UpForge does not ask candidates to pay application fees, interview fees, assessment fees, processing fees, security deposits, training fees, or any other recruitment payment.",
  },
  {
    q: "What should I do if someone asks me for money claiming to represent UpForge?",
    a: "Do not pay. UpForge does not require payment from candidates. Treat unexpected payment requests as suspicious and verify the communication through an official @upforge.org channel before taking any action.",
  },
  {
    q: "How are candidates contacted?",
    a: "Recruitment communication should come through official UpForge channels, including @upforge.org email addresses. Candidates should be cautious of unofficial payment requests or impersonation attempts.",
  },
]

const TRUST_LINE = [
  { icon: ShieldCheck, label: "UpForge-Led Process" },
  { icon: Lock, label: "Secure Application" },
  { icon: CheckCircle2, label: "No Candidate Fees" },
  { icon: Mail, label: "Official @upforge.org Only" },
]

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Application",
    line: "Resume, role, and a short business proposal.",
    detail:
      "Submit your resume/CV, selected area, LinkedIn (optional), a short business analysis on how you'd contribute, and your availability.",
  },
  {
    n: "02",
    title: "UpForge Assessment",
    line: "A structured assessment conducted by the UpForge team.",
    detail: "assessment",
  },
  {
    n: "03",
    title: "UpForge Interview",
    line: "Role, contribution, compensation, and joining discussion.",
    detail:
      "Candidates who progress to the interview stage discuss the role, responsibilities, expectations, compensation, availability, and joining details directly with the UpForge team.",
  },
]

export function InteractiveCareersView() {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null)
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null)

  const selectedRole = OPPORTUNITY_AREAS.find(
    (r) => r.id === selectedRoleId
  )

  const handleRoleSelect = (roleId: string) => {
    setSelectedRoleId(roleId)
    document.getElementById("apply")?.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#C59A2E]/20">
      {/* ---------------------------------------------------------------- */}
      {/* HERO                                                             */}
      {/* ---------------------------------------------------------------- */}

      <section className="mx-auto max-w-[1000px] border-b border-border px-5 pb-10 pt-14 text-center md:px-8">
        <div className="mb-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C59A2E]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C59A2E]" />
          UpForge Careers · 2026 Cohort
        </div>

        <h1
          className="mb-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-[60px]"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Build With UpForge.
        </h1>

        <p className="mx-auto mb-9 max-w-xl font-serif text-base italic text-muted-foreground md:text-lg">
          Real ownership, from day one — no corporate ladder.
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <a
            href="#apply"
            className="inline-flex items-center gap-2 rounded-md bg-foreground px-7 py-3 font-bold uppercase tracking-[0.15em] text-[11px] text-background transition-colors hover:bg-[#C59A2E] hover:text-white"
          >
            Apply Now
            <ArrowRight size={13} />
          </a>

          <a
            href="#process"
            className="inline-flex items-center gap-2 rounded-md border border-border px-7 py-3 font-bold uppercase tracking-[0.15em] text-[11px] text-foreground transition-colors hover:border-[#C59A2E]/70 hover:text-[#C59A2E]"
          >
            The Process
          </a>
        </div>

        {/* Trust line */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {TRUST_LINE.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5"
            >
              <t.icon size={12} className="text-[#C59A2E]" />
              {t.label}
            </span>
          ))}
        </div>
      </section>

      <main className="mx-auto max-w-[1000px] space-y-16 px-5 py-14 md:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* TRUST / ANTI-FRAUD NOTICE                                       */}
        {/* ---------------------------------------------------------------- */}

        <section>
          <div className="border border-[#C59A2E]/30 bg-[#C59A2E]/5 p-6 md:p-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C59A2E]/30 bg-background">
                <ShieldCheck className="h-5 w-5 text-[#C59A2E]" />
              </div>

              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#C59A2E]">
                    Candidate Safety Notice
                  </span>

                  <span className="rounded-full border border-[#C59A2E]/30 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider text-[#C59A2E]">
                    Official UpForge Policy
                  </span>
                </div>

                <h2
                  className="text-xl font-bold text-foreground md:text-2xl"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  UpForge never asks candidates for payment.
                </h2>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  There is no application fee, interview fee, assessment fee,
                  processing fee, security deposit, training fee, or payment
                  required to apply for a role at UpForge.
                </p>

                <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-foreground">
                  If anyone claiming to represent UpForge asks you for money,
                  do not pay them. Verify the communication through an official
                  <span className="text-[#C59A2E]">
                    {" "}
                    @upforge.org
                  </span>{" "}
                  channel first.
                </p>

                <div className="mt-4 flex items-start gap-2 border-t border-[#C59A2E]/20 pt-4">
                  <AlertTriangle
                    size={14}
                    className="mt-0.5 shrink-0 text-[#C59A2E]"
                  />

                  <p className="text-[11px] leading-5 text-muted-foreground">
                    Never send money, card details, banking credentials,
                    cryptocurrency, gift cards, or other payments to someone
                    claiming that payment is necessary for an UpForge job,
                    interview, assessment, offer, or selection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* OVERVIEW                                                         */}
        {/* ---------------------------------------------------------------- */}

        <section>
          <div className="grid gap-6 text-center sm:grid-cols-3">
            <div>
              <div className="font-mono text-xl font-bold text-foreground">
                10
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                Open Areas
              </div>
            </div>

            <div className="sm:border-x border-border">
              <div className="font-mono text-xl font-bold text-[#C59A2E]">
                3
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                Step Process
              </div>
            </div>

            <div>
              <div className="font-mono text-xl font-bold text-foreground">
                100%
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                Transparent
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* ROLES                                                            */}
        {/* ---------------------------------------------------------------- */}

        <section>
          <div className="mb-1 flex items-baseline gap-3 border-b border-border pb-3">
            <span className="text-[10px] font-bold text-[#C59A2E]">
              01
            </span>

            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground">
              Open Areas
            </h2>
          </div>

          <p className="mb-2 mt-3 font-serif text-xs italic text-muted-foreground">
            Click a role to see what you&apos;d actually work on.
          </p>

          <div className="divide-y divide-border border-b border-border">
            {OPPORTUNITY_AREAS.map((area) => {
              const Icon = area.icon
              const isSelected = selectedRoleId === area.id
              const isExpanded = expandedRoleId === area.id

              return (
                <div key={area.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedRoleId(
                        isExpanded ? null : area.id
                      )
                    }
                    className="group flex w-full cursor-pointer items-center gap-4 py-4 text-left"
                  >
                    <Icon
                      size={16}
                      className={
                        isSelected
                          ? "shrink-0 text-[#C59A2E]"
                          : "shrink-0 text-muted-foreground transition-colors group-hover:text-[#C59A2E]"
                      }
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-bold text-foreground transition-colors group-hover:text-[#C59A2E]">
                          {area.title}
                        </span>

                        {isSelected && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#C59A2E]">
                            · Selected
                          </span>
                        )}
                      </div>

                      <span className="hidden font-serif text-xs text-muted-foreground sm:inline">
                        {area.desc}
                      </span>
                    </div>

                    <ChevronDown
                      size={15}
                      className={`shrink-0 text-muted-foreground transition-transform ${
                        isExpanded
                          ? "rotate-180 text-[#C59A2E]"
                          : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-5 pl-8">
                      {area.responsibilities.map((r, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 font-serif text-[11px] text-muted-foreground"
                        >
                          <CheckCircle2
                            size={11}
                            className="shrink-0 text-[#C59A2E]"
                          />
                          {r}
                        </span>
                      ))}

                      <button
                        type="button"
                        onClick={() => handleRoleSelect(area.id)}
                        className="ml-auto inline-flex cursor-pointer items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C59A2E] hover:text-foreground"
                      >
                        Select & Apply
                        <ArrowRight size={11} />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* PROCESS                                                          */}
        {/* ---------------------------------------------------------------- */}

        <section id="process" className="scroll-mt-20">
          <div className="mb-1 flex items-baseline gap-3 border-b border-border pb-3">
            <span className="text-[10px] font-bold text-[#C59A2E]">
              02
            </span>

            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground">
              How It Works
            </h2>
          </div>

          <div className="grid divide-y divide-border border-b border-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {PROCESS_STEPS.map((step, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer py-5 text-left transition-colors md:px-5 ${
                  idx > 0 ? "md:pl-6" : ""
                } ${
                  activeStep === idx
                    ? "bg-[#C59A2E]/5"
                    : "hover:bg-muted/40"
                }`}
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <span
                    className={`font-mono text-2xl font-bold ${
                      activeStep === idx
                        ? "text-[#C59A2E]"
                        : "text-muted-foreground/40"
                    }`}
                  >
                    {step.n}
                  </span>

                  <ChevronDown
                    size={14}
                    className={`text-muted-foreground transition-transform ${
                      activeStep === idx
                        ? "rotate-180 text-[#C59A2E]"
                        : ""
                    }`}
                  />
                </div>

                <h3 className="font-serif text-sm font-bold text-foreground">
                  {step.title}
                </h3>

                <p className="mt-0.5 font-serif text-xs text-muted-foreground">
                  {step.line}
                </p>
              </button>
            ))}
          </div>

          {/* Active step detail */}
          <div className="border border-t-0 border-border p-6">
            {activeStep === 1 ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#C59A2E]/30 bg-muted">
                    <ShieldCheck
                      size={15}
                      className="text-[#C59A2E]"
                    />
                  </div>

                  <div>
                    <h3
                      className="text-base font-bold text-foreground"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      UpForge-led assessment
                    </h3>

                    <p className="mt-1.5 font-serif text-sm leading-6 text-muted-foreground">
                      The assessment is conducted and evaluated as part of
                      the UpForge recruitment process. Candidates are not
                      required to pay for an assessment or access to an
                      interview.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 border-t border-border/60 pt-4 sm:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-[#C59A2E]"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      UpForge Team
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-[#C59A2E]"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      No Candidate Fee
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-[#C59A2E]"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      Direct Process
                    </span>
                  </div>
                </div>

                <div className="border-l-2 border-[#C59A2E] bg-muted/50 px-4 py-3">
                  <p className="font-serif text-xs leading-5 text-foreground">
                    <strong>Important:</strong> UpForge will never ask you
                    to pay money to take an assessment, attend an interview,
                    receive an offer, or proceed with recruitment.
                  </p>
                </div>
              </div>
            ) : (
              <p className="font-serif text-sm leading-relaxed text-foreground">
                {PROCESS_STEPS[activeStep].detail}
              </p>
            )}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* APPLY                                                            */}
        {/* ---------------------------------------------------------------- */}

        <section id="apply" className="scroll-mt-20">
          <div className="mb-6 flex items-baseline gap-3 border-b border-border pb-3">
            <span className="text-[10px] font-bold text-[#C59A2E]">
              03
            </span>

            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground">
              Apply
            </h2>
          </div>

          <HubSpotCareersForm selectedRole={selectedRole?.title} />

          {/* Application safety note */}
          <div className="mt-5 flex items-start gap-3 border border-border bg-muted/40 p-4">
            <Lock
              size={14}
              className="mt-0.5 shrink-0 text-[#C59A2E]"
            />

            <p className="text-[11px] leading-5 text-muted-foreground">
              <strong className="text-foreground">
                Candidate safety:
              </strong>{" "}
              submitting an application to UpForge is free. UpForge does
              not request payment at any stage of recruitment. Official
              recruitment communication should be verified through an
              <span className="font-semibold text-[#C59A2E]">
                {" "}
                @upforge.org
              </span>{" "}
              email address.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FAQ                                                              */}
        {/* ---------------------------------------------------------------- */}

        <section>
          <div className="mb-1 flex items-baseline gap-3 border-b border-border pb-3">
            <span className="text-[10px] font-bold text-[#C59A2E]">
              04
            </span>

            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground">
              FAQ
            </h2>
          </div>

          <div className="divide-y divide-border border-b border-border">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIdx === idx

              return (
                <div key={idx}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaqIdx(isOpen ? null : idx)
                    }
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-foreground"
                  >
                    <span className="font-serif text-sm font-bold">
                      {item.q}
                    </span>

                    <ChevronDown
                      size={15}
                      className={`shrink-0 text-[#C59A2E] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="max-w-3xl pb-4 font-serif text-xs leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
