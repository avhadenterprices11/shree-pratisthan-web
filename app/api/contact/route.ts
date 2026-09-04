import { NextRequest, NextResponse } from "next/server";
import { submitToWeb3Forms } from "@/lib/api-utils";
import { getClientIP, rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validations";
import { saveSubmission } from "@/lib/db";

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);
  const limitResult = rateLimit(clientIP, 5, 60 * 1000);

  if (!limitResult.success) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again after 1 minute." },
      { status: 429, headers: { "Retry-After": Math.ceil(limitResult.resetMs / 1000).toString() } }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const parseResult = contactSchema.safeParse(body);

  if (!parseResult.success) {
    const formattedErrors = parseResult.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return NextResponse.json(
      { success: false, message: "Validation failed.", errors: formattedErrors },
      { status: 422 }
    );
  }

  const data = parseResult.data;

  const errorResponse = await submitToWeb3Forms(
    {
      email: data.email,
      phone: data.phone ?? "Not provided",
      message: data.message,
    },
    `[Shree Pratishtan] Contact: ${data.subject}`,
    data.name,
    "Contact API"
  );

  if (errorResponse) return errorResponse;

  await saveSubmission("contact", data as unknown as Record<string, unknown>);

  return NextResponse.json(
    { success: true, message: "Your message has been received. We will reply within 24–48 hours." },
    { status: 200 }
  );
}
