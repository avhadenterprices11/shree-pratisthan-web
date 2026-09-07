import { NextResponse } from "next/server";
import { getDynamicContentList } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await getDynamicContentList("published");
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("[API/Content] Error fetching published content:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load dynamic content." },
      { status: 500 }
    );
  }
}
