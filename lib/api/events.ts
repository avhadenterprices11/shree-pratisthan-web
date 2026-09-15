import { EventItem, ALL_EVENTS } from "@/lib/events-data";

/**
 * Dynamic API Base URL resolver:
 * 1. Uses explicit NEXT_PUBLIC_API_URL if configured.
 * 2. If in browser:
 *    - On localhost / 127.0.0.1 -> http://localhost:8001/api
 *    - On local network IP (192.168.x.x, 10.x.x.x, 172.x.x.x) -> http://${hostname}:8001/api
 *    - Otherwise -> https://ems.test-zone.xyz/api
 * 3. On SSR server -> http://127.0.0.1:8001/api or NEXT_PUBLIC_API_URL fallback
 */
export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim() !== "") {
    return envUrl.replace(/\/+$/, "");
  }

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:8001/api";
    }
    if (/^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(hostname)) {
      return `http://${hostname}:8001/api`;
    }
    if (window.location.origin) {
      return `${window.location.origin}/api`;
    }
  }

  return "http://127.0.0.1:8001/api";
}

export function getBackendBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  if (envUrl && envUrl.trim() !== "") {
    return envUrl.replace(/\/+$/, "");
  }
  const apiBase = getApiBaseUrl();
  return apiBase.replace(/\/api$/, "");
}

export interface BackendEvent {
  id: number;
  event_code: string;
  name: string;
  description?: string;
  category?: string;
  category_id?: number;
  type?: string;
  event_type?: string;
  start_date: string;
  end_date: string;
  all_day?: boolean;
  timezone?: string;
  url_slug?: string;
  reg_start_at?: string;
  reg_end_at?: string;
  capacity?: number;
  waitlist_enabled?: boolean;
  mode?: string;
  virtual_platform?: string;
  meeting_platform?: string;
  meeting_url?: string;
  venue_name?: string;
  location?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  owner?: string;
  emergency_contact?: string;
  accessibility_notes?: string;
  banner_image_url?: string;
  promo_video_url?: string;
  gallery_images?: string[];
  meta_title?: string;
  meta_description?: string;
  status: string;
  visibility?: string;
  check_in_mode?: string;
  is_registration_open?: boolean;
  co_hosts?: string[];
  tags?: string[];
  sponsors?: Array<{ name: string; logo?: string; link?: string; tier?: string }>;
  partners?: Array<{ name: string; logo?: string; link?: string }>;
  agenda?: Array<{ time?: string; start_time?: string; end_time?: string; title: string; description: string }>;
  total_registrations?: number;
  created_at?: string;
  updated_at?: string;
}

export interface BackendEventsListResponse {
  data: BackendEvent[];
  pagination: {
    page: number;
    pageSize: number;
    totalRecords: number | string;
    totalPages: number;
  };
}

