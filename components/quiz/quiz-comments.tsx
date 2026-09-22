"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CheckCircle2,
  MessageSquare,
  Send,
} from "lucide-react";

interface CommentItem {
  id?: string;
  author: string;
  comment: string;
  userRole?: "Founder" | "Student" | string;
  company?: string;
  displayRole?: string;
  createdAt?: string;
  source?: "firebase" | "seed" | "local";
}

interface PendingComment {
  clientId: string;
  quizSlug: string;
  author: string;
  userRole: "Founder" | "Student";
  company: string;
  comment: string;
}

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

const FOUNDER_NOTES = [
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

function hashString(value: string) {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function pick<T>(items: T[], seed: number) {
  return items[
    Math.abs(seed) % items.length
  ];
}

function getSlugAngles(slug: string) {
  const value = slug
    .toLowerCase()
    .replace(/[-_]+/g, " ");

  if (
    value.includes("ai") ||
    value.includes("tech") ||
    value.includes("machine")
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
    value.includes("marketing") ||
    value.includes("growth")
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
    value.includes("career") ||
    value.includes("leadership") ||
    value.includes("interview")
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
    value.includes("fund") ||
    value.includes("invest") ||
    value.includes("venture")
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
    value.includes("startup") ||
    value.includes("founder") ||
    value.includes("business")
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

function createInstantStarterComments(
  quizSlug: string,
): CommentItem[] {
  const seed = hashString(quizSlug);
  const angles = getSlugAngles(quizSlug);

  /*
   * These are generated locally.
   *
   * IMPORTANT:
   * They are immediately available on first paint.
   * No API/Firebase request is required to display them.
   */
  return Array.from(
    { length: 10 },
    (_, index) => {
      const localSeed =
        seed + index * 7919;

      const angle = pick(
        angles,
        localSeed,
      );

      const isFounder =
        index === 3;

      if (isFounder) {
        const founder =
          FOUNDER_NOTES[
            seed % 2
          ];

        const template =
          pick(
            FOUNDER_TEMPLATES,
            localSeed + 17,
          );

        return {
          id: `instant_${quizSlug}_${index}`,
          author: founder.author,
          company: founder.company,
          userRole: "Founder",
          displayRole:
            `Founder @ ${founder.company}`,
          comment:
            template.replace(
              "{angle}",
              angle,
            ),
          source: "seed",
        };
      }

      const name = pick(
        STUDENT_NAMES,
        localSeed + 31,
      );

      const location = pick(
        LOCATIONS,
        localSeed + 53,
      );

      const template = pick(
        STARTER_TEMPLATES,
        localSeed + 71,
      );

      return {
        id: `instant_${quizSlug}_${index}`,
        author: name,
        userRole: "Student",
        displayRole:
          `Student · ${location}`,
        comment:
          template.replace(
            "{angle}",
            angle,
          ),
        source: "seed",
      };
    },
  );
}

function makeClientId() {
  try {
    if (
      typeof crypto !==
        "undefined" &&
      "randomUUID" in crypto
    ) {
      return crypto.randomUUID();
    }
  } catch {}

  return `${Date.now()}_${Math.random()
    .toString(36)
    .slice(2)}`;
}

async function readJson(
  response: Response,
) {
  const contentType =
    response.headers.get(
      "content-type",
    ) || "";

  if (
    !contentType.includes(
      "application/json",
    )
  ) {
    throw new Error(
      "Invalid community response.",
    );
  }

  return response.json();
}

function formatDate(
  value?: string,
) {
  if (!value) return "";

  const timestamp =
    new Date(value).getTime();

  if (!Number.isFinite(timestamp)) {
    return "";
  }

  const diff = Math.max(
    0,
    Date.now() - timestamp,
  );

  const minutes = Math.floor(
    diff / 60000,
  );

  if (minutes < 1) return "just now";
  if (minutes < 60)
    return `${minutes}m ago`;

  const hours = Math.floor(
    minutes / 60,
  );

  if (hours < 24)
    return `${hours}h ago`;

  const days = Math.floor(
    hours / 24,
  );

  if (days < 7)
    return `${days}d ago`;

  return new Date(
    value,
  ).toLocaleDateString(
    undefined,
    {
      day: "numeric",
      month: "short",
    },
  );
}

export default function QuizComments({
  quizSlug,
}: {
  quizSlug: string;
}) {
  /*
   * THIS IS THE IMPORTANT PART.
   *
   * The discussion is NOT initialized as [].
   * It starts with local starter notes immediately.
   *
   * Therefore:
   *
   * page render
   *      ↓
   * starter notes immediately
   *      ↓
   * API in background
   *      ↓
   * real Firebase notes merged
   */
  const initialComments = useMemo(
    () =>
      createInstantStarterComments(
        quizSlug,
      ),
    [quizSlug],
  );

  const [comments, setComments] =
    useState<CommentItem[]>(
      initialComments,
    );

  const [author, setAuthor] =
    useState("");

  const [userRole, setUserRole] =
    useState<
      "Founder" | "Student"
    >("Student");

  const [company, setCompany] =
    useState("");

  const [commentText, setCommentText] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [visibleCount, setVisibleCount] =
    useState(8);

  const loadedRef =
    useRef(false);

  const storageKey =
    `upforge:quiz-comments:${quizSlug}`;

  const outboxKey =
    `upforge:quiz-comment-outbox:${quizSlug}`;

  const saveCache = useCallback(
    (items: CommentItem[]) => {
      try {
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({
            savedAt: Date.now(),
            comments:
              items.slice(0, 50),
          }),
        );
      } catch {}
    },
    [storageKey],
  );

  const readOutbox =
    useCallback((): PendingComment[] => {
      try {
        const raw =
          localStorage.getItem(
            outboxKey,
          );

        if (!raw) return [];

        const parsed =
          JSON.parse(raw);

        return Array.isArray(
          parsed,
        )
          ? parsed
          : [];
      } catch {
        return [];
      }
    }, [outboxKey]);

  const writeOutbox =
    useCallback(
      (
        items: PendingComment[],
      ) => {
        try {
          if (!items.length) {
            localStorage.removeItem(
              outboxKey,
            );
            return;
          }

          localStorage.setItem(
            outboxKey,
            JSON.stringify(
              items.slice(0, 5),
            ),
          );
        } catch {}
      },
      [outboxKey],
    );

  const mergeComments =
    useCallback(
      (
        incoming: CommentItem[],
      ) => {
        setComments(
          (current) => {
            const combined = [
              ...incoming,
              ...current,
            ];

            const seen =
              new Set<string>();

            const result =
              combined.filter(
                (item) => {
                  const key =
                    item.id ||
                    `${item.author}:${item.comment}`;

                  if (
                    seen.has(key)
                  ) {
                    return false;
                  }

                  seen.add(key);
                  return true;
                },
              );

            const next =
              result.slice(0, 50);

            saveCache(next);

            return next;
          },
        );
      },
      [saveCache],
    );

  const syncOutbox =
    useCallback(async () => {
      const pending =
        readOutbox();

      if (!pending.length) {
        return;
      }

      const remaining: PendingComment[] =
        [];

      for (const item of pending) {
        try {
          const response =
            await fetch(
              "/api/quiz/comments",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                  "x-upforge-domain":
                    "quiz",
                },
                body: JSON.stringify(
                  {
                    ...item,
                    website: "",
                  },
                ),
                keepalive: true,
              },
            );

          const data =
            await readJson(
              response,
            );

          if (
            !response.ok ||
            !data?.success
          ) {
            throw new Error();
          }

          if (data.comment) {
            setComments(
              (current) => {
                const next =
                  [
                    data.comment,
                    ...current.filter(
                      (entry) =>
                        entry.id !==
                        `local_${item.clientId}`,
                    ),
                  ].slice(0, 50);

                saveCache(next);

                return next;
              },
            );
          }
        } catch {
          remaining.push(item);
        }
      }

      writeOutbox(
        remaining,
      );
    }, [
      readOutbox,
      saveCache,
      writeOutbox,
    ]);

  const loadRemote =
    useCallback(async () => {
      /*
       * No loading state here.
       *
       * Starter discussion is already visible.
       */
      try {
        const response =
          await fetch(
            `/api/quiz/comments?quizSlug=${encodeURIComponent(
              quizSlug,
            )}`,
            {
              headers: {
                "x-upforge-domain":
                  "quiz",
              },

              /*
               * Browser may reuse its previous
               * response, but this never blocks
               * starter rendering.
               */
              cache: "force-cache",
            },
          );

        const data =
          await readJson(
            response,
          );

        if (
          Array.isArray(
            data?.comments,
          )
        ) {
          mergeComments(
            data.comments,
          );
        }
      } catch {
        /*
         * Silent by design.
         *
         * The starter discussion is already
         * visible, so a network failure is
         * invisible to the visitor.
         */
      }

      /*
       * Member comments waiting locally
       * are synced after the initial GET.
       */
      window.setTimeout(
        () => {
          void syncOutbox();
        },
        300,
      );
    }, [
      mergeComments,
      quizSlug,
      syncOutbox,
    ]);

  useEffect(() => {
    if (loadedRef.current) {
      return;
    }

    loadedRef.current = true;

    /*
     * 1. Restore cached comments if available.
     * 2. Immediately start remote request.
     * 3. Never replace UI with blank/loading state.
     */
    try {
      const cached =
        sessionStorage.getItem(
          storageKey,
        );

      if (cached) {
        const parsed =
          JSON.parse(cached);

        if (
          parsed?.savedAt &&
          Date.now() -
            parsed.savedAt <
            5 * 60 * 1000 &&
          Array.isArray(
            parsed.comments,
          )
        ) {
          setComments(
            parsed.comments,
          );
        }
      }
    } catch {}

    void loadRemote();

    const retry =
      () => {
        void syncOutbox();
      };

    window.addEventListener(
      "online",
      retry,
    );

    const timer =
      window.setInterval(
        retry,
        20_000,
      );

    return () => {
      window.removeEventListener(
        "online",
        retry,
      );

      window.clearInterval(
        timer,
      );
    };
  }, [
    loadRemote,
    storageKey,
    syncOutbox,
  ]);

  const handleSubmit =
    async (
      event: React.FormEvent,
    ) => {
      event.preventDefault();

      if (
        !author.trim() ||
        !commentText.trim()
      ) {
        return;
      }

      if (
        userRole === "Founder" &&
        !company.trim()
      ) {
        return;
      }

      const payload: PendingComment =
        {
          clientId:
            makeClientId(),

          quizSlug,

          author: author
            .trim()
            .replace(
              /\s+/g,
              " ",
            )
            .slice(0, 50),

          userRole,

          company: company
            .trim()
            .replace(
              /\s+/g,
              " ",
            )
            .slice(0, 80),

          comment: commentText
            .trim()
            .replace(
              /\s+/g,
              " ",
            )
            .slice(0, 500),
        };

      const optimistic: CommentItem =
        {
          id: `local_${payload.clientId}`,
          author:
            payload.author,
          comment:
            payload.comment,
          userRole:
            payload.userRole,
          company:
            payload.company,
          displayRole:
            payload.userRole ===
            "Founder"
              ? `Founder @ ${payload.company}`
              : "Student",
          createdAt:
            new Date().toISOString(),
          source: "local",
        };

      const next =
        [
          optimistic,
          ...comments,
        ].slice(0, 50);

      setComments(next);
      saveCache(next);

      const outbox =
        readOutbox();

      writeOutbox([
        ...outbox,
        payload,
      ]);

      setCommentText("");
      setCompany("");
      setSubmitting(true);

      /*
       * Try Firebase immediately,
       * but UI does NOT depend on it.
       */
      try {
        const response =
          await fetch(
            "/api/quiz/comments",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
                "x-upforge-domain":
                  "quiz",
              },
              body: JSON.stringify(
                {
                  ...payload,
                  website: "",
                },
              ),
              keepalive: true,
            },
          );

        const data =
          await readJson(
            response,
          );

        if (
          response.ok &&
          data?.success
        ) {
          if (data.comment) {
            setComments(
              (current) => {
                const updated =
                  [
                    data.comment,
                    ...current.filter(
                      (item) =>
                        item.id !==
                        optimistic.id,
                    ),
                  ].slice(0, 50);

                saveCache(
                  updated,
                );

                return updated;
              },
            );
          }

          writeOutbox(
            readOutbox().filter(
              (item) =>
                item.clientId !==
                payload.clientId,
            ),
          );
        }
      } catch {
        /*
         * Completely silent.
         *
         * Local outbox keeps the note and
         * retries automatically.
         */
      } finally {
        setSubmitting(false);
      }
    };

  const visibleComments =
    comments.slice(
      0,
      visibleCount,
    );

  return (
    <section className="rounded-2xl border border-[var(--glass-border)] bg-card p-5 shadow-sm sm:p-7">
      <div className="flex flex-wrap items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10 text-accent-gold">
          <MessageSquare className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent-gold">
            Community
          </p>

          <h3 className="mt-1 text-xl font-bold text-foreground">
            Founder & Student Discussion
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Practical takes, questions and lessons around this challenge.
          </p>
        </div>

        <span className="ml-auto rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
          {comments.length} notes
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-5 space-y-3"
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[10000px] h-px w-px opacity-0"
          defaultValue=""
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_190px]">
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(event) =>
              setAuthor(
                event.target.value,
              )
            }
            maxLength={50}
            required
            className="w-full rounded-xl border border-[var(--glass-border)] bg-background px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/10"
          />

          <select
            value={userRole}
            onChange={(event) =>
              setUserRole(
                event.target
                  .value as
                  | "Founder"
                  | "Student",
              )
            }
            className="w-full rounded-xl border border-[var(--glass-border)] bg-background px-3.5 py-3 text-sm font-semibold text-foreground outline-none transition focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/10"
          >
            <option value="Student">
              Student
            </option>

            <option value="Founder">
              Founder
            </option>
          </select>
        </div>

        {userRole ===
          "Founder" && (
          <input
            type="text"
            placeholder="Company name *"
            value={company}
            onChange={(event) =>
              setCompany(
                event.target.value,
              )
            }
            maxLength={80}
            required
            className="w-full rounded-xl border border-[var(--glass-border)] bg-background px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/10"
          />
        )}

        <textarea
          rows={4}
          placeholder="Share an insight from this challenge..."
          value={commentText}
          onChange={(event) =>
            setCommentText(
              event.target.value,
            )
          }
          maxLength={500}
          required
          className="w-full resize-none rounded-xl border border-[var(--glass-border)] bg-background p-3.5 text-sm text-foreground outline-none transition focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/10"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Your note appears instantly and syncs in the background.
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-gold px-5 py-3 text-xs font-black text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />

            {submitting
              ? "Saving…"
              : "Post insight"}
          </button>
        </div>
      </form>

      <div className="mt-5 space-y-3">
        {visibleComments.map(
          (item, index) => {
            const starter =
              item.source ===
              "seed";

            const local =
              item.source ===
              "local";

            return (
              <article
                key={
                  item.id ||
                  `${item.author}-${index}`
                }
                className={`rounded-2xl border p-4 ${
                  local
                    ? "border-accent-gold/30 bg-accent-gold/[0.04]"
                    : "border-[var(--glass-border)] bg-muted/30"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-foreground">
                    {item.author}
                  </span>

                  <span className="rounded-full bg-accent-gold/10 px-2.5 py-1 text-[11px] font-bold text-accent-gold">
                    {item.displayRole ||
                      (item.userRole ===
                      "Founder"
                        ? `Founder @ ${
                            item.company ||
                            "Company"
                          }`
                        : "Student")}
                  </span>

                  {starter && (
                    <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                      Starter note
                    </span>
                  )}

                  {local && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-gold/10 px-2.5 py-1 text-[10px] font-semibold text-accent-gold">
                      <CheckCircle2 className="h-3 w-3" />
                      Saved
                    </span>
                  )}

                  {!starter &&
                    !local &&
                    item.createdAt && (
                      <span className="ml-auto text-[11px] text-muted-foreground">
                        {formatDate(
                          item.createdAt,
                        )}
                      </span>
                    )}
                </div>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.comment}
                </p>
              </article>
            );
          },
        )}

        {visibleCount <
          comments.length && (
          <button
            type="button"
            onClick={() =>
              setVisibleCount(
                (count) =>
                  count + 8,
              )
            }
            className="w-full rounded-xl border border-[var(--glass-border)] bg-background px-4 py-3 text-xs font-bold text-foreground transition hover:border-accent-gold/40 hover:bg-muted"
          >
            Show more discussion
          </button>
        )}
      </div>
    </section>
  );
}
