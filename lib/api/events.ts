import { EventItem, ALL_EVENTS } from "@/lib/events-data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001/api";
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://127.0.0.1:8001";

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

// Map category key to UI-friendly display label
export function getCategoryLabel(category?: string): string {
  if (!category) return "Cultural Festival";
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
    default:
      return cat.charAt(0).toUpperCase() + cat.slice(1);
  }
}

// Normalize category into allowed type
export function normalizeCategory(category?: string): "cultural" | "sports" | "health" | "eco" | "charity" {
  if (!category) return "cultural";
  const cat = category.toLowerCase().trim();
  if (cat.includes("sport")) return "sports";
  if (cat.includes("health") || cat.includes("medical") || cat.includes("blood")) return "health";
  if (cat.includes("eco") || cat.includes("tree") || cat.includes("green")) return "eco";
  if (cat.includes("charity") || cat.includes("relief") || cat.includes("seva")) return "charity";
  return "cultural";
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
export function formatEventDateRange(startDateStr: string, endDateStr: string): string {
  try {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime())) return "Upcoming Date";

    const startMonth = startDate.toLocaleDateString("en-US", { month: "short" });
    const startDay = startDate.getDate().toString().padStart(2, "0");
    const startYear = startDate.getFullYear();

    if (isNaN(endDate.getTime()) || startDateStr === endDateStr) {
      return `${startMonth} ${startDay}, ${startYear}`;
    }

    const endMonth = endDate.toLocaleDateString("en-US", { month: "short" });
    const endDay = endDate.getDate().toString().padStart(2, "0");
    const endYear = endDate.getFullYear();

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
export function formatEventTime(startDateStr: string, endDateStr: string, allDay?: boolean): string {
  if (allDay) return "All Day Event";
  try {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    if (isNaN(start.getTime())) return "06:00 AM – 10:00 PM";

    const formatTime = (d: Date) =>
      d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

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
  if (url.startsWith("/api/uploads/")) {
    return `${BACKEND_BASE_URL}${url}`;
  }
  if (url.startsWith("uploads/")) {
    return `${BACKEND_BASE_URL}/api/${url}`;
  }
  if (url.startsWith("/")) {
    return url;
  }
  return `/${url}`;
}

// Transform backend database record to UI EventItem
export function transformBackendEventToEventItem(backend: BackendEvent): EventItem {
  const category = normalizeCategory(backend.category);
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

  return {
    id: backend.url_slug || backend.id.toString(),
    title: backend.name,
    tagline: backend.meta_description || backend.description?.slice(0, 100) || "Devotion, Culture & Social Welfare",
    category,
    categoryLabel: getCategoryLabel(backend.category),
    status,
    date: formatEventDateRange(backend.start_date, backend.end_date),
    time: formatEventTime(backend.start_date, backend.end_date, backend.all_day),
    location,
    mapUrl: `https://maps.google.com/?q=${encodeURIComponent(fullAddress || location)}`,
    mainImage,
    galleryImages,
    description: backend.description || "Join us in celebrating our vibrant cultural heritage and community drives.",
    metrics: [
      { label: "Expected Devotees", value: capacity },
      { label: "Total Registered", value: `${totalRegs.toLocaleString()} Attendees` },
      { label: "Event Type", value: backend.type || "Community Festival" },
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
    checkInMode: backend.check_in_mode,
    coHosts: backend.co_hosts,
    tags: backend.tags,
    sponsors,
    partners,
    isRegistrationOpen: backend.is_registration_open,
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

    const url = `${API_BASE_URL}/events?${queryParams.toString()}`;
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
    console.warn("fetchEvents fallback triggered:", err);
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
      const res = await fetch(`${API_BASE_URL}/events/${numericId}`, {
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
