import { NextRequest, NextResponse } from "next/server";
import { submitToWeb3Forms } from "@/lib/api-utils";
import { getClientIP, rateLimit } from "@/lib/rate-limit";
import { communitySchema } from "@/lib/validations";
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

  const parseResult = communitySchema.safeParse(body);

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
      contact: data.contact,
      interest_area: data.interest,
      message: data.message ?? "Not provided",
    },
    `[Shree Prathishthan] Community Mission Interest — ${data.interest}`,
    data.name,
    "Community API"
  );

  if (errorResponse) return errorResponse;

  await saveSubmission("community", data as unknown as Record<string, unknown>);

  return NextResponse.json(
    { success: true, message: "Your registration has been received. A coordinator will reach out to you shortly." },
    { status: 200 }
  );
}
