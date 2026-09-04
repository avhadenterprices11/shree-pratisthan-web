import fs from "fs";
import path from "path";

export interface SubmissionRecord {
  id: string;
  type: "volunteer" | "contact" | "community";
  data: Record<string, unknown>;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "submissions.json");

function ensureDbFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("[Database] Error initializing storage file:", err);
  }
}

export async function saveSubmission(
  type: "volunteer" | "contact" | "community",
  payload: Record<string, unknown>
): Promise<SubmissionRecord | null> {
  try {
    ensureDbFile();

    const newRecord: SubmissionRecord = {
      id: `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type,
      data: payload,
      createdAt: new Date().toISOString(),
    };

    let records: SubmissionRecord[] = [];
    if (fs.existsSync(DB_FILE)) {
      const fileContent = fs.readFileSync(DB_FILE, "utf-8");
      try {
        records = JSON.parse(fileContent);
      } catch {
        records = [];
      }
    }

    records.push(newRecord);
    fs.writeFileSync(DB_FILE, JSON.stringify(records, null, 2), "utf-8");

    console.info(`[Database] Record saved successfully (${newRecord.id})`);
    return newRecord;
  } catch (err) {
    console.error("[Database] Failed to persist submission record:", err);
    return null;
  }
}
