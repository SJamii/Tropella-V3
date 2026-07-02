"use server";

import { z } from "zod";
import { sendMail } from "@/lib/email";

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email"),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  inquiryType: z.enum([
    "General Inquiry",
    "Wholesale",
    "Samples",
    "Partnership",
  ]),
  message: z.string().trim().min(1, "Message is required").max(4000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") ?? "",
    inquiryType: formData.get("inquiryType"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message ?? "Please check the form and retry.",
    };
  }

  const { name, email, company, inquiryType, message } = parsed.data;

  const result = await sendMail({
    subject: `New ${inquiryType} enquiry from ${name}`,
    replyTo: email,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "—"}`,
      `Inquiry type: ${inquiryType}`,
      "",
      message,
    ].join("\n"),
  });

  if (!result.ok) {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again.",
    };
  }

  return {
    status: "success",
    message: "Message sent — we reply within 24 hours on business days. 🌴",
  };
}
