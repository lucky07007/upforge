import React from "react";
import type { Metadata } from "next";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import LeaderboardClient from "./leaderboard-client";

const BASE_URL = "https://upforge.org";

export const metadata: Metadata = {
  title: "UpForge Quiz Leaderboards",
  description:
    "See the global and challenge-by-challenge UpForge quiz rankings, including daily and all-time results.",
  alternates: { canonical: `${BASE_URL}/quiz/leaderboard` },
  openGraph: {
    title: "UpForge Quiz Leaderboards",
    description: "Global, daily and all-time rankings for UpForge challenges.",
    url: `${BASE_URL}/quiz/leaderboard`,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function QuizLeaderboardPage() {
  const quizzes = QUIZ_REGISTRY.map((quiz) => ({
    slug: quiz.slug,
    title: quiz.title.split("|")[0].trim(),
    category: quiz.category,
  }));

  return <LeaderboardClient quizzes={quizzes} />;
}
