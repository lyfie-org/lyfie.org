import { z } from "zod";

const interestEnum = z.enum([
  "Contributing",
  "Product Feedback",
  "Partnership",
  "Press",
  "General"
]);

const safeText = z
  .string()
  .trim()
  .refine((value) => !/[<>]/.test(value), {
    message: "Please remove angle bracket characters."
  });

export const contactClientSchema = z.object({
  name: safeText.min(2, "Please enter your full name.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  interest: interestEnum,
  message: safeText.min(30, "Please share at least 30 characters.").max(2000),
  website: z.string().max(0).optional().or(z.literal(""))
});

export const contactServerSchema = contactClientSchema.extend({
  turnstileToken: z.string().trim().min(10).max(4096)
});

export type ContactClientInput = z.infer<typeof contactClientSchema>;
export type ContactServerInput = z.infer<typeof contactServerSchema>;
