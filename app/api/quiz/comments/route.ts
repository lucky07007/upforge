import { NextRequest, NextResponse } from "next/server";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import {
  adminAddDocument,
  adminListDocuments,
} from "@/lib/firebase-admin";
import {
  allowRateLimitedRequest,
  getClientIp,
} from "@/lib/quiz-rate-limit";

type CommentItem = {
  id?: string;
  author: string;
  comment: string;
  userRole?: "Founder" | "Student" | string;
  company?: string;
  displayRole?: string;
  createdAt?: string;
  source?: "firebase" | "seed";
};

type CachedComments = {
  expiresAt: number;
  comments: CommentItem[];
};

const commentCache =
  new Map<string, CachedComments>();

const CACHE_MS = 60_000;

/*
 * IMPORTANT PERFORMANCE SETTINGS
 *
 * Firebase:
 *   maximum 4 reads
 *
 * Starter:
 *   generated locally
 *
 * Public response:
 *   cached by Cloudflare/browser
 */
const FIREBASE_READ_LIMIT = 4;
const STARTER_COUNT = 40;

const STUDENT_NAMES = [
  "Aarav S.",
  "Meera K.",
  "Rohan M.",
  "Ananya P.",
  "Ishaan R.",
  "Kavya N.",
  "Dev A.",
  "Nisha V.",
  "Yash T.",
  "Riya S.",
  "Aditya K.",
  "Sana M.",
  "Vihaan P.",
  "Priya R.",
  "Karan D.",
  "Simran J.",
  "Arjun B.",
  "Neha G.",
  "Rahul P.",
  "Tanya S.",
];

const LOCATIONS = [
  "Bengaluru",
  "Delhi NCR",
  "Mumbai",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Jaipur",
  "Ahmedabad",
  "Indore",
];

const FOUNDERS = [
  {
    author: "Sumit",
    company: "Arjuna AI",
  },
  {
    author: "Lucky Tiwari",
    company: "UpForge",
  },
];

const GENERIC_ANGLES = [
  "making the decision practical",
  "understanding the trade-off",
  "looking at the problem before the solution",
  "using evidence instead of assumptions",
  "thinking about the user outcome",
  "measuring what happens after the decision",
  "keeping the fundamentals clear",
  "turning the idea into an actual next step",
];

const STARTER_TEMPLATES = [
  "The {angle} part was a good reminder that the obvious answer is not always the useful one.",

  "I liked that this challenge tested {angle} instead of just definitions. It made me slow down before choosing.",

  "The question around {angle} felt especially practical. This is the kind of thing that shows up outside a textbook.",

  "One takeaway for me was to treat {angle} as a decision, not just a buzzword.",

  "The {angle} scenario was simple on the surface, but the trade-off is easy to miss when moving fast.",

  "I would actually use the {angle} idea in a real project. Short challenge, useful takeaway.",

  "Good reminder on {angle}. It is easy to optimise the visible number and miss what is causing it.",

  "The best part was how {angle} was connected to an actual situation rather than memorisation.",

  "I got this one wrong on my first instinct. The reasoning around {angle} made it much clearer.",

  "This challenge made me think about {angle} a little differently. The practical framing worked well.",

  "For me, the useful lesson was that {angle} needs context. The number alone does not tell the whole story.",

  "The operator-style framing around {angle} felt closer to a real decision than a typical quiz question.",

  "The {angle} scenario is something I can imagine discussing with a team. Nice balance between speed and depth.",

  "A small point, but {angle} is exactly where people tend to jump to conclusions. Good test of judgment.",

  "Finished this in a few minutes and still wrote down a note about {angle}. That is probably the best sign that the questions worked.",

  "The challenge is short, but {angle} gave it enough depth to make the result useful.",

  "I would revisit the {angle} question after a month. It is one of those decisions that changes with experience.",

  "The practical angle on {angle} was stronger than the usual theory-heavy questions.",

  "The wording around {angle} was clear. I did not need to guess what the question was really asking.",

  "My main takeaway: slow down when {angle} is involved. The first answer can be misleading.",
];

