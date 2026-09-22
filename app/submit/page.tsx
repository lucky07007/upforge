"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Loader2,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Navbar } from "@/components/navbar";

/* ─────────────────────────────────────────────────────────────
   EMAILJS
   ───────────────────────────────────────────────────────────── */

const EMAILJS_SERVICE_ID = "service_vm21bqi";
const EMAILJS_TEMPLATE_ID = "template_fv0v24u";
const EMAILJS_PUBLIC_KEY = "gNOGg8GW_SnR1Tsmd";

const SUBMISSION_INBOX = "contact@upforge.org";
const EMAILJS_REQUEST_GAP_MS = 1200;

/* ─────────────────────────────────────────────────────────────
   VALIDATION
   ───────────────────────────────────────────────────────────── */

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/*
 * UpForge submissions should use a professional/company email.
 * Common free/public mailbox providers are intentionally blocked.
 */
const FREE_EMAIL_PROVIDERS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.in",
  "yahoo.co.uk",
  "ymail.com",
  "hotmail.com",
  "hotmail.co.uk",
  "outlook.com",
  "outlook.in",
  "live.com",
  "live.co.uk",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "pm.me",
  "gmx.com",
  "gmx.net",
  "mail.com",
  "zoho.com",
  "yandex.com",
  "yandex.ru",
  "rediffmail.com",
  "mail.ru",
]);

function isCompanyEmail(value: string) {
  const email = value.trim().toLowerCase();

  if (!isValidEmail(email)) return false;

  const parts = email.split("@");

  if (parts.length !== 2) return false;

  const domain = parts[1];

  return !FREE_EMAIL_PROVIDERS.has(domain);
}

function normalizeWebsite(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "";

  try {
    const url = new URL(
      /^https?:\/\//i.test(trimmed)
        ? trimmed
        : `https://${trimmed}`
    );

    return url.href;
  } catch {
    return trimmed;
  }
}

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

interface FormState {
  founder_name: string;
  startup_name: string;
  email: string;
  website: string;
  description: string;
  industry: string;
  founded_year: string;
}

const EMPTY: FormState = {
  founder_name: "",
  startup_name: "",
  email: "",
  website: "",
  description: "",
  industry: "",
  founded_year: new Date().getFullYear().toString(),
};

const STEPS = [
  {
    label: "Profile",
    short: "01",
    icon: Users,
  },
  {
    label: "Startup",
    short: "02",
    icon: Building2,
  },
];

const INDUSTRIES = [
  "AI/ML",
  "SaaS",
  "FinTech",
  "HealthTech",
  "EdTech",
  "D2C",
  "Climate Tech",
  "Enterprise",
  "Web3 / Crypto",
  "Robotics",
  "Other",
];

