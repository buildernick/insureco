/**
 * Rate Limiter — Forgot Password
 *
 * Applies two layers of rate limiting to POST /auth/forgot-password:
 *
 *   1. Per-IP  — max 5 requests per 15 minutes
 *   2. Per-email — max 3 requests per 15 minutes (keyed from the request body)
 *
 * This prevents the endpoint from being used as a spam relay and limits
 * brute-force token fishing. Uses an in-process store by default; swap
 * `store` for a Redis-backed store (rate-limit-redis) in production so
 * limits are shared across multiple server instances.
 */

import rateLimit from 'express-rate-limit';

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export const ipRateLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

export const emailRateLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: 3,
  keyGenerator: (req) => (req.body?.email ?? req.ip).toLowerCase(),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests for this email. Please try again later.' },
});
