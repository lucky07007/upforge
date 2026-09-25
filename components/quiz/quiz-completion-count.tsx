"use client";

import { useEffect, useState } from "react";

export default function QuizCompletionCount({
  quizSlug,
  fallback,
}: {
  quizSlug: string;
  fallback?: number;
}) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 3500);

    fetch("/api/quiz/leaderboard?scope=counts", {
      cache: "force-cache",
      signal: controller.signal,
      credentials: "same-origin",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active) return;
        const value = Number(data?.counts?.[quizSlug]);
        if (Number.isFinite(value)) setCount(Math.max(0, Math.floor(value)));
      })
      .catch(() => {})
      .finally(() => window.clearTimeout(timeout));

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [quizSlug]);

  const shown = count ?? fallback;
  if (shown == null) return <>Live completions</>;
  return <>{shown.toLocaleString()}+ completions</>;
}
