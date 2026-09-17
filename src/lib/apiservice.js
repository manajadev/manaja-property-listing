const RAW_BASE = process.env.API_BASE_URL;

const API_BASE = RAW_BASE ? RAW_BASE.replace(/\/+$/, "") : null;

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