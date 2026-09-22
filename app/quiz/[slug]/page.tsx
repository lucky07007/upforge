import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import QuizDetailClient from "./quiz-detail-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BASE_URL = "https://upforge.org";

export async function generateStaticParams() {
  return (QUIZ_REGISTRY || []).map((quiz) => ({ slug: quiz.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const quiz = (QUIZ_REGISTRY || []).find((item) => item.slug === slug);

  if (!quiz) {
    return { title: "Challenge not found", robots: { index: false, follow: false } };
  }

  const title = quiz.title.split("|")[0].trim();
  const description = `${quiz.description || quiz.tagline} Take the ${quiz.questions.length}-question UpForge assessment, earn a professional certificate and join the public leaderboard.`;
  const canonical = `${BASE_URL}/quiz/${quiz.slug}`;

  return {
    title: `${title} — UpForge`,
    description,
    keywords: [
      title,
      `${quiz.category} quiz`,
      `${quiz.category} assessment`,
      "UpForge quiz",
      "online assessment",
      "certificate",
      "leaderboard",
    ],
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "UpForge",
      title,
      description,
      images: [{ url: quiz.image, width: 1200, height: 675, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [quiz.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function QuizDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const quiz = (QUIZ_REGISTRY || []).find((item) => item.slug === slug);

  if (!quiz) notFound();

  const title = quiz.title.split("|")[0].trim();
  const canonical = `${BASE_URL}/quiz/${quiz.slug}`;

  // Keep answer keys server-side. This schema describes the learning resource
  // without exposing the correct option to the interactive client.
  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": `${canonical}#quiz`,
    name: title,
    description: quiz.description || quiz.tagline,
    url: canonical,
    image: quiz.image,
    learningResourceType: "Quiz",
    educationalUse: "Assessment",
    interactivityType: "active",
    timeRequired: "PT5M",
    about: {
      "@type": "Thing",
      name: quiz.category,
    },
    provider: {
      "@type": "Organization",
      name: "UpForge",
      url: BASE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "UpForge", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Challenges", item: `${BASE_URL}/quiz` },
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ],
  };

  // Never send the answer key to the browser.
  const cleanQuiz = {
    slug: quiz.slug,
    title: quiz.title,
    description: quiz.description ?? "",
    category: quiz.category,
    duration: quiz.duration || quiz.time || "3–5 Minutes",
    badge: quiz.badge,
    credentialTier: quiz.metrics?.credentialTier || "UpForge Credential",
    image: quiz.image,
    questions: (quiz.questions || []).map((question) => ({
      id: question.id,
      question: question.question,
      options: question.options,
      explanation: question.explanation,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <QuizDetailClient quiz={cleanQuiz} />
    </>
  );
}
