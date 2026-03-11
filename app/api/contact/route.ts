import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/constants/site";
import { isRateLimited } from "@/lib/security/rateLimit";
import { sanitizeMultiline, sanitizeText } from "@/lib/security/sanitize";
import { contactServerSchema } from "@/lib/validation/contact";

export const runtime = "edge";

const MAX_CONTENT_LENGTH = 12_000;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_SEND_URL = "https://api.resend.com/emails";

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

const getClientIp = (request: Request): string => {
  const forwardedFor =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for") ??
    "unknown";
  return forwardedFor.split(",")[0]?.trim() || "unknown";
};

const verifyTurnstile = async (
  token: string,
  remoteIp: string,
  secretKey: string
): Promise<boolean> => {
  const body = new URLSearchParams();
  body.set("secret", secretKey);
  body.set("response", token);
  body.set("remoteip", remoteIp);

  const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    body
  });

  if (!verifyResponse.ok) {
    return false;
  }

  const verifyPayload = (await verifyResponse.json()) as TurnstileResponse;
  return verifyPayload.success;
};

const sendContactEmail = async (params: {
  apiKey: string;
  from: string;
  to: string;
  name: string;
  email: string;
  interest: string;
  message: string;
  ip: string;
}): Promise<boolean> => {
  const { apiKey, from, to, name, email, interest, message, ip } = params;

  const emailPayload = {
    from,
    to: [to],
    reply_to: email,
    subject: `[Lyfie Contact] ${interest} - ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Interest: ${interest}`,
      `IP: ${ip}`,
      "",
      "Message:",
      message
    ].join("\n"),
    html: `
      <h2>Lyfie Contact Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Interest:</strong> ${interest}</p>
      <p><strong>IP:</strong> ${ip}</p>
      <hr />
      <p>${message.replace(/\n/g, "<br />")}</p>
    `
  };

  const emailResponse = await fetch(RESEND_SEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(emailPayload)
  });

  return emailResponse.ok;
};

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_CONTENT_LENGTH) {
    return NextResponse.json({ message: "Payload too large." }, { status: 413 });
  }

  const clientIp = getClientIp(request);
  const rateLimitKey = `${clientIp}:contact`;

  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json(
      { message: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = contactServerSchema.safeParse(json);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return NextResponse.json(
      {
        message: "Validation failed.",
        issues
      },
      { status: 400 }
    );
  }

  const { name, email, interest, message, website, turnstileToken } = parsed.data;

  if (website) {
    return NextResponse.json({ message: "Submission blocked." }, { status: 400 });
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) {
    return NextResponse.json({ message: "Server is not configured." }, { status: 500 });
  }

  const turnstileOk = await verifyTurnstile(turnstileToken, clientIp, turnstileSecret);
  if (!turnstileOk) {
    return NextResponse.json(
      { message: "Turnstile verification failed. Please try again." },
      { status: 403 }
    );
  }

  const emailApiKey = process.env.EMAIL_API_KEY;
  const emailFrom = process.env.EMAIL_FROM ?? "Lyfie Contact <contact@lyfie.org>";
  const emailTo = process.env.CONTACT_TO_EMAIL;

  if (!emailApiKey || !emailTo) {
    return NextResponse.json(
      { message: "Email service is not configured." },
      { status: 500 }
    );
  }

  const cleanName = sanitizeText(name);
  const cleanEmail = sanitizeText(email).toLowerCase();
  const cleanInterest = sanitizeText(interest);
  const cleanMessage = sanitizeMultiline(message);

  const mailSent = await sendContactEmail({
    apiKey: emailApiKey,
    from: emailFrom,
    to: emailTo,
    name: cleanName,
    email: cleanEmail,
    interest: cleanInterest,
    message: cleanMessage,
    ip: clientIp
  });

  if (!mailSent) {
    return NextResponse.json(
      { message: "Unable to send your message right now. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    message:
      "Thanks for reaching out to Lyfie. We received your message and will follow up shortly.",
    organization: siteConfig.name
  });
}
