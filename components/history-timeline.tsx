import React from "react";
import { History } from "lucide-react";
import type { StartupHistory } from "@/types/startup";

interface HistoryTimelineProps {
  history?: StartupHistory;
}

export function HistoryTimeline({ history }: HistoryTimelineProps) {
  if (!history) return null;

  const allEntries: { category: string; date: string; note: string }[] = [];

  if (history.founders) {
    history.founders.forEach(item => allEntries.push({ category: "Founders", date: item.date, note: item.note }));
  }
  if (history.sector) {
    history.sector.forEach(item => allEntries.push({ category: "Sector", date: item.date, note: item.note }));
  }
  if (history.status) {
    history.status.forEach(item => allEntries.push({ category: "Status", date: item.date, note: item.note }));
  }
  if (history.re_verification) {
    history.re_verification.forEach(item => allEntries.push({ category: "Re-Verification", date: item.date, note: item.note }));
  }

  if (allEntries.length === 0) return null;

  // Sort descending by date
  allEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-card border border-border/80 rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <History className="w-5 h-5 text-amber-500" />
        <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
          Entity Lifecycle Timeline
        </h3>
      </div>

      <div className="relative pl-6 border-l-2 border-border/80 space-y-6">
        {allEntries.map((item, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-background" />

            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                {item.date}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted border border-border/60 text-muted-foreground">
                {item.category}
              </span>
            </div>

            <p className="text-sm font-serif text-foreground leading-relaxed">
              {item.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
