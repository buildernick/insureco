/**
 * Magic Link Service
 *
 * Responsible for generating a cryptographically secure one-time token,
 * storing it in the database with a TTL, and building the sign-in URL
 * that will be embedded in the email.
 */

import crypto from 'crypto';
import db from '../db/client.js';

const TOKEN_TTL_MINUTES = 15;

/**
 * Generates a secure random token for the given email address,
 * persists it to the `magic_link_tokens` table, and returns it.
 *
 * @param {string} email
 * @returns {Promise<string>} The raw token string
 */
export async function generateMagicLinkToken(email) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000);

  await db.query(
    `INSERT INTO magic_link_tokens (email, token, expires_at, used)
     VALUES ($1, $2, $3, false)
     ON CONFLICT (email) DO UPDATE
       SET token = EXCLUDED.token,
           expires_at = EXCLUDED.expires_at,
           used = false`,
    [email, token, expiresAt]
  );

  return token;
}

/**
 * Validates an incoming token from a magic-link click.
 * Returns the associated email if valid, or null if expired/used/unknown.
 *
 * @param {string} token
 * @returns {Promise<string|null>} email or null
 */
export async function validateMagicLinkToken(token) {
  const result = await db.query(
    `SELECT email, expires_at, used
     FROM magic_link_tokens
     WHERE token = $1`,
    [token]
  );

  const row = result.rows[0];
  if (!row || row.used || new Date(row.expires_at) < new Date()) {
    return null;
  }

  await db.query(
    `UPDATE magic_link_tokens SET used = true WHERE token = $1`,
    [token]
  );

  return row.email;
}
