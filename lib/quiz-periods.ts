/**
 * Timezone-safe period calculation using Asia/Kolkata
 */
export function getKolkataDateParts(date = new Date()): { year: number; month: number; date: number; day: number } {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "narrow",
  });

  const parts = formatter.formatToParts(date);
  const map: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      map[part.type] = part.value;
    }
  }

  return {
    year: parseInt(map.year, 10),
    month: parseInt(map.month, 10),
    date: parseInt(map.day, 10),
    day: date.getDay(),
  };
}

export function getCurrentPeriodIds(inputDate = new Date()): { weeklyId: string; monthlyId: string } {
  const { year, month, date } = getKolkataDateParts(inputDate);
  
  // Deterministic monthly ID: M-YYYY-MM
  const monthlyId = `M-${year}-${String(month).padStart(2, "0")}`;

  // Deterministic week calculation based on Indian Standard Time
  const d = new Date(Date.UTC(year, month - 1, date));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  const weeklyId = `W-${d.getUTCFullYear()}-${String(weekNo).padStart(2, "0")}`;

  return { weeklyId, monthlyId };
}