const FOUNDER_TEMPLATES = [
  "Useful framing on {angle}. In practice, the hard part is usually getting the team to agree on what evidence matters before acting.",

  "I liked the emphasis on {angle}. Early teams often move quickly, but decision quality still depends on asking the right question first.",

  "Good operator-level question on {angle}. The important part is not the terminology; it is what decision you make with the information.",

  "The {angle} scenario is close to the kind of trade-off founders actually face. Short challenge, solid reminder.",

  "For {angle}, I would always look at the context behind the number before making the call. Good inclusion in the assessment.",

  "The challenge keeps coming back to first principles, especially around {angle}. That is a useful habit for any builder.",
];

function publicJson(
  data: unknown,
  status = 200,
) {
  return NextResponse.json(
    data,
    {
      status,
      headers: {
        "Cache-Control":
          "public, max-age=30, stale-while-revalidate=120, stale-if-error=600",

        "CDN-Cache-Control":
          "public, max-age=30, stale-while-revalidate=120, stale-if-error=600",
      },
    },
  );
}

function noStoreJson(
  data: unknown,
  status = 200,
) {
  return NextResponse.json(
    data,
    {
      status,
      headers: {
        "Cache-Control":
          "no-store, max-age=0",
      },
    },
  );
}

function hashString(
  value: string,
) {
  let hash = 2166136261;

  for (
    let i = 0;
    i < value.length;
    i += 1
  ) {
    hash ^= value.charCodeAt(i);

    hash = Math.imul(
      hash,
      16777619,
    );
  }

  return hash >>> 0;
}

function pick<T>(
  items: T[],
  seed: number,
) {
  return items[
    Math.abs(seed) %
      items.length
  ];
}

function getAngles(
  quizSlug: string,
) {
  const slug =
    quizSlug.toLowerCase();

  if (
    slug.includes("ai") ||
    slug.includes("tech") ||
    slug.includes("machine")
  ) {
    return [
      "giving AI better context",
      "verifying AI output",
      "human-in-the-loop workflows",
      "data privacy",
      "critical thinking",
      "AI hallucinations",
      "machine learning",
      "using technology responsibly",
    ];
  }

  if (
    slug.includes("marketing") ||
    slug.includes("growth")
  ) {
    return [
      "customer acquisition",
      "conversion rate",
      "target audience",
      "customer journey",
      "content",
      "retention",
      "positioning",
      "measuring growth",
    ];
  }

  if (
    slug.includes("career") ||
    slug.includes("leadership") ||
    slug.includes("interview")
  ) {
    return [
      "showing real work",
      "professional communication",
      "taking ownership",
      "learning from feedback",
      "building a useful portfolio",
      "decision making",
      "professional networking",
      "continuous upskilling",
    ];
  }

  if (
    slug.includes("fund") ||
    slug.includes("invest") ||
    slug.includes("venture")
  ) {
    return [
      "dilution",
      "investor fit",
      "ownership",
      "cap tables",
      "due diligence",
      "valuation",
      "fundraising strategy",
      "capital allocation",
    ];
  }

  if (
    slug.includes("startup") ||
    slug.includes("founder") ||
    slug.includes("business")
  ) {
    return [
      "customer validation",
      "unit economics",
      "runway",
      "customer retention",
      "market size",
      "product feedback",
      "conversion rate",
      "making the decision practical",
    ];
  }

  return GENERIC_ANGLES;
}

function createStarterComments(
  quizSlug: string,
) {
  const seed =
    hashString(quizSlug);

  const angles =
    getAngles(quizSlug);

  const comments: CommentItem[] =
    [];

  for (
    let index = 0;
    index < STARTER_COUNT;
    index += 1
  ) {
    const localSeed =
      seed + index * 7919;

    const angle =
      pick(
        angles,
        localSeed,
      );

    /*
     * Exactly two founder voices.
     *
     * Everything else is student discussion.
     */
    const isFounder =
      index === 7 ||
      index === 29;

    if (isFounder) {
      const founder =
        FOUNDERS[
          index === 7 ? 0 : 1
        ];

      const template =
        pick(
          FOUNDER_TEMPLATES,
          localSeed + 17,
        );

      comments.push({
        id: `seed_${quizSlug}_founder_${index}`,

        author:
          founder.author,

        company:
          founder.company,

        userRole:
          "Founder",

        displayRole:
          `Founder @ ${founder.company}`,

        comment:
          template.replace(
            "{angle}",
            angle,
          ),

        source: "seed",
      });

      continue;
    }

    const name =
      pick(
        STUDENT_NAMES,
        localSeed + 31,
      );

    const location =
      pick(
        LOCATIONS,
        localSeed + 53,
      );

    const template =
      pick(
        STARTER_TEMPLATES,
        localSeed + 71,
      );

    comments.push({
      id: `seed_${quizSlug}_student_${index}`,

      author: name,

      userRole:
        "Student",

      displayRole:
        `Student · ${location}`,

      comment:
        template.replace(
          "{angle}",
          angle,
        ),

      source: "seed",
    });
  }

  return comments;
}