/* ─────────────────────────────────────────────────────────────
   FIELD
   ───────────────────────────────────────────────────────────── */

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
          {required && (
            <span className="ml-1 text-[#B48A2B]">*</span>
          )}
        </label>

        {hint && (
          <span className="text-[10px] text-muted-foreground/80">
            {hint}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   INPUT CLASS
   ───────────────────────────────────────────────────────────── */

const inputClass =
  "w-full rounded-[2px] border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 hover:border-foreground/20 focus:border-[#C59A2E] focus:ring-2 focus:ring-[#C59A2E]/10";

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────────── */

export default function SubmitPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const update =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement |
          HTMLTextAreaElement |
          HTMLSelectElement
      >
    ) => {
      setForm((previous) => ({
        ...previous,
        [field]: e.target.value,
      }));

      if (error) {
        setError("");
      }
    };

  const emailError = useMemo(() => {
    if (!form.email.trim()) return "";

    if (!isValidEmail(form.email)) {
      return "Enter a valid email address.";
    }

    if (!isCompanyEmail(form.email)) {
      return "Please use your company or professional domain email.";
    }

    return "";
  }, [form.email]);

  const websiteError = useMemo(() => {
    if (!form.website.trim()) return "";

    try {
      new URL(
        /^https?:\/\//i.test(form.website.trim())
          ? form.website.trim()
          : `https://${form.website.trim()}`
      );

      return "";
    } catch {
      return "Enter a valid website URL.";
    }
  }, [form.website]);

  const stepOneValid =
    form.founder_name.trim().length >= 2 &&
    form.startup_name.trim().length >= 2 &&
    isCompanyEmail(form.email) &&
    !websiteError;

  const stepTwoValid =
    form.industry.trim().length > 0 &&
    form.description.trim().length >= 30;

  const handleNext = () => {
    setError("");

    if (!stepOneValid) {
      setError(
        emailError ||
          websiteError ||
          "Complete the required profile details."
      );

      return;
    }

    setStep(1);
  };

  /* ─────────────────────────────────────────────────────────
     EMAILJS SUBMISSION
     ───────────────────────────────────────────────────────── */

  const handleSubmit = async () => {
    setError("");

    if (!stepOneValid || !stepTwoValid) {
      setError("Complete the required fields before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      const founderName = form.founder_name.trim();
      const startupName = form.startup_name.trim();
      const founderEmail = form.email.trim();
      const website = normalizeWebsite(form.website);
      const industry = form.industry.trim();
      const foundedYear = form.founded_year.trim();
      const description = form.description.trim();

      const adminMessage = [
        "UPFORGE STARTUP REGISTRY SUBMISSION",
        "===================================",
        "",
        `Founder Name: ${founderName}`,
        `Startup Name: ${startupName}`,
        `Company Email: ${founderEmail}`,
        `Website: ${website || "Not provided"}`,
        `Industry: ${industry}`,
        `Founded Year: ${foundedYear || "Not provided"}`,
        "",
        "STARTUP OVERVIEW",
        "----------------",
        description,
        "",
        "Submitted via: UpForge Startup Registry",
        "Source: https://upforge.org/submit",
      ].join("\n");

      /* ─────────────────────────────────────────────────────
         1. SEND SUBMISSION TO UPFORGE
         ───────────────────────────────────────────────────── */

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: founderName,
          title: startupName,
          email: SUBMISSION_INBOX,
          reply_to: founderEmail,
          message: adminMessage,

          founder_name: founderName,
          startup_name: startupName,
          founder_email: founderEmail,
          company_email: founderEmail,
          website,
          industry,
          founded_year: foundedYear,
          description,

          submitted_from: "UpForge Startup Submission",
          source_url: "https://upforge.org/submit",
        },
        EMAILJS_PUBLIC_KEY
      );

      /* ─────────────────────────────────────────────────────
         EMAILJS REQUEST GAP
         ───────────────────────────────────────────────────── */

      await new Promise((resolve) =>
        window.setTimeout(
          resolve,
          EMAILJS_REQUEST_GAP_MS
        )
      );

      /* ─────────────────────────────────────────────────────
         2. SEND CONFIRMATION TO FOUNDER
         ───────────────────────────────────────────────────── */

      const confirmationMessage = [
        `Hi ${founderName},`,
        "",
        `Your submission for ${startupName} has been received by UpForge.`,
        "",
        "Submission details:",
        `Startup: ${startupName}`,
        `Industry: ${industry}`,
        `Website: ${website || "Not provided"}`,
        `Founded: ${foundedYear || "Not provided"}`,
        "",
        "Your submission is now with the UpForge team for review.",
        "If additional information is required, our team will contact you.",
        "",
        "This is an automated confirmation from UpForge.",
        "",
        "The UpForge Team",
        "https://upforge.org",
      ].join("\n");

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: founderName,
          title: startupName,
          email: founderEmail,
          reply_to: SUBMISSION_INBOX,
          message: confirmationMessage,

          founder_name: founderName,
          startup_name: startupName,
          founder_email: founderEmail,
          company_email: founderEmail,
          website,
          industry,
          founded_year: foundedYear,
          description,

          submitted_from:
            "UpForge Startup Submission Confirmation",
          source_url: "https://upforge.org/submit",
        },
        EMAILJS_PUBLIC_KEY
      );

      setStep(2);
    } catch (err) {
      console.error(
        "UpForge EmailJS submission failed:",
        err
      );

      setError(
        "We could not send your submission. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────
     SUCCESS
     ───────────────────────────────────────────────────────── */

  if (step === 2) {
    return (
      <SuccessScreen
        startupName={form.startup_name}
        founderName={form.founder_name}
        email={form.email}
      />
    );
  }

  /* ─────────────────────────────────────────────────────────
     PAGE
     ───────────────────────────────────────────────────────── */

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background text-foreground">

        {/* ───────────────────────────────────────────────────
            MASTHEAD
        ─────────────────────────────────────────────────── */}

        <section className="border-b border-border">

          <div className="mx-auto max-w-[1180px] px-4 py-10 md:px-8 md:py-14">

            <div className="max-w-3xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C59A2E]/30 bg-[#C59A2E]/5 px-3 py-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-[#C59A2E]" />

                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#9A7628]">
                  Global Startup Registry
                </span>

              </div>

              <h1
                className="text-4xl font-bold tracking-[-0.035em] leading-[1.05] md:text-6xl"
                style={{
                  fontFamily:
                    "'Georgia', 'Times New Roman', serif",
                }}
              >
                Submit your startup
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                Put your company forward for the UpForge
                Global Startup Registry.
              </p>

            </div>

            {/* Small trust row */}

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5">

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#B48A2B]" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Registry submission
                </span>
              </div>

              <div className="hidden h-3 w-px bg-border sm:block" />

              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#B48A2B]" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Email confirmation
                </span>
              </div>

              <div className="hidden h-3 w-px sm:block bg-border" />

              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#B48A2B]" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Professional email required
                </span>
              </div>

            </div>

          </div>

        </section>

        {/* ───────────────────────────────────────────────────
            FORM AREA
        ─────────────────────────────────────────────────── */}

        <section className="mx-auto max-w-[1180px] px-4 py-8 md:px-8 md:py-12">

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">

            {/* FORM CARD */}

            <div className="overflow-hidden rounded-[3px] border border-border bg-card shadow-[0_12px_40px_rgba(0,0,0,0.035)]">

              {/* FORM TOP */}

              <div className="border-b border-border px-5 py-5 md:px-8">

                <div className="flex items-center justify-between gap-5">

                  <div>

                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#B48A2B]">
                      Application
                    </p>

                    <h2
                      className="mt-1.5 text-xl font-bold"
                      style={{
                        fontFamily:
                          "'Georgia', 'Times New Roman', serif",
                      }}
                    >
                      {step === 0
                        ? "Founder & company"
                        : "Startup details"}
                    </h2>

                  </div>

                  <div className="text-right">

                    <div className="font-mono text-[10px] font-bold text-foreground">
                      {step + 1}
                      <span className="text-muted-foreground">
                        /2
                      </span>
                    </div>

                    <div className="mt-1 text-[10px] text-muted-foreground">
                      Step
                    </div>

                  </div>

                </div>

                {/* PROGRESS */}

                <div className="mt-5 flex gap-1.5">

                  {[0, 1].map((item) => (
                    <div
                      key={item}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        item <= step
                          ? "bg-[#C59A2E]"
                          : "bg-muted"
                      }`}
                    />
                  ))}

                </div>

              </div>

              {/* FORM BODY */}

              <div className="px-5 py-6 md:px-8 md:py-8">

                <form
                  onSubmit={(event) => {
                    event.preventDefault();

                    if (step === 0) {
                      handleNext();
                    } else {
                      void handleSubmit();
                    }
                  }}
                >

                  <AnimatePresence mode="wait">

                    {/* ─────────────────────────────
                        STEP 1
                    ───────────────────────────── */}

                    {step === 0 && (
                      <motion.div
                        key="profile"
                        initial={{
                          opacity: 0,
                          x: -12,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: 12,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className="space-y-6"
                      >

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                          <Field
                            label="Founder name"
                            required
                          >
                            <div className="relative">

                              <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />

                              <input
                                value={
                                  form.founder_name
                                }
                                onChange={update(
                                  "founder_name"
                                )}
                                placeholder="Your full name"
                                autoComplete="name"
                                required
                                className={`${inputClass} pl-11`}
                              />

                            </div>
                          </Field>

                          <Field
                            label="Startup name"
                            required
                          >
                            <div className="relative">

                              <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />

                              <input
                                value={
                                  form.startup_name
                                }
                                onChange={update(
                                  "startup_name"
                                )}
                                placeholder="Company name"
                                autoComplete="organization"
                                required
                                className={`${inputClass} pl-11`}
                              />

                            </div>
                          </Field>

                        </div>

                        <Field
                          label="Company email"
                          required
                          hint="Professional domain"
                        >

                          <div className="relative">

                            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />

                            <input
                              type="email"
                              value={form.email}
                              onChange={update("email")}
                              placeholder="founder@company.com"
                              autoComplete="email"
                              required
                              aria-invalid={Boolean(
                                emailError
                              )}
                              className={`${inputClass} pl-11 ${
                                emailError
                                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                  : ""
                              }`}
                            />

                          </div>

                          {emailError ? (
                            <p className="text-[11px] leading-5 text-red-500">
                              {emailError}
                            </p>
                          ) : (
                            <p className="text-[10px] leading-5 text-muted-foreground">
                              Use an email on your company
                              domain. Public mailbox services
                              such as Gmail and Yahoo are not
                              accepted.
                            </p>
                          )}

                        </Field>

                        <Field
                          label="Company website"
                          hint="Optional"
                        >

                          <div className="relative">

                            <Globe2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />

                            <input
                              type="url"
                              value={form.website}
                              onChange={update(
                                "website"
                              )}
                              placeholder="company.com"
                              aria-invalid={Boolean(
                                websiteError
                              )}
                              className={`${inputClass} pl-11 ${
                                websiteError
                                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                  : ""
                              }`}
                            />

                          </div>

                          {websiteError && (
                            <p className="text-[11px] leading-5 text-red-500">
                              {websiteError}
                            </p>
                          )}

                        </Field>

                        {/* SMALL INTERACTIVE TRUST PANEL */}

                        <div className="rounded-[3px] border border-border bg-muted/40 p-4">

                          <div className="flex items-start gap-3">

                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C59A2E]/30 bg-[#C59A2E]/5">
                              <ShieldCheck className="h-4 w-4 text-[#B48A2B]" />
                            </div>

                            <div>

                              <p className="text-xs font-semibold text-foreground">
                                Registry submission
                              </p>

                              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                                Your company details are sent
                                directly to the UpForge submission
                                inbox.
                              </p>

                            </div>

                          </div>

                        </div>

                      </motion.div>
                    )}

                    {/* ─────────────────────────────
                        STEP 2
                    ───────────────────────────── */}

                    {step === 1 && (
                      <motion.div
                        key="startup"
                        initial={{
                          opacity: 0,
                          x: 12,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -12,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className="space-y-6"
                      >

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                          <Field
                            label="Industry"
                            required
                          >

                            <select
                              value={
                                form.industry
                              }
                              onChange={update(
                                "industry"
                              )}
                              required
                              className={`${inputClass} cursor-pointer`}
                            >

                              <option value="">
                                Select sector
                              </option>

                              {INDUSTRIES.map(
                                (industry) => (
                                  <option
                                    key={industry}
                                    value={industry}
                                  >
                                    {industry}
                                  </option>
                                )
                              )}

                            </select>

                          </Field>

                          <Field
                            label="Founded"
                            hint="Optional"
                          >

                            <input
                              type="number"
                              min="1900"
                              max={
                                new Date().getFullYear()
                              }
                              value={
                                form.founded_year
                              }
                              onChange={update(
                                "founded_year"
                              )}
                              placeholder="2026"
                              className={inputClass}
                            />

                          </Field>

                        </div>

                        <Field
                          label="Startup overview"
                          required
                          hint={`${form.description.length}/1800`}
                        >

                          <textarea
                            value={form.description}
                            onChange={update(
                              "description"
                            )}
                            placeholder="What does your company build, who does it serve, and what problem does it solve?"
                            rows={7}
                            minLength={30}
                            maxLength={1800}
                            required
                            className={`${inputClass} resize-none leading-6`}
                          />

                          <div className="flex items-center justify-between">

                            <span className="text-[10px] text-muted-foreground">
                              Minimum 30 characters
                            </span>

                            <span
                              className={`font-mono text-[10px] ${
                                form.description.length >=
                                30
                                  ? "text-[#9A7628]"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {form.description.length}
                              /1800
                            </span>

                          </div>

                        </Field>

                        {/* LIVE SUMMARY */}

                        <div className="overflow-hidden rounded-[3px] border border-border">

                          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">

                            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                              Submission preview
                            </span>

                            <Check className="h-3.5 w-3.5 text-[#B48A2B]" />

                          </div>

                          <div className="grid grid-cols-2 gap-px bg-border">

                            <div className="bg-background p-4">

                              <p className="text-[9px] font-mono font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                Startup
                              </p>

                              <p className="mt-1 text-sm font-semibold text-foreground">
                                {form.startup_name ||
                                  "Your startup"}
                              </p>

                            </div>

                            <div className="bg-background p-4">

                              <p className="text-[9px] font-mono font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                Sector
                              </p>

                              <p className="mt-1 text-sm font-semibold text-foreground">
                                {form.industry ||
                                  "Not selected"}
                              </p>

                            </div>

                          </div>

                        </div>

                      </motion.div>
                    )}

                  </AnimatePresence>

                  {/* ERROR */}

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -5,
                        }}
                        role="alert"
                        className="mt-6 flex items-start gap-3 rounded-[3px] border border-red-500/20 bg-red-500/5 px-4 py-3"
                      >

                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />

                        <p className="text-xs leading-5 text-red-600 dark:text-red-400">
                          {error}
                        </p>

                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ACTION BAR */}

                  <div className="mt-7 flex items-center justify-between border-t border-border pt-6">

                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setStep((current) =>
                          Math.max(
                            0,
                            current - 1
                          )
                        );
                      }}
                      className={`inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground ${
                        step === 0
                          ? "pointer-events-none opacity-0"
                          : "opacity-100"
                      }`}
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Back
                    </button>

                    {step === 0 ? (
                      <button
                        type="submit"
                        disabled={
                          !stepOneValid
                        }
                        className="group inline-flex items-center gap-2 rounded-[2px] bg-foreground px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-background transition-all hover:bg-[#C59A2E] disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        Continue
                        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={
                          isLoading ||
                          !stepTwoValid
                        }
                        className="group inline-flex items-center gap-2 rounded-[2px] bg-[#C59A2E] px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm transition-all hover:bg-[#A97F25] disabled:cursor-not-allowed disabled:opacity-35"
                      >

                        {isLoading ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Sending
                          </>
                        ) : (
                          <>
                            Submit startup
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}

                      </button>
                    )}

                  </div>

                </form>

              </div>

            </div>

            {/* ───────────────────────────────────────────────
                RIGHT SIDEBAR
            ─────────────────────────────────────────────── */}

            <aside className="space-y-5">

              {/* PROCESS */}

              <div className="rounded-[3px] border border-border bg-card p-5">

                <div className="mb-5 flex items-center justify-between">

                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#B48A2B]">
                    Process
                  </span>

                  <span className="font-mono text-[9px] text-muted-foreground">
                    01—03
                  </span>

                </div>

                <div className="space-y-0">

                  {[
                    {
                      number: "01",
                      title: "Submit",
                      active: true,
                    },
                    {
                      number: "02",
                      title: "Review",
                      active: false,
                    },
                    {
                      number: "03",
                      title: "Registry",
                      active: false,
                    },
                  ].map((item, index) => (
                    <div
                      key={item.number}
                      className="relative flex items-center gap-3 pb-5 last:pb-0"
                    >

                      {index <
                        2 && (
                        <span className="absolute left-[11px] top-6 h-[calc(100%-8px)] w-px bg-border" />
                      )}

                      <span
                        className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[8px] font-bold ${
                          item.active
                            ? "bg-[#C59A2E] text-white"
                            : "border border-border bg-background text-muted-foreground"
                        }`}
                      >
                        {item.active ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          item.number
                        )}
                      </span>

                      <span
                        className={`text-xs font-semibold ${
                          item.active
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.title}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

              {/* TRUST */}

              <div className="rounded-[3px] border border-[#C59A2E]/25 bg-[#C59A2E]/5 p-5">

                <div className="flex items-center gap-2">

                  <ShieldCheck className="h-4 w-4 text-[#B48A2B]" />

                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#947126]">
                    UpForge Registry
                  </span>

                </div>

                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  Professional company submissions are
                  reviewed before appearing in the public
                  registry.
                </p>

              </div>

              {/* EMAIL */}

              <div className="rounded-[3px] border border-border bg-card p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div>

                    <p className="text-xs font-semibold text-foreground">
                      Confirmation
                    </p>

                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      Sent after submission
                    </p>

                  </div>

                </div>

              </div>

            </aside>

          </div>

        </section>

      </main>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   SUCCESS SCREEN
   ───────────────────────────────────────────────────────────── */

function SuccessScreen({
  startupName,
  founderName,
  email,
}: {
  startupName: string;
  founderName: string;
  email: string;
}) {
  const firstName =
    founderName.trim().split(/\s+/)[0] ||
    "Founder";

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-70px)] bg-background px-4 py-10 md:flex md:items-center md:justify-center md:px-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="w-full max-w-xl"
        >

          <div className="overflow-hidden rounded-[3px] border border-border bg-card shadow-[0_18px_60px_rgba(0,0,0,0.05)]">

            {/* TOP */}

            <div className="border-b border-border px-6 py-8 text-center md:px-10">

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#C59A2E]/30 bg-[#C59A2E]/5">

                <CheckCircle2 className="h-7 w-7 text-[#B48A2B]" />

              </div>

              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#B48A2B]">
                Submission received
              </span>

              <h1
                className="mt-2 text-3xl font-bold tracking-tight"
                style={{
                  fontFamily:
                    "'Georgia', 'Times New Roman', serif",
                }}
              >
                You're on our list.
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                Thanks, {firstName}.{" "}
                <strong className="text-foreground">
                  {startupName}
                </strong>{" "}
                has been sent to the UpForge team.
              </p>

            </div>

            {/* CONFIRMATION */}

            <div className="px-6 py-6 md:px-10">

              <div className="rounded-[3px] border border-border bg-muted/40 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C59A2E]/25 bg-background">

                    <Mail className="h-4 w-4 text-[#B48A2B]" />

                  </div>

                  <div className="min-w-0">

                    <p className="text-xs font-semibold text-foreground">
                      Confirmation sent
                    </p>

                    <p className="mt-1 truncate text-[11px] text-muted-foreground">
                      {email}
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-[3px] border border-border p-4">

                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Startup
                  </p>

                  <p className="mt-1.5 truncate text-sm font-semibold text-foreground">
                    {startupName}
                  </p>

                </div>

                <div className="rounded-[3px] border border-border p-4">

                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Status
                  </p>

                  <div className="mt-1.5 flex items-center gap-1.5">

                    <span className="h-1.5 w-1.5 rounded-full bg-[#C59A2E]" />

                    <span className="text-sm font-semibold text-foreground">
                      Received
                    </span>

                  </div>

                </div>

              </div>

              <div className="mt-6 flex items-start gap-3 border-t border-border pt-5">

                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#B48A2B]" />

                <p className="text-[11px] leading-5 text-muted-foreground">
                  The UpForge team will review your submission
                  and contact you if additional information is
                  required.
                </p>

              </div>

              <a
                href="/registry"
                className="group mt-7 flex w-full items-center justify-center gap-2 rounded-[2px] bg-foreground px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-background transition-all hover:bg-[#C59A2E]"
              >
                Explore the registry
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>

            </div>

          </div>

        </motion.div>

      </main>
    </>
  );
}
