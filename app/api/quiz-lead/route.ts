import { NextRequest, NextResponse } from "next/server";
import { adminAddDocument } from "@/lib/firebase-admin";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.email) {
      return NextResponse.json({ success: false, error: "Missing email" }, { status: 400 });
    }

    // Server-side authenticated write (matches comments/leaderboard pattern)
    const doc = await adminAddDocument("quiz_leads", {
      email: String(body.email || ""),
      name: String(body.name || ""),
      quizSlug: String(body.quizSlug || ""),
      score: Number(body.score || 0),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, lead: doc });
  } catch (err: any) {
    console.error("Quiz lead submission error:", err);
    return NextResponse.json({ success: false, error: err.message || "Failed to save lead" }, { status: 500 });
  }
}