function normalizeForModeration(
  value: string,
) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .replace(/[@4]/g, "a")
    .replace(/[3]/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/[0]/g, "o")
    .replace(/[5$]/g, "s")
    .replace(/[7]/g, "t")
    .replace(
      /[^a-z0-9]+/g,
      " ",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}

const ABUSE_TERMS = [
  "fuck",
  "fucking",
  "motherfucker",
  "shit",
  "bitch",
  "bastard",
  "asshole",
  "dumbass",
  "stfu",
  "chutiya",
  "chutia",
  "madarchod",
  "madharchod",
  "bhenchod",
  "behenchod",
  "bc",
  "mc",
  "gandu",
  "gaand",
  "harami",
  "kamina",
  "kamine",
];

function containsAbuse(
  value: string,
) {
  const normalized =
    normalizeForModeration(
      value,
    );

  return ABUSE_TERMS.some(
    (term) => {
      const escaped =
        term.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );

      return new RegExp(
        `(?:^|\\s)${escaped}(?:$|\\s)`,
        "i",
      ).test(
        normalized,
      );
    },
  );
}

function cleanText(
  value: unknown,
  max: number,
) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function mergeComments(
  starter: CommentItem[],
  firebase: CommentItem[],
) {
  const result: CommentItem[] =
    [];

  const seen =
    new Set<string>();

  /*
   * Real member comments first.
   * Starter comments fill the feed.
   */
  for (
    const item of [
      ...firebase,
      ...starter,
    ]
  ) {
    const key =
      item.id ||
      `${item.author}:${item.comment}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(item);
  }

  return result.slice(
    0,
    50,
  );
}

export async function GET(
  req: NextRequest,
) {
  const quizSlug =
    new URL(
      req.url,
    ).searchParams.get(
      "quizSlug",
    ) ||
    "startup-iq-challenge-2026";

  const quiz =
    QUIZ_REGISTRY.find(
      (item) =>
        item.slug ===
        quizSlug,
    );

  if (!quiz) {
    return publicJson(
      {
        success: false,
        comments: [],
        error:
          "Quiz not found.",
      },
      404,
    );
  }

  /*
   * Fast server memory cache.
   *
   * Most requests never touch Firebase.
   */
  const cached =
    commentCache.get(
      quizSlug,
    );

  if (
    cached &&
    cached.expiresAt >
      Date.now()
  ) {
    return publicJson({
      success: true,
      comments:
        cached.comments,
      firebaseReadCount: 0,
      cached: true,
    });
  }

  try {
    /*
     * ONLY 4 FIREBASE DOCUMENTS.
     *
     * Never read 30/50 Firebase docs.
     */
    const docs =
      await adminListDocuments(
        `comments/${quizSlug}/userComments`,
        FIREBASE_READ_LIMIT,
      );

    const firebaseComments =
      docs
        .map(
          (doc: any) => ({
            ...(doc || {}),
            source:
              "firebase" as const,
          }),
        )
        .sort(
          (
            a: CommentItem,
            b: CommentItem,
          ) =>
            new Date(
              b?.createdAt ||
                0,
            ).getTime() -
            new Date(
              a?.createdAt ||
                0,
            ).getTime(),
        )
        .slice(
          0,
          FIREBASE_READ_LIMIT,
        );

    /*
     * 40 starter notes cost ZERO Firebase reads.
     */
    const starter =
      createStarterComments(
        quizSlug,
      );

    const comments =
      mergeComments(
        starter,
        firebaseComments,
      );

    commentCache.set(
      quizSlug,
      {
        expiresAt:
          Date.now() +
          CACHE_MS,
        comments,
      },
    );

    return publicJson({
      success: true,
      comments,
      firebaseReadCount:
        firebaseComments.length,
    });
  } catch (error) {
    console.error(
      "Comments fetch error:",
      error,
    );

    /*
     * Firebase failed?
     *
     * NO 503 to the user.
     * Return starter discussion immediately.
     */
    const starter =
      createStarterComments(
        quizSlug,
      );

    const stale =
      commentCache.get(
        quizSlug,
      );

    return publicJson({
      success: true,

      comments:
        stale?.comments?.length
          ? stale.comments
          : starter,

      firebaseReadCount: 0,

      stale: true,
    });
  }
}

export async function POST(
  req: NextRequest,
) {
  try {
    const contentLength =
      Number(
        req.headers.get(
          "content-length",
        ) || 0,
      );

    if (
      contentLength >
      16 * 1024
    ) {
      return noStoreJson(
        {
          success: false,
          error:
            "Request is too large.",
        },
        413,
      );
    }

    const rate =
      allowRateLimitedRequest(
        `comment:${getClientIp(req)}`,
        10,
      );

    if (!rate.allowed) {
      const response =
        noStoreJson(
          {
            success: false,
            error:
              "Too many posts. Please try again shortly.",
          },
          429,
        );

      response.headers.set(
        "Retry-After",
        String(
          rate.retryAfterSeconds,
        ),
      );

      return response;
    }

    const body =
      await req.json();

    if (
      String(
        body?.website || "",
      ).trim()
    ) {
      return noStoreJson(
        {
          success: false,
          error:
            "Invalid submission.",
        },
        400,
      );
    }

    const quizSlug =
      cleanText(
        body?.quizSlug,
        100,
      );

    const author =
      cleanText(
        body?.author,
        50,
      );

    const userRole =
      cleanText(
        body?.userRole,
        20,
      );

    const company =
      cleanText(
        body?.company,
        80,
      );

    const comment =
      cleanText(
        body?.comment,
        500,
      );

    if (
      !QUIZ_REGISTRY.some(
        (quiz) =>
          quiz.slug ===
          quizSlug,
      )
    ) {
      return noStoreJson(
        {
          success: false,
          error:
            "Quiz not found.",
        },
        404,
      );
    }

    if (
      !author ||
      !comment
    ) {
      return noStoreJson(
        {
          success: false,
          error:
            "Name and comment are required.",
        },
        400,
      );
    }

    if (
      ![
        "Founder",
        "Student",
      ].includes(userRole)
    ) {
      return noStoreJson(
        {
          success: false,
          error:
            "Please select Founder or Student.",
        },
        400,
      );
    }

    if (
      userRole ===
        "Founder" &&
      !company
    ) {
      return noStoreJson(
        {
          success: false,
          error:
            "Company name is required for founders.",
        },
        400,
      );
    }

    if (
      containsAbuse(
        author,
      ) ||
      containsAbuse(
        company,
      ) ||
      containsAbuse(
        comment,
      )
    ) {
      return noStoreJson(
        {
          success: false,
          error:
            "Please remove abusive language and try again.",
        },
        400,
      );
    }

    const payload = {
      author,

      comment,

      userRole,

      company:
        userRole ===
        "Founder"
          ? company
          : "",

      displayRole:
        userRole ===
        "Founder"
          ? `Founder @ ${company}`
          : "Student",

      createdAt:
        new Date().toISOString(),

      likesCount: 0,
    };

    const reverseTimestamp =
      String(
        9_999_999_999_999 -
          Date.now(),
      ).padStart(
        13,
        "0",
      );

    const entropy =
      typeof crypto !==
        "undefined" &&
      "randomUUID" in crypto
        ? crypto
            .randomUUID()
            .replace(
              /-/g,
              "",
            )
            .slice(
              0,
              12,
            )
        : Math.random()
            .toString(36)
            .slice(
              2,
              14,
            );

    const commentId =
      `c_${reverseTimestamp}_${entropy}`;

    const doc =
      await adminAddDocument(
        `comments/${quizSlug}/userComments`,
        payload,
        commentId,
      );

    /*
     * Invalidate only this quiz.
     * Other quiz discussion caches remain hot.
     */
    commentCache.delete(
      quizSlug,
    );

    return noStoreJson(
      {
        success: true,

        comment: {
          ...(doc || {}),
          ...payload,
          source:
            "firebase",
        },
      },
      201,
    );
  } catch (error) {
    console.error(
      "Post comment error:",
      error,
    );

    return noStoreJson(
      {
        success: false,
        error:
          "Could not post your insight right now. Please try again.",
      },
      500,
    );
  }
}