// Map category key or infer from event data to UI-friendly display label
export function getCategoryLabel(category?: string, title?: string, type?: string, tags?: string[]): string {
  if (category && category.trim() !== "") {
    const cat = category.toLowerCase().trim();
    switch (cat) {
      case "cultural":
        return "Cultural Festival";
      case "sports":
        return "Sports League";
      case "health":
        return "Health & Medical Camp";
      case "eco":
        return "Eco & Environment";
      case "charity":
        return "Community & Relief";
      case "conference":
        return "Conference & Summit";
      case "exhibition":
        return "Exhibition";
      case "workshop":
        return "Workshop";
      case "awards":
        return "Award Ceremony";
      case "seminar":
        return "Seminar";
      case "entertainment":
      case "cinema":
      case "movie":
      case "premiere":
        return "Cinema & Premiere";
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  }

  // If category is null/omitted, infer intelligently from title, type, and tags
  const combined = `${title || ""} ${type || ""} ${(tags || []).join(" ")}`.toLowerCase();
  if (
    combined.includes("movie") ||
    combined.includes("premiere") ||
    combined.includes("cinema") ||
    combined.includes("film") ||
    combined.includes("screening") ||
    combined.includes("theatre") ||
    combined.includes("theater")
  ) {
    return "Cinema & Premiere";
  }
  if (
    combined.includes("cricket") ||
    combined.includes("sport") ||
    combined.includes("tournament") ||
    combined.includes("league") ||
    combined.includes("marathon") ||
    combined.includes("football")
  ) {
    return "Sports League";
  }
  if (
    combined.includes("health") ||
    combined.includes("medical") ||
    combined.includes("blood") ||
    combined.includes("camp") ||
    combined.includes("doctor") ||
    combined.includes("checkup")
  ) {
    return "Health & Medical Camp";
  }
  if (
    combined.includes("tree") ||
    combined.includes("plant") ||
    combined.includes("eco") ||
    combined.includes("green") ||
    combined.includes("environment") ||
    combined.includes("cleanliness")
  ) {
    return "Eco & Environment";
  }
  if (
    combined.includes("ganesh") ||
    combined.includes("utsav") ||
    combined.includes("dahi handi") ||
    combined.includes("aarti") ||
    combined.includes("pooja") ||
    combined.includes("navratri") ||
    combined.includes("diwali") ||
    combined.includes("cultural") ||
    combined.includes("shivaji")
  ) {
    return "Cultural Festival";
  }
  if (
    combined.includes("welfare") ||
    combined.includes("relief") ||
    combined.includes("seva") ||
    combined.includes("donation") ||
    combined.includes("charity") ||
    combined.includes("school") ||
    combined.includes("kit")
  ) {
    return "Community Welfare";
  }
  if (combined.includes("conference") || combined.includes("summit") || combined.includes("tech")) {
    return "Conference & Summit";
  }
  if (combined.includes("workshop") || combined.includes("training") || combined.includes("bootcamp")) {
    return "Workshop";
  }
  if (combined.includes("award") || combined.includes("felicitation") || combined.includes("ceremony")) {
    return "Award Ceremony";
  }

  if (type && type.toLowerCase() !== "public" && type.toLowerCase() !== "private") {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  return "Special Event";
}

// Normalize category into allowed type
export function normalizeCategory(category?: string, title?: string): "cultural" | "sports" | "health" | "eco" | "charity" {
  const combined = `${category || ""} ${title || ""}`.toLowerCase().trim();
  if (combined.includes("sport") || combined.includes("cricket") || combined.includes("league")) return "sports";
  if (combined.includes("health") || combined.includes("medical") || combined.includes("blood")) return "health";
  if (combined.includes("eco") || combined.includes("tree") || combined.includes("green")) return "eco";
  if (combined.includes("charity") || combined.includes("relief") || combined.includes("seva") || combined.includes("welfare")) return "charity";
  return "cultural";
}

// Format Event Mode Label
export function getEventModeLabel(mode?: string, language?: string): string {
  const m = (mode || "in-person").toLowerCase().trim();
  if (m === "virtual" || m === "online") {
    return language === "mr" ? "ऑनलाइन" : language === "hi" ? "ऑनलाइन" : "Virtual";
  }
  if (m === "hybrid") {
    return language === "mr" ? "हायब्रिड" : language === "hi" ? "हाइब्रिड" : "Hybrid";
  }
  return language === "mr" ? "प्रत्यक्ष" : language === "hi" ? "स्थान पर" : "In-Person";
}

// Format Check-In Mode Label
export function getCheckInModeLabel(checkInMode?: string, language?: string): string {
  const c = (checkInMode || "qr").toLowerCase().trim();
  if (c === "manual" || c === "gate" || c === "badge") {
    return language === "mr" ? "गेट पास" : language === "hi" ? "गेट पास" : "Gate Pass";
  }
  if (c === "rfid" || c === "wristband") {
    return "RFID Pass";
  }
  if (c === "open" || c === "free") {
    return language === "mr" ? "मुक्त प्रवेश" : language === "hi" ? "खुला प्रवेश" : "Open Entry";
  }
  return language === "mr" ? "क्यूआर डिजिटल पास" : language === "hi" ? "क्यूआर डिजिटल पास" : "QR Digital Pass";
}

// Compute dynamic registration status
export function computeRegistrationStatus(backend: BackendEvent): "open" | "closing_soon" | "free_entry" | "closed" {
  if (backend.is_registration_open === false || backend.status === "Cancelled" || backend.status === "Archived" || backend.status === "Draft") {
    return "closed";
  }

  const now = Date.now();

  if (backend.reg_end_at) {
    const end = new Date(backend.reg_end_at).getTime();
    if (!isNaN(end) && now > end) {
      return "closed";
    }
    if (!isNaN(end) && end - now <= 48 * 60 * 60 * 1000 && end > now) {
      return "closing_soon";
    }
  }

  if (backend.capacity && backend.total_registrations && backend.total_registrations >= backend.capacity && !backend.waitlist_enabled) {
    return "closed";
  }

  return "open";
}

// Compute dynamic event status based on dates
export function computeEventStatus(startDateStr: string, endDateStr: string, backendStatus?: string): "upcoming" | "active" | "completed" {
  if (backendStatus?.toLowerCase() === "archived") return "completed";

  const now = new Date().getTime();
  const start = new Date(startDateStr).getTime();
  const end = new Date(endDateStr).getTime();

  if (isNaN(start) || isNaN(end)) return "upcoming";

  if (now < start) {
    return "upcoming";
  } else if (now >= start && now <= end) {
    return "active";
  } else {
    return "completed";
  }
}

// Format ISO date strings into readable human format (e.g. "Aug 27 – Sep 06, 2026")
export function formatEventDateRange(startDateStr: string, endDateStr: string, timezone?: string): string {
  try {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime())) return "Upcoming Date";
    const tz = timezone || "Asia/Kolkata";

    const startMonth = startDate.toLocaleDateString("en-US", { month: "short", timeZone: tz });
    const startDay = startDate.toLocaleDateString("en-US", { day: "2-digit", timeZone: tz });
    const startYear = startDate.toLocaleDateString("en-US", { year: "numeric", timeZone: tz });

    if (isNaN(endDate.getTime()) || startDateStr === endDateStr) {
      return `${startMonth} ${startDay}, ${startYear}`;
    }

    const endMonth = endDate.toLocaleDateString("en-US", { month: "short", timeZone: tz });
    const endDay = endDate.toLocaleDateString("en-US", { day: "2-digit", timeZone: tz });
    const endYear = endDate.toLocaleDateString("en-US", { year: "numeric", timeZone: tz });

    if (startYear === endYear) {
      if (startMonth === endMonth) {
        return `${startMonth} ${startDay} – ${endDay}, ${startYear}`;
      }
      return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${startYear}`;
    }

    return `${startMonth} ${startDay}, ${startYear} – ${endMonth} ${endDay}, ${endYear}`;
  } catch {
    return "Upcoming Date";
  }
}

// Format time range
export function formatEventTime(startDateStr: string, endDateStr: string, allDay?: boolean, timezone?: string): string {
  if (allDay) return "All Day Event";
  try {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    if (isNaN(start.getTime())) return "06:00 AM – 10:00 PM";
    const tz = timezone || "Asia/Kolkata";

    const formatTime = (d: Date) =>
      d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: tz });

    if (isNaN(end.getTime())) return formatTime(start);
    return `${formatTime(start)} – ${formatTime(end)}`;
  } catch {
    return "06:00 AM – 10:00 PM";
  }
}

// Resolve image URL (handle backend uploads, remote URLs, and local fallbacks)
export function resolveImageUrl(url?: string): string {
  if (!url || url.trim() === "") {
    return "/hero_ganesh.png";
  }
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const backendBase = getBackendBaseUrl();
  if (url.startsWith("/api/uploads/")) {
    return `${backendBase}${url}`;
  }
  if (url.startsWith("uploads/")) {
    return `${backendBase}/api/${url}`;
  }
  if (url.startsWith("/")) {
    return url;
  }
  return `/${url}`;
}

// Transform backend database record to UI EventItem
export function transformBackendEventToEventItem(backend: BackendEvent): EventItem {
  const category = normalizeCategory(backend.category, backend.name);
  const status = computeEventStatus(backend.start_date, backend.end_date, backend.status);
  const location =
    backend.location ||
    [backend.venue_name, backend.city, backend.state].filter(Boolean).join(", ") ||
    "Shree Pratishtan Mandal Ground, Indira Nagar, Nashik";

  const mainImage = resolveImageUrl(backend.banner_image_url);
  const galleryImages =
    Array.isArray(backend.gallery_images) && backend.gallery_images.length > 0
      ? backend.gallery_images.map(resolveImageUrl)
      : [mainImage, "/hero_ganesh.png", "/gallery_ganeshotsav_aarthi.png"];

  const agenda =
    Array.isArray(backend.agenda) && backend.agenda.length > 0
      ? backend.agenda.map((item: any) => ({
        time:
          item.time ||
          (item.start_time
            ? item.end_time
              ? `${item.start_time} – ${item.end_time}`
              : item.start_time
            : "06:00 PM"),
        title: item.title || "Program Session",
        description: item.description || "",
      }))
      : [
        { time: "06:00 AM", title: "Morning Aarti & Prayers", description: "Commencing the sacred festivities." },
        { time: "11:00 AM", title: "Community Program", description: "Interactive cultural and welfare session." },
        { time: "07:30 PM", title: "Maha Aarti & Gathering", description: "Grand celebration with community members." },
      ];

  const totalRegs = backend.total_registrations || 0;
  const capacity = backend.capacity ? `${backend.capacity.toLocaleString()}+` : "Open to All";

  const partners =
    Array.isArray(backend.partners) && backend.partners.length > 0
      ? backend.partners.map((p) => ({
        name: p.name || "",
        logo: p.logo ? resolveImageUrl(p.logo) : "",
        link: p.link || "",
      }))
      : [];

  const sponsors =
    Array.isArray(backend.sponsors) && backend.sponsors.length > 0
      ? backend.sponsors.map((s) => ({
        name: s.name || "",
        logo: s.logo ? resolveImageUrl(s.logo) : "",
        link: s.link || "",
        tier: s.tier || "",
      }))
      : [];

  const promoVideoUrl = backend.promo_video_url ? resolveImageUrl(backend.promo_video_url) : undefined;
  const addressParts = [
    backend.address_line1,
    backend.address_line2,
    backend.city,
    backend.state,
    backend.zip_code,
    backend.country,
  ].filter(Boolean);
  const fullAddress = addressParts.length > 0 ? addressParts.join(", ") : location;

  const registrationStatus = computeRegistrationStatus(backend);
  const isRegistrationOpen = backend.is_registration_open !== false && registrationStatus !== "closed";
  const eventMode = getEventModeLabel(backend.mode);
  const checkInMode = getCheckInModeLabel(backend.check_in_mode);
  const registrationCloseDate = backend.reg_end_at ? formatEventDateRange(backend.reg_end_at, backend.reg_end_at, backend.timezone) : undefined;

  return {
    id: backend.url_slug || backend.id.toString(),
    title: backend.name,
    tagline: backend.meta_description || backend.description?.slice(0, 100) || "Devotion, Culture & Social Welfare",
    category,
    categoryLabel: getCategoryLabel(backend.category, backend.name, backend.type, backend.tags),
    status,
    date: formatEventDateRange(backend.start_date, backend.end_date, backend.timezone),
    time: formatEventTime(backend.start_date, backend.end_date, backend.all_day, backend.timezone),
    location,
    mapUrl: `https://maps.google.com/?q=${encodeURIComponent(fullAddress || location)}`,
    mainImage,
    galleryImages,
    description: backend.description || "Join us in celebrating our vibrant cultural heritage and community drives.",
    metrics: [
      { label: "Expected Devotees", value: capacity },
      { label: "Total Registered", value: `${totalRegs.toLocaleString()} Attendees` },
      { label: "Event Type", value: backend.type ? (backend.type.charAt(0).toUpperCase() + backend.type.slice(1)) : "Community Festival" },
      { label: "City / Region", value: [backend.city, backend.country].filter(Boolean).join(", ") || "Nashik, MH" },
    ],
    organizedDetails: [
      {
        heading: "Community Planning & Municipal Coordination",
        content: `Organized by ${backend.owner || "Shree Pratishtan Mandal"} with complete on-ground safety protocols, volunteer management, and emergency medical support at ${location}.`,
      },
      {
        heading: "Logistics, Crowd Management & Safety",
        content: "Equipped with round-the-clock coordination, first-aid response, clean drinking water, and safe movement for families, elders, and youth.",
      },
    ],
    agenda,
    organizerName: backend.owner || "Shree Pratishtan Utsav Samiti",
    organizerPhone: backend.emergency_contact || "+91 9922786608",
    organizerEmail: "Info@shreepratishthan.com",
    metaTitle: backend.meta_title || `${backend.name} | Shree Pratishtan (श्री प्रतिष्ठान)`,
    metaDescription: backend.meta_description || backend.description || `Join ${backend.name} organised by Shree Pratishtan in ${backend.city || "Nashik"}.`,
    rawStartDate: backend.start_date,
    rawEndDate: backend.end_date,
    regStartAt: backend.reg_start_at,
    regEndAt: backend.reg_end_at,
    mode: backend.mode || "in-person",
    eventMode,
    venueName: backend.venue_name,
    address: fullAddress,
    addressLine1: backend.address_line1,
    addressLine2: backend.address_line2,
    city: backend.city,
    state: backend.state,
    zipCode: backend.zip_code,
    country: backend.country,
    timezone: backend.timezone,
    allDay: backend.all_day,
    virtualPlatform: backend.virtual_platform || backend.meeting_platform,
    meetingUrl: backend.meeting_url,
    accessibilityNotes: backend.accessibility_notes,
    promoVideoUrl,
    capacityNumber: backend.capacity,
    waitlistEnabled: backend.waitlist_enabled,
    visibility: backend.visibility || "public",
    checkInMode,
    coHosts: backend.co_hosts,
    tags: backend.tags,
    sponsors,
    partners,
    isRegistrationOpen,
    registrationStatus,
    registrationCloseDate,
  };
}

export interface FetchEventsOptions {
  category?: string;
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
  tab?: string;
}

// Fetch all events from backend with fallback to static seed data
export async function fetchEvents(
  options: FetchEventsOptions = {}
): Promise<{ events: EventItem[]; total: number; isFallback: boolean }> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.set("pageSize", (options.pageSize || 50).toString());
    queryParams.set("page", (options.page || 1).toString());

    // Set status filter if provided or default to Published
    if (options.status && options.status !== "all") {
      queryParams.set("status", options.status);
    } else if (options.status === undefined) {
      queryParams.set("status", "Published");
    }

    if (options.category && options.category !== "all") {
      queryParams.set("type", options.category);
    }
    if (options.search) {
      queryParams.set("search", options.search);
    }
    if (options.tab) {
      queryParams.set("tab", options.tab);
    }

    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/events?${queryParams.toString()}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      // Revalidate cache every 15 seconds
      next: { revalidate: 15 },
    });

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }

    const json: BackendEventsListResponse = await res.json();
    if (json && Array.isArray(json.data) && json.data.length > 0) {
      const transformedEvents = json.data.map(transformBackendEventToEventItem);
      const total = typeof json.pagination?.totalRecords === "number"
        ? json.pagination.totalRecords
        : parseInt(json.pagination?.totalRecords || "0", 10) || transformedEvents.length;

      return {
        events: transformedEvents,
        total,
        isFallback: false,
      };
    }

    // If backend returns empty array, provide static seed data for a rich preview
    return {
      events: ALL_EVENTS,
      total: ALL_EVENTS.length,
      isFallback: true,
    };
  } catch (err) {
    console.warn(`fetchEvents fallback triggered (using seed events):`, err);
    return {
      events: ALL_EVENTS,
      total: ALL_EVENTS.length,
      isFallback: true,
    };
  }
}

