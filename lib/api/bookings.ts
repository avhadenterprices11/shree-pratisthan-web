export interface BackendTicket {
  id: number;
  event_id: number;
  name: string;
  type?: string;
  price: number | string;
  currency?: string;
  quantity?: number;
  sold_count?: number;
  min_quantity?: number;
  max_quantity?: number;
  description?: string;
  sales_status?: string;
  is_active?: boolean;
}

export interface BackendAddon {
  id: number;
  event_id: number;
  name: string;
  price: number | string;
  description?: string;
  quantity_available?: number;
  is_active?: boolean;
}

export interface CreateBookingItem {
  ticket_id?: number | null;
  addon_id?: number | null;
  item_type: "ticket" | "addon";
  item_name: string;
  quantity: number;
  unit_price: number;
}

export interface CreateBookingPayload {
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  payment_method?: string | null;
  promo_code?: string | null;
  source?: string;
  metadata?: Record<string, any>;
  items: CreateBookingItem[];
}

export interface BookingResponse {
  id: number;
  booking_code: string;
  event_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  status: string;
  payment_status: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  promo_code?: string | null;
  items?: Array<{
    id: number;
    booking_id: number;
    ticket_id?: number | null;
    addon_id?: number | null;
    item_type: string;
    item_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
}

export interface IssuedTicketData {
  id: number;
  ticket_number: string;
  unique_code: string;
  holder_name: string;
  holder_email?: string | null;
  qr_payload: string;
  qr_image_url?: string | null;
  status: string;
  unit_price?: number | null;
  total_price?: number | null;
}

export interface ConfirmBookingResponse {
  booking: BookingResponse;
  tickets: IssuedTicketData[];
  message: string;
}

export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return "http://localhost:8001/api";
    }
    return `http://${window.location.hostname}:8001/api`;
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001/api";
}

/**
 * Fetch available tickets for an event
 */
export async function fetchEventTickets(eventId: number | string): Promise<BackendTicket[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/events/${eventId}/tickets`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`[fetchEventTickets] HTTP ${res.status}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.tickets || [];
  } catch (err) {
    console.warn(`[fetchEventTickets] Error:`, err);
    return [];
  }
}

/**
 * Fetch available add-ons for an event
 */
export async function fetchEventAddons(eventId: number | string): Promise<BackendAddon[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/events/${eventId}/addons`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.addons || [];
  } catch (err) {
    console.warn(`[fetchEventAddons] Error:`, err);
    return [];
  }
}

/**
 * Create a new event booking order
 */
export async function createEventBooking(
  eventId: number | string,
  payload: CreateBookingPayload
): Promise<BookingResponse> {
  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/events/${eventId}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to create booking (HTTP ${res.status})`);
  }

  return await res.json();
}

/**
 * Confirm a booking and generate QR issued tickets
 */
export async function confirmEventBooking(
  eventId: number | string,
  bookingId: number | string
): Promise<ConfirmBookingResponse> {
  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/events/${eventId}/bookings/${bookingId}/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to confirm booking (HTTP ${res.status})`);
  }

  return await res.json();
}

/**
 * Fetch a public booking by unique booking code (e.g. BK-A1B2C3D4)
 */
export async function fetchPublicBookingByCode(
  bookingCode: string
): Promise<{ booking: BookingResponse; tickets: IssuedTicketData[] } | null> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/events/public/bookings/${bookingCode}`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn(`[fetchPublicBookingByCode] Error:`, err);
    return null;
  }
}
