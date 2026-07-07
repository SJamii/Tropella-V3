"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";

const INITIAL: ContactState = { status: "idle" };

const FIELD =
  "w-full rounded-[11px] border border-input bg-field px-[15px] py-[13px] text-[15px] text-ink outline-none transition-colors placeholder:text-ink-dim focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-brand/20";

const LABEL = "text-[13.5px] font-medium text-ink-muted";

const INQUIRY_TYPES = [
  "General Inquiry",
  "Wholesale",
  "Samples",
  "Partnership",
];

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL);

  if (state.status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[22px] border border-leaf/25 bg-leaf/[0.08] p-[34px] text-center">
        <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-leaf/15">
          <Icon name="check_circle" filled className="text-[32px] text-leaf" />
        </span>
        <p
          role="status"
          aria-live="polite"
          className="text-[16px] font-semibold text-leaf"
        >
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="grid gap-[18px] rounded-[22px] border border-border bg-surface-2 p-[34px] sm:grid-cols-2"
    >
      <label className="flex flex-col gap-[7px]">
        <span className={LABEL}>Name *</span>
        <input name="name" required placeholder="Your name" className={FIELD} />
      </label>

      <label className="flex flex-col gap-[7px]">
        <span className={LABEL}>Email *</span>
        <input
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          className={FIELD}
        />
      </label>

      <label className="flex flex-col gap-[7px]">
        <span className={LABEL}>Company</span>
        <input name="company" placeholder="Optional" className={FIELD} />
      </label>

      <label className="flex flex-col gap-[7px]">
        <span className={LABEL}>Inquiry type *</span>
        <select name="inquiryType" required defaultValue="" className={FIELD}>
          <option value="" disabled>
            Select one
          </option>
          {INQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-[7px] sm:col-span-2">
        <span className={LABEL}>Message *</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Tell us what you're looking for…"
          className={`${FIELD} resize-y`}
        />
      </label>

      <Button
        type="submit"
        variant="brand"
        size="pillLg"
        disabled={pending}
        className="w-full sm:col-span-2"
      >
        {pending ? "Sending…" : "Send Message"}
        <Icon name="send" className="text-[19px]" />
      </Button>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="text-center text-[14px] font-semibold text-brand-deep sm:col-span-2"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
