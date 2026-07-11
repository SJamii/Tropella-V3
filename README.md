This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Email setup (Resend)

The contact and newsletter forms are Server Actions that email **you** (the site
owner) via [Resend](https://resend.com). The enquirer/subscriber is set as
`reply-to`, so you can reply straight from your inbox. Nothing is sent to third
parties.

**Without a `RESEND_API_KEY` the forms still "work" but nothing is delivered** —
`lib/email.ts` logs the payload to the server console (Vercel function logs) and
returns success. This keeps a fresh clone runnable with zero config.

### Environment variables

| Variable | Required | Default | Notes |
|---|---|---|---|
| `RESEND_API_KEY` | Yes, to actually send | — | From the Resend dashboard (`re_…`) |
| `CONTACT_TO` | No | `sjamiiuc@gmail.com` | Inbox that receives submissions |
| `CONTACT_FROM` | No | `Tropella <onboarding@resend.dev>` | Verified sender (see below) |

Copy `.env.example` → `.env.local` for local development.

### Get the API key

1. Sign up at [resend.com](https://resend.com) — **use `sjamiiuc@gmail.com` as the
   account email** (see the sender caveat below). Free tier: 100 emails/day.
2. **API Keys → Create API Key** (Sending access). Copy the key — it's shown once.

### Deploy on Vercel

1. Vercel → project → **Settings → Environment Variables** → add
   `RESEND_API_KEY = re_…` (scope: Production, and Preview if desired).
2. **Redeploy** — env-var changes only take effect on a new deployment.
3. Submit the live contact form and check your inbox (and spam folder).

The easiest way to deploy is the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

### Sender caveat & going to production

The default sender `onboarding@resend.dev` is Resend's shared test address. It
**can only deliver to the email that owns the Resend account** — which is why the
account must be registered with `sjamiiuc@gmail.com` (the `CONTACT_TO` inbox).
Deliverability is also weak (often lands in spam).

For reliable, branded email:

1. Resend → **Domains → Add Domain** (e.g. `tropella.com`).
2. Add the **SPF + DKIM DNS records** at your registrar; wait for "Verified".
3. Set `CONTACT_FROM` to e.g. `Tropella <hello@tropella.com>` in Vercel and redeploy.

This removes the "own email only" limit and lets mail reach any recipient's inbox.
