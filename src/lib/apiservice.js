const RAW_BASE = process.env.API_BASE_URL;
const API_BASE = RAW_BASE ? RAW_BASE.replace(/\/+$/, "") : null;

/**
 * Helper function for API requests with common error handling
 */
async function apiRequest(endpoint, options = {}) {
  if (!API_BASE) {
    throw new Error("API_BASE_URL is not set");
  }

  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.detail?.[0]?.msg || `Request failed: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}
/**
 * Fetch public property listings.
 *
 * @param {object} [opts]
 * @param {"available"|"occupied"} [opts.occupancyStatus]
 * @param {number} [opts.limit=100]   - 1..100 (clamped)
 * @param {number} [opts.offset=0]    - >= 0 (clamped)
 * @param {number} [opts.revalidate=60] - ISR cache window in seconds
 * @param {AbortSignal} [opts.signal]
 * @returns {Promise<Array>} Array of ListingsBaseSchema objects
 */
export async function fetchListings({
  occupancyStatus,
  limit = 100,
  offset = 0,
  revalidate = 60,
  signal,
} = {}) {
  if (!API_BASE) {
    throw new Error("API_BASE_URL is not set");
  }

  const url = new URL(`${API_BASE}/listings`);
  if (occupancyStatus) url.searchParams.set("occupancy_status", occupancyStatus);
  url.searchParams.set("limit", String(Math.min(Math.max(limit, 1), 100)));
  url.searchParams.set("offset", String(Math.max(offset, 0)));

  const res = await fetch(url.toString(), {
    signal,
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch listings: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

/**
 * Create a listing booking (public endpoint, no auth required)
 *
 * @param {string} propertyId - UUID of the property
 * @param {object} data - Booking data
 * @param {string} data.guest_name - 1-200 chars, required
 * @param {string} data.guest_email - Valid email, required
 * @param {string} data.guest_phone - 3-50 chars, required
 * @param {string|null} data.preferred_visit_at - ISO datetime, optional
 * @param {string|null} data.message - Max 2000 chars, optional
 * @returns {Promise<object>} Booking response
 */
export async function createListingBooking(propertyId, data) {
  return apiRequest(`/listings/${propertyId}/bookings`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Format a price string/number as Nigerian Naira.
 * Returns the original input if it can't be parsed.
 */
export function formatPrice(price) {
  const n = Number(price);
  if (!Number.isFinite(n)) return price;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
}