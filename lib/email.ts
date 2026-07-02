import "server-only";
import { Resend } from "resend";

/**
 * Thin wrapper around the email provider (Resend).
 *
 * The provider SDK lives ONLY here so components/actions never import it
 * directly and swapping providers is a one-file change.
 *
 * If RESEND_API_KEY is not set (e.g. a fresh clone with no .env.local), we
 * log the payload and return success so the site is fully functional in
 * development without any external configuration.
 */

const apiKey = process.env.RESEND_API_KEY;
const FROM = process.env.CONTACT_FROM ?? "Tropella <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO ?? "hello@tropella.com";

const resend = apiKey ? new Resend(apiKey) : null;

type SendArgs = {
  subject: string;
  /** Plain-text body; rendered as <pre>-style HTML if no html provided. */
  text: string;
  /** Reply-To so replies go straight to the enquirer. */
  replyTo?: string;
};

export async function sendMail({ subject, text, replyTo }: SendArgs) {
  if (!resend) {
    // Dev fallback — no provider configured.
    console.info(
      `[email:dev] RESEND_API_KEY not set. Would send to ${TO}\n` +
        `Subject: ${subject}\nReply-To: ${replyTo ?? "—"}\n\n${text}`,
    );
    return { ok: true as const, delivered: false as const };
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    subject,
    text,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    console.error("[email] send failed:", error);
    return { ok: false as const, delivered: false as const };
  }

  return { ok: true as const, delivered: true as const };
}