// Fetch single event by ID or slug with fallback
export async function fetchEventByIdOrSlug(idOrSlug: string): Promise<EventItem | null> {
  try {
    const cleanSlug = decodeURIComponent(idOrSlug).trim();

    // 1. If numeric ID, try direct endpoint
    const numericId = parseInt(cleanSlug, 10);
    if (!isNaN(numericId) && numericId.toString() === cleanSlug) {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/events/${numericId}`, {
        next: { revalidate: 15 },
      });
      if (res.ok) {
        const backendEvent: BackendEvent = await res.json();
        return transformBackendEventToEventItem(backendEvent);
      }
    }

    // 2. Fetch list to find matching url_slug, event_code, or id (without restrictive status filter)
    const { events } = await fetchEvents({ pageSize: 100, status: "all" });
    const found = events.find(
      (e) =>
        e.id === cleanSlug ||
        e.id.toLowerCase() === cleanSlug.toLowerCase() ||
        (e as any).url_slug === cleanSlug ||
        (e as any).url_slug?.toLowerCase() === cleanSlug.toLowerCase() ||
        (e as any).event_code === cleanSlug ||
        (e as any).event_code?.toLowerCase() === cleanSlug.toLowerCase()
    );
    if (found) return found;

    // 3. Fallback to static seed data
    const staticFound = ALL_EVENTS.find(
      (e) => e.id === cleanSlug || e.id.toLowerCase() === cleanSlug.toLowerCase()
    );
    return staticFound || null;
  } catch (err) {
    console.warn(`fetchEventByIdOrSlug fallback for ${idOrSlug}:`, err);
    return ALL_EVENTS.find((e) => e.id === idOrSlug) || null;
  }
}
