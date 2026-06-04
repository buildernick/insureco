/**
 * Token Utilities
 *
 * Generates cryptographically secure random tokens and produces
 * a SHA-256 hash for safe database storage. The raw token is sent
 * to the user once; only the hash is persisted so a database leak
 * cannot yield valid sign-in links.
 */

import crypto from 'crypto';

const TOKEN_BYTES = 32; // 256 bits of entropy

/**
 * Generates a URL-safe random token.
 * @returns {string} hex-encoded raw token (sent to user in the magic link)
 */
export function generateRawToken() {
  return crypto.randomBytes(TOKEN_BYTES).toString('hex');
}

/**
 * Derives a SHA-256 hash of the raw token for database storage.
 * @param {string} rawToken
 * @returns {string} hex-encoded hash
 */
export function hashToken(rawToken) {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

/**
 * Compares an incoming raw token against a stored hash in constant time
 * to prevent timing-based enumeration attacks.
 * @param {string} rawToken
 * @param {string} storedHash
 * @returns {boolean}
 */
export function verifyToken(rawToken, storedHash) {
  const incomingHash = hashToken(rawToken);
  const incomingBuf = Buffer.from(incomingHash, 'hex');
  const storedBuf = Buffer.from(storedHash, 'hex');

  if (incomingBuf.length !== storedBuf.length) return false;
  return crypto.timingSafeEqual(incomingBuf, storedBuf);
}
