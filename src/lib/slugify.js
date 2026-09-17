/**
 * Turn a string into a URL-safe slug.
 * "Luxury 3-Bedroom Apartment in Lekki Phase 1" → "luxury-3-bedroom-apartment-in-lekki-phase-1"
 */
export function slugify(input) {
  if (!input) return "";
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // drop punctuation
    .replace(/\s+/g, "-") // spaces → dashes
    .replace(/-+/g, "-") // collapse repeats
    .replace(/^-|-$/g, ""); // trim leading/trailing dashes
}

/**
 * Build the slug for a listing: name + state (to reduce collisions).
 */
export function listingSlug(listing) {
  const name = slugify(listing?.name);
  const state = slugify(listing?.state);
  if (!name && !state) return "";
  if (!state) return name;
  return `${name}-${state}`;
}