import { NextResponse } from "next/server";

export interface Web3FormsPayload {
  [key: string]: string | number | boolean | undefined;
}

export async function submitToWeb3Forms(
  payload: Web3FormsPayload,
  subject: string,
  fromName: string,
  logPrefix: string
): Promise<NextResponse | null> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (accessKey && accessKey !== "your_key_here") {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject,
          from_name: fromName,
          ...payload,
          botcheck: "",
        }),
      });

      const result = (await response.json()) as { success: boolean; message?: string };

      if (!result.success) {
        console.error(`[${logPrefix}] Web3Forms error:`, result);
        return NextResponse.json(
          { success: false, message: "Failed to submit application. Please try again." },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error(`[${logPrefix}] Network error sending to Web3Forms:`, err);
      return NextResponse.json(
        { success: false, message: "Network error. Please try again later." },
        { status: 503 }
      );
    }
  } else {
    console.info(`[${logPrefix}] Submission received (no email key configured):`, {
      fromName,
      subject,
    });
  }

  return null; // Signals successful processing with no error response
}
