"use client";

import { useActionState } from "react";
import {
  subscribeNewsletter,
  type NewsletterState,
} from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";

const INITIAL: NewsletterState = { status: "idle" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    INITIAL,
  );

  if (state.status === "success") {
    return (
      <p
        role="status"
        aria-live="polite"
        className="text-[16px] font-semibold text-leaf"
      >
        {state.message}
      </p>
    );
  }

  return (
    <>
      <form
        action={formAction}
        className="mx-auto flex max-w-[460px] flex-wrap justify-center gap-[10px]"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="you@email.com"
          aria-label="Email address"
          className="min-w-[220px] flex-1 rounded-full border border-input bg-canvas/60 px-[22px] py-[14px] text-[15px] text-ink outline-none placeholder:text-ink-dim focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-brand/25"
        />
        <Button
          type="submit"
          variant="brand"
          size="pillLg"
          disabled={pending}
          className="w-full sm:w-auto"
        >
          {pending ? "Subscribing…" : "Subscribe"}
        </Button>
      </form>
      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="mt-3 text-[14px] font-semibold text-brand-deep"
        >
          {state.message}
        </p>
      )}
    </>
  );
}
