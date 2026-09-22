import Link from "next/link";
import { ExternalLink, MapPin, CalendarDays, Users, Factory, BadgeDollarSign, CircleHelp, ShieldCheck } from "lucide-react";
import type { Startup } from "@/types/startup";
import { formatFounders } from "@/types/startup";

function cleanUrl(value?: string | null) {
  if (!value) return null;
  try { return new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`).toString(); } catch { return null; }
}

export function StartupKnowledgePanel({ startup }: { startup: Startup }) {
  const founders = formatFounders(startup.founders);
  const location = [startup.city, startup.state, startup.country_name].filter(Boolean).join(", ");
  const officialSite = cleanUrl(startup.website);
  const valuation = startup.valuation?.trim();
  const funding = startup.funding_total?.trim();
  const fundingStage = startup.funding_stage?.trim();
  const description = startup.description_long?.trim() || startup.description?.trim() || `${startup.name} is listed in the UpForge Global Startup Registry.`;
  const recordDate = startup.data_as_of || startup.verification?.last_verified;
  const answers = [
    ["what-is", `What is ${startup.name}?`, description, CircleHelp],
    ["founder", `Who founded ${startup.name}?`, founders || "Founder information is not disclosed in the current UpForge registry record.", Users],
    ["location", `Where is ${startup.name} based?`, location || "Location is not disclosed in the current UpForge registry record.", MapPin],
    ["founded", `When was ${startup.name} founded?`, startup.founded_year ? String(startup.founded_year) : "The founding year is not disclosed in the current UpForge registry record.", CalendarDays],
    ["does", `What does ${startup.name} do?`, description, Factory],
    ["valuation", `What is ${startup.name}'s valuation?`, valuation ? `${valuation}${startup.valuation_date ? ` (reported as of ${startup.valuation_date})` : ""}.` : "No valuation is recorded in the current UpForge registry snapshot. UpForge does not estimate a valuation when a source record does not provide one.", BadgeDollarSign],
    ["startup", `Is ${startup.name} a startup?`, `Yes. UpForge classifies ${startup.name} as a startup within its public registry. The registry record is an informational classification and does not replace legal incorporation or regulatory status.`, ShieldCheck],
    ["industry", `What industry is ${startup.name} in?`, startup.category || startup.industry_cluster || "Industry classification is not disclosed in the current UpForge registry record.", Factory],
  ] as const;
  return <section id="company-answers" className="scroll-mt-28 border-y border-border/80 py-10 md:py-12">
    <div className="mb-7 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-accent-gold"><ShieldCheck className="h-4 w-4" /><span className="font-sans text-[10px] font-black uppercase tracking-[0.18em]">Company facts</span></div>
      <h2 className="font-serif text-2xl font-semibold tracking-tight md:text-3xl">{startup.name}: company facts & answers</h2>
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">A concise reference record covering the questions people commonly ask about {startup.name}. Facts shown here come from the UpForge Registry record; missing fields are left undisclosed rather than estimated.</p>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {answers.map(([id, question, answer, Icon]) => <article key={id} id={id} className="scroll-mt-28 rounded-2xl border border-border/80 bg-card/70 p-5"><div className="flex items-start gap-3"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-accent-gold/25 bg-accent-gold/10 text-accent-gold"><Icon className="h-4 w-4" /></span><div className="min-w-0"><h3 className="font-serif text-lg font-semibold leading-snug">{question}</h3><p className="mt-2 text-sm leading-6 text-foreground/80">{answer}</p></div></div></article>)}
    </div>
    <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border/80 bg-muted/25 p-5 md:flex-row md:items-center md:justify-between">
      <div><p className="font-sans text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">Record provenance</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Source: <span className="font-semibold text-foreground">UpForge Global Database</span>{recordDate ? ` · Registry snapshot ${recordDate}` : ""} · UFRN {startup.ufrn || "not assigned"}</p></div>
      <div className="flex items-center gap-2">{officialSite && <a href={officialSite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-[10px] font-black uppercase tracking-wider hover:border-accent-gold/50">Official site <ExternalLink className="h-3.5 w-3.5" /></a>}<Link href="/methodology" className="inline-flex items-center rounded-xl bg-foreground px-3 py-2 text-[10px] font-black uppercase tracking-wider text-background hover:bg-accent-gold hover:text-black">Methodology</Link></div>
    </div>
    {(fundingStage || funding) && <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">{fundingStage && <span className="rounded-full border border-border bg-background px-3 py-1.5">Stage: <strong className="text-foreground">{fundingStage}</strong></span>}{funding && <span className="rounded-full border border-border bg-background px-3 py-1.5">Funding: <strong className="text-foreground">{funding}</strong></span>}</div>}
  </section>;
}
