import { NextRequest } from "next/server";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Cleanup expired entries periodically (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export function getClientIP(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

export function rateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): { success: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, remaining: limit - 1, resetMs: windowMs };
  }

  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetMs: Math.max(0, record.resetTime - now),
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: limit - record.count,
    resetMs: Math.max(0, record.resetTime - now),
  };
}
