"use client";

import { useMemo, useState } from "react";
import CategoryFilters from "./categoryfilters";
import ListingCard from "../listingcard";

export default function CategoryView({ listings = [], categoryLabel = "" }) {
  const [filters, setFilters] = useState({
    status: "all",
    minBeds: "any",
    minBaths: "any",
    minPrice: "",
    maxPrice: "",
    sort: "price-asc",
  });

  const filtered = useMemo(() => {
    const minP = filters.minPrice ? Number(filters.minPrice) : undefined;
    const maxP = filters.maxPrice ? Number(filters.maxPrice) : undefined;

    const out = listings.filter((l) => {
      if (filters.status !== "all" && l.property_status !== filters.status)
        return false;
      if (filters.minBeds !== "any" && l.bedrooms < Number(filters.minBeds))
        return false;
      if (filters.minBaths !== "any" && l.bathrooms < Number(filters.minBaths))
        return false;
      if (minP !== undefined && Number(l.price) < minP) return false;
      if (maxP !== undefined && Number(l.price) > maxP) return false;
      return true;
    });

    out.sort((a, b) => {
      if (filters.sort === "price-asc") return Number(a.price) - Number(b.price);
      if (filters.sort === "price-desc") return Number(b.price) - Number(a.price);
      return b.bedrooms - a.bedrooms;
    });

    return out;
  }, [listings, filters]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <CategoryFilters
        filters={filters}
        onChange={setFilters}
        resultCount={filtered.length}
      />

      {/* Grid — full width now that map is gone */}
      {filtered.length === 0 ? (
        <div
          className="rounded-xl border border-dashed border-border
                     p-12 text-center text-muted-foreground"
        >
          No properties match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((l, i) => (
            <ListingCard
              key={`${l.name}-${l.address}-${i}`}
              listing={l}
            />
          ))}
        </div>
      )}
    </div>
  );
}