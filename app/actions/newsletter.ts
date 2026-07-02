"use server";

import { z } from "zod";
import { sendMail } from "@/lib/email";

const NewsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
});

export type NewsletterState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const parsed = NewsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Enter a valid email.",
    };
  }

  const result = await sendMail({
    subject: "New newsletter subscriber",
    replyTo: parsed.data.email,
    text: `New harvest-list signup: ${parsed.data.email}`,
  });

  if (!result.ok) {
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }

  return {
    status: "success",
    message: "Thanks — welcome to the harvest list! 🌱",
  };
}
