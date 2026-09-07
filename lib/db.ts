import fs from "fs";
import path from "path";

export interface SubmissionRecord {
  id: string;
  type: "volunteer" | "contact" | "community";
  data: Record<string, unknown>;
  createdAt: string;
}

export interface DynamicContentRecord {
  id: string;
  type: string;
  title: {
    en: string;
    mr: string;
    hi: string;
  };
  content: {
    en: string;
    mr: string;
    hi: string;
  };
  category: {
    en: string;
    mr: string;
    hi: string;
  };
  date: string;
  author: string;
  priority: string;
  status: "published" | "draft" | string;
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "submissions.json");
const CONTENT_FILE = path.join(DATA_DIR, "dynamic-content.json");

function ensureDbFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf-8");
    }
    if (!fs.existsSync(CONTENT_FILE)) {
      fs.writeFileSync(CONTENT_FILE, JSON.stringify([], null, 2), "utf-8");
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

export async function getDynamicContentList(
  filter: "all" | "published" | string = "all"
): Promise<DynamicContentRecord[]> {
  try {
    ensureDbFile();
    if (!fs.existsSync(CONTENT_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
    let records: DynamicContentRecord[] = [];
    try {
      records = JSON.parse(raw);
    } catch {
      records = [];
    }
    if (filter === "published") {
      return records.filter((r) => r.status === "published");
    }
    return records;
  } catch (err) {
    console.error("[Database] Failed to get dynamic content list:", err);
    return [];
  }
}

export async function saveDynamicContent(
  payload: Omit<DynamicContentRecord, "id" | "createdAt" | "updatedAt"> & { id?: string }
): Promise<DynamicContentRecord | null> {
  try {
    ensureDbFile();
    let records: DynamicContentRecord[] = [];
    if (fs.existsSync(CONTENT_FILE)) {
      const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
      try {
        records = JSON.parse(raw);
      } catch {
        records = [];
      }
    }

    const now = new Date().toISOString();
    let savedRecord: DynamicContentRecord;

    if (payload.id) {
      const index = records.findIndex((r) => r.id === payload.id);
      if (index !== -1) {
        savedRecord = {
          ...records[index],
          ...payload,
          id: payload.id,
          updatedAt: now,
        };
        records[index] = savedRecord;
      } else {
        savedRecord = {
          ...payload,
          id: payload.id,
          createdAt: now,
          updatedAt: now,
        };
        records.push(savedRecord);
      }
    } else {
      savedRecord = {
        ...payload,
        id: `content_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        createdAt: now,
        updatedAt: now,
      };
      records.push(savedRecord);
    }

    fs.writeFileSync(CONTENT_FILE, JSON.stringify(records, null, 2), "utf-8");
    return savedRecord;
  } catch (err) {
    console.error("[Database] Failed to save dynamic content:", err);
    return null;
  }
}

export async function deleteDynamicContent(id: string): Promise<boolean> {
  try {
    ensureDbFile();
    if (!fs.existsSync(CONTENT_FILE)) return false;
    const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
    let records: DynamicContentRecord[] = [];
    try {
      records = JSON.parse(raw);
    } catch {
      return false;
    }
    const initialLen = records.length;
    records = records.filter((r) => r.id !== id);
    if (records.length === initialLen) return false;

    fs.writeFileSync(CONTENT_FILE, JSON.stringify(records, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("[Database] Failed to delete dynamic content:", err);
    return false;
  }
}

