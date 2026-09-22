const windows = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_KEYS = 5000;

function prune(now: number) {
  if (windows.size < MAX_KEYS) return;

  for (const [key, value] of windows) {
    if (value.resetAt <= now) windows.delete(key);
  }

  if (windows.size < MAX_KEYS) return;

  const firstKey = windows.keys().next().value;
  if (firstKey) windows.delete(firstKey);
}

export function getClientIp(req: Request) {
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.slice(0, 80);

  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim().slice(0, 80);

  return "unknown";
}

export function allowRateLimitedRequest(
  key: string,
  limit: number,
  windowMs = WINDOW_MS
) {
  const now = Date.now();
  prune(now);

  const current = windows.get(key);

  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  windows.set(key, current);

  return { allowed: true, retryAfterSeconds: 0 };
}
