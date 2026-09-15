import { NextRequest, NextResponse } from "next/server";
import {
  getDynamicContentList,
  saveDynamicContent,
  deleteDynamicContent,
  DynamicContentRecord,
} from "@/lib/db";

// GET all dynamic content (including drafts) for Admin
export async function GET() {
  try {
    const list = await getDynamicContentList("all");
    return NextResponse.json({ success: true, items: list });
  } catch (error) {
    console.error("[API/Admin/Content] GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch content records." },
      { status: 500 }
    );
  }
}

// POST create or update multilingual dynamic content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.title?.en || !body.title?.mr || !body.title?.hi) {
      return NextResponse.json(
        { success: false, message: "Title in English, Marathi, and Hindi are all required." },
        { status: 400 }
      );
    }

    if (!body.content?.en || !body.content?.mr || !body.content?.hi) {
      return NextResponse.json(
        { success: false, message: "Content description in English, Marathi, and Hindi are all required." },
        { status: 400 }
      );
    }

    const payload: Omit<DynamicContentRecord, "id" | "createdAt" | "updatedAt"> & { id?: string } = {
      id: body.id,
      type: body.type || "announcement",
      title: {
        en: String(body.title.en).trim(),
        mr: String(body.title.mr).trim(),
        hi: String(body.title.hi).trim(),
      },
      content: {
        en: String(body.content.en).trim(),
        mr: String(body.content.mr).trim(),
        hi: String(body.content.hi).trim(),
      },
      category: {
        en: String(body.category?.en || "Announcement").trim(),
        mr: String(body.category?.mr || "महत्त्वाची सूचना").trim(),
        hi: String(body.category?.hi || "सूचना").trim(),
      },
      date: body.date || new Date().toISOString().split("T")[0],
      author: body.author || "Admin",
      priority: body.priority || "normal",
      status: body.status || "published",
    };

    const saved = await saveDynamicContent(payload);

    if (!saved) {
      return NextResponse.json(
        { success: false, message: "Failed to persist dynamic content." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: body.id ? "Content updated successfully." : "Content published successfully.",
      item: saved,
    });
  } catch (error) {
    console.error("[API/Admin/Content] POST error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Server error saving content." },
      { status: 500 }
    );
  }
}

// DELETE content item by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing content ID" }, { status: 400 });
    }

    const success = await deleteDynamicContent(id);

    if (!success) {
      return NextResponse.json({ success: false, message: "Item not found or could not be deleted" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Item deleted successfully." });
  } catch (error) {
    console.error("[API/Admin/Content] DELETE error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete item" }, { status: 500 });
  }
}
