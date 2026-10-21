import { NextRequest, NextResponse } from "next/server";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const memoryStore: RateLimitStore = {};

// Clean up expired entries every 5 minutes to prevent memory leak
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const key in memoryStore) {
      if (memoryStore[key].resetTime <= now) {
        delete memoryStore[key];
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitOptions {
  limit?: number; // Maximum allowed requests
  windowMs?: number; // Time window in milliseconds
}

export function checkRateLimit(
  req: NextRequest,
  options: RateLimitOptions = {}
): { isRateLimited: boolean; remaining: number; reset: number } {
  const limit = options.limit || 60;
  const windowMs = options.windowMs || 60 * 1000;

  // Extract client IP address
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  const path = req.nextUrl.pathname;
  const key = `${ip}:${path}`;

  const now = Date.now();
  const entry = memoryStore[key];

  if (!entry || entry.resetTime <= now) {
    memoryStore[key] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return {
      isRateLimited: false,
      remaining: limit - 1,
      reset: Math.ceil(windowMs / 1000),
    };
  }

  entry.count += 1;
  const remaining = Math.max(0, limit - entry.count);
  const reset = Math.ceil((entry.resetTime - now) / 1000);

  if (entry.count > limit) {
    return {
      isRateLimited: true,
      remaining: 0,
      reset,
    };
  }

  return {
    isRateLimited: false,
    remaining,
    reset,
  };
}

export function rateLimitResponse(resetSeconds: number) {
  return NextResponse.json(
    {
      error: "Too many requests. Please try again later.",
      retryAfter: resetSeconds,
    },
    {
      status: 429,
      headers: {
        "Retry-After": resetSeconds.toString(),
      },
    }
  );
}
