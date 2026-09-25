"use client";

import React, { useRef, useState } from "react";
import { CheckCircle2, Download, ExternalLink, Linkedin, Share2 } from "lucide-react";
import { toBlob } from "html-to-image";

interface Props {
  userName: string;
  quizTitle: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  certificateId: string;
  issuedAt?: string;
  credentialTier?: string;
  leaderboardRank?: number;
  shareUrl?: string;
}

function formatDate(value?: string) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "September 2026";
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
}

export default function QuizCertificate({
  userName, quizTitle, category, score, totalQuestions, percentage, certificateId,
  issuedAt, credentialTier = "UpForge Credential", leaderboardRank = 0, shareUrl,
}: Props) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<"download" | "share" | "linkedin" | "">("");
  const issueDate = formatDate(issuedAt);
  const safeFileName = certificateId.replace(/[^a-z0-9_-]/gi, "_");
  const publicShareUrl = shareUrl || "https://upforge.org/quiz/leaderboard";
  const shareText = `I completed the ${quizTitle} assessment on UpForge with ${percentage}% (${score}/${totalQuestions}) and earned an UpForge credential${leaderboardRank ? ` at rank #${leaderboardRank}` : ""}. ${publicShareUrl}`;

  const renderCertificate = async () => {
    const node = certificateRef.current;
    if (!node) throw new Error("Certificate is not ready.");
    const rect = node.getBoundingClientRect();
    return toBlob(node, {
      pixelRatio: 3,
      cacheBust: true,
      backgroundColor: "#ffffff",
      width: Math.max(1, Math.round(rect.width)),
      height: Math.max(1, Math.round(rect.height)),
      style: { transform: "none", margin: "0" },
    });
  };

  const saveBlob = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `UpForge_${safeFileName}.png`;
    link.href = url;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  const downloadCertificate = async () => {
    setBusy("download");
    try {
      const blob = await renderCertificate();
      if (!blob) throw new Error("Could not prepare certificate.");
      saveBlob(blob);
    } finally { setBusy(""); }
  };

  const shareCertificate = async () => {
    setBusy("share");
    try {
      const blob = await renderCertificate();
      if (!blob) throw new Error("Could not prepare certificate.");
      const file = new File([blob], `UpForge_${safeFileName}.png`, { type: "image/png" });
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        try {
          await navigator.share({ title: `${userName} — UpForge credential`, text: shareText, files: [file] });
          return;
        } catch {}
      }
      await navigator.clipboard?.writeText(shareText).catch(() => undefined);
      saveBlob(blob);
    } finally { setBusy(""); }
  };

  const shareLinkedIn = async () => {
    setBusy("linkedin");
    try {
      await navigator.clipboard?.writeText(`${shareText}\n\nShare your UpForge certificate with your network.`).catch(() => undefined);
    } finally {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicShareUrl)}`, "_blank", "noopener,noreferrer");
      window.setTimeout(() => setBusy(""), 350);
    }
  };

  return (
    <section className="rounded-2xl border border-[var(--glass-border)] bg-card p-3 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-accent-gold/25 bg-accent-gold/[0.045] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-accent-gold">UpForge credential</p>
          <p className="mt-1 text-sm font-black text-foreground">Ready to download and share</p>
          <p className="mt-1 text-[11px] text-muted-foreground">{leaderboardRank ? `Leaderboard rank #${leaderboardRank} · ` : ""}Certificate ID {certificateId}</p>
        </div>
        {leaderboardRank > 0 && <div className="shrink-0 rounded-xl bg-background px-3 py-2 text-center shadow-sm"><div className="text-[9px] font-black uppercase tracking-[0.12em] text-muted-foreground">Rank</div><div className="text-xl font-black text-foreground">#{leaderboardRank}</div></div>}
      </div>

      <div className="overflow-x-auto pb-1">
        <div ref={certificateRef} className="relative mx-auto aspect-[16/10] w-full min-w-[720px] max-w-[1200px] overflow-hidden bg-white text-[#14253D]" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          <div className="absolute inset-0 border-[5px] border-[#173B72]" />
          <div className="absolute inset-[12px] border border-[#D7E1ED]" />
          <div className="absolute left-[4.8%] top-[5.8%] h-[3px] w-[22%] bg-[#2E6CB5]" />
          <div className="absolute bottom-[5.8%] right-[4.8%] h-[3px] w-[22%] bg-[#2E6CB5]" />
          <div className="relative flex h-full flex-col px-[7.5%] py-[6.2%]">
            <header className="flex items-center justify-between border-b border-[#D7E1ED] pb-[2.4%]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white p-0.5"><img src="/logo.jpg" alt="UpForge" className="h-full w-full object-contain" /></div>
                <div><div className="text-[15px] font-black tracking-[0.22em] text-[#173B72]">UPFORGE</div><div className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-[#718096]">Startup intelligence platform</div></div>
              </div>
              <div className="text-right"><div className="text-[8px] font-black uppercase tracking-[0.18em] text-[#718096]">UpForge credential</div><div className="mt-1 text-[10px] font-black text-[#173B72]">{credentialTier}</div></div>
            </header>
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="text-[9px] font-black uppercase tracking-[0.34em] text-[#2E6CB5]">Certificate of Completion</div>
              <div className="mt-[2.2%] text-[clamp(28px,4.4vw,58px)] font-semibold tracking-[-0.035em] text-[#102B50]">{userName}</div>
              <div className="mt-[1.8%] h-px w-[13%] bg-[#2E6CB5]" />
              <p className="mx-auto mt-[2.1%] max-w-[72%] text-[clamp(10px,1.15vw,15px)] leading-[1.55] text-[#536274]">has successfully completed the <strong className="text-[#172B46]">{quizTitle}</strong> assessment and demonstrated applied knowledge in {category.toLowerCase()} through a scenario-based evaluation.</p>
            </div>
            <div className="grid grid-cols-4 border-y border-[#D7E1ED] py-[1.9%]">
              <div className="text-center"><div className="text-[7px] font-black uppercase tracking-[0.18em] text-[#7A8796]">Score</div><div className="mt-1 text-[15px] font-black text-[#173B72]">{score}/{totalQuestions}</div></div>
              <div className="border-l border-[#D7E1ED] text-center"><div className="text-[7px] font-black uppercase tracking-[0.18em] text-[#7A8796]">Result</div><div className="mt-1 text-[15px] font-black text-[#173B72]">{percentage}%</div></div>
              <div className="border-l border-[#D7E1ED] text-center"><div className="text-[7px] font-black uppercase tracking-[0.18em] text-[#7A8796]">Issued</div><div className="mt-1 text-[10px] font-bold text-[#173B72]">{issueDate}</div></div>
              <div className="border-l border-[#D7E1ED] text-center"><div className="text-[7px] font-black uppercase tracking-[0.18em] text-[#7A8796]">Status</div><div className="mt-1 inline-flex items-center gap-1 text-[10px] font-black text-[#17633A]"><CheckCircle2 className="h-3 w-3" /> Completed</div></div>
            </div>
            <footer className="mt-[2.1%] flex items-end justify-between gap-6"><div><div className="text-[7px] font-black uppercase tracking-[0.18em] text-[#7A8796]">Certificate ID</div><div className="mt-1 text-[8px] font-bold tracking-[0.06em] text-[#536274]">{certificateId}</div></div><div className="text-right"><div className="text-[12px] font-black tracking-[0.14em] text-[#173B72]">UPFORGE</div><div className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.14em] text-[#7A8796]">Issued by UpForge</div></div></footer>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center">
        <button type="button" onClick={downloadCertificate} disabled={!!busy} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173B72] px-6 py-3 text-sm font-black text-white transition hover:bg-[#102B50] disabled:opacity-50"><Download className="h-4 w-4" /> {busy === "download" ? "Preparing…" : "Download certificate"}</button>
        <button type="button" onClick={shareCertificate} disabled={!!busy} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#B9CBE2] bg-white px-6 py-3 text-sm font-black text-[#173B72] transition hover:bg-[#F5F8FC] disabled:opacity-50"><Share2 className="h-4 w-4" /> {busy === "share" ? "Preparing…" : "Share certificate"}</button>
        <button type="button" onClick={shareLinkedIn} disabled={!!busy} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#B9CBE2] bg-white px-6 py-3 text-sm font-black text-[#173B72] transition hover:bg-[#F5F8FC] disabled:opacity-50"><Linkedin className="h-4 w-4" /> {busy === "linkedin" ? "Opening…" : "Share on LinkedIn"}</button>
        <a href={publicShareUrl} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--glass-border)] bg-card px-6 py-3 text-sm font-black text-foreground transition hover:border-accent-primary/40"><ExternalLink className="h-4 w-4" /> View leaderboard</a>
      </div>
      <p className="mt-3 text-center text-[10px] text-muted-foreground">LinkedIn opens the sharing composer; your certificate image can be attached from the downloaded file and you can tag UpForge in your post.</p>
    </section>
  );
}
