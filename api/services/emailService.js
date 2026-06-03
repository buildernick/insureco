/**
 * Email Service
 *
 * Thin wrapper around the transactional email provider (e.g. SendGrid,
 * Postmark, AWS SES). Builds the magic-link email and dispatches it.
 */

import emailProvider from '../integrations/emailProvider.js';

const APP_BASE_URL = process.env.APP_BASE_URL ?? 'https://app.insureco.com';
const FROM_ADDRESS = process.env.MAIL_FROM ?? 'no-reply@insureco.com';

/**
 * Sends a magic-link sign-in email to the specified recipient.
 *
 * @param {{ to: string, token: string }} params
 * @returns {Promise<void>}
 */
export async function sendMagicLinkEmail({ to, token }) {
  const magicLinkUrl = `${APP_BASE_URL}/auth/verify?token=${encodeURIComponent(token)}`;

  await emailProvider.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Your InsureCo sign-in link',
    text: buildPlainText(magicLinkUrl),
    html: buildHtml(magicLinkUrl),
  });
}

function buildPlainText(url) {
  return [
    'Hi,',
    '',
    'Click the link below to sign in to InsureCo. This link expires in 15 minutes and can only be used once.',
    '',
    url,
    '',
    "If you didn't request this, you can safely ignore this email.",
    '',
    '— The InsureCo Team',
  ].join('\n');
}

function buildHtml(url) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="font-family: sans-serif; color: #161616; max-width: 560px; margin: 0 auto; padding: 24px;">
  <img src="${APP_BASE_URL}/logo.png" alt="InsureCo" width="120" style="margin-bottom: 24px;" />
  <h2 style="margin: 0 0 12px;">Sign in to InsureCo</h2>
  <p>Click the button below to sign in. This link expires in <strong>15 minutes</strong> and can only be used once.</p>
  <a href="${url}"
     style="display:inline-block; margin: 20px 0; padding: 12px 24px;
            background:#da1e28; color:#fff; border-radius:4px;
            text-decoration:none; font-weight:600;">
    Sign In
  </a>
  <p style="font-size:12px; color:#525252;">
    If you didn't request this email, no action is needed — your account is safe.
  </p>
</body>
</html>`.trim();
}
