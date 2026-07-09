/**
 * POST /api/auth/forgot-password
 *
 * Accepts an email address, generates a one-time magic link token,
 * persists it, and dispatches the email. Always responds 200 so we
 * don't leak whether an address exists in the system.
 */

import { generateMagicLinkToken } from '../services/magicLinkService.js';
import { sendMagicLinkEmail } from '../services/emailService.js';

export default async function forgotPasswordHandler(req, res) {
  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  try {
    const token = await generateMagicLinkToken(email);
    await sendMagicLinkEmail({ to: email, token });
  } catch (err) {
    // Log internally but swallow the error — the client should not know
    // whether the address is registered.
    console.error('[forgot-password] error generating or sending magic link:', err);
  }

  // Always return 200 to prevent email enumeration
  return res.status(200).json({
    message: 'If that address is in our system, a magic link has been sent.',
  });
}
