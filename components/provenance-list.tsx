import React from "react"; 
import { ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react";
import type { ProvenanceRecord } from "@/types/startup";

interface ProvenanceListProps {
  provenance?: ProvenanceRecord[];
}

export function ProvenanceList({ provenance }: ProvenanceListProps) {
  if (!provenance || provenance.length === 0) {
    return (
      <div className="bg-card border border-border/80 rounded-3xl p-6 text-center text-muted-foreground font-serif italic text-sm">
        No field provenance records corroborated yet for this entity.
      </div>
    );
  }

  return (
    <div className="bg-card border border-border/80 rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="w-5 h-5 text-amber-500" />
        <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
          Field Provenance & Audit Trail
        </h3>
      </div>

      <div className="space-y-4">
        {provenance.map((rec, idx) => (
          <div
            key={idx}
            className="p-4 bg-muted/30 border border-border/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                  {rec.field.replace(/_/g, " ")}
                </span>
                <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold">
                  = "{rec.value}"
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground font-serif">
                <span>Source: <strong className="text-foreground">{rec.source}</strong></span>
                <span>•</span>
                <span>Verified: {rec.verified_on}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-wider">
              <span className={`px-2.5 py-1 rounded-full border ${
                rec.confidence === "high"
                  ? "bg-green-500/10 text-green-600 border-green-500/20"
                  : rec.confidence === "medium"
                  ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                  : "bg-amber-500/10 text-amber-600 border-amber-500/20"
              }`}>
                {rec.confidence} Confidence
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
