export const CATEGORIES = [
  {
    slug: "apartment",
    value: "Flat/Apartment",
    label: "Apartment",
  },
  {
    slug: "duplex",
    value: "Duplex",
    label: "Duplex",
  },
  {
    slug: "land",
    value: "Land",
    label: "Land",
  },
  {
    slug: "commercial-property",
    value: "Commercial property",
    label: "Commercial",
  },
  {
    slug: "event-center-venue",
    value: "Event center/Venue",
    label: "Event Center",
  },
];

export function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}

export function getAllCategorySlugs() {
  return CATEGORIES.map((c) => c.slug);
}