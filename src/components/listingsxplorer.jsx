"use client";

import { useMemo, useState } from "react";
import ListingCard from "./listingcard";
import LoadMoreButton from "./loadmorebutton";

const PROPERTY_TYPES = [
  "Flat/Apartment",
  "Duplex",
  "Land",
  "Commercial property",
  "Event center/Venue",
];

export default function ListingsExplorer({
  listings,
  onLoadMore,
  hasMore = false,
}) {
  const [occupancy, setOccupancy] = useState("all");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [minBeds, setMinBeds] = useState("any");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("price-asc");

  const filtered = useMemo(() => {
    const max = maxPrice ? Number(maxPrice) : undefined;

    const out = listings.filter((l) => {
      if (occupancy !== "all" && l.occupancy_status !== occupancy) return false;
      if (status !== "all" && l.property_status !== status) return false;
      if (type !== "all" && l.property_type !== type) return false;
      if (minBeds !== "any" && l.bedrooms < Number(minBeds)) return false;
      if (max !== undefined && Number(l.price) > max) return false;
      return true;
    });

    out.sort((a, b) => {
      if (sort === "price-asc") return Number(a.price) - Number(b.price);
      if (sort === "price-desc") return Number(b.price) - Number(a.price);
      return b.bedrooms - a.bedrooms;
    });

    return out;
  }, [listings, occupancy, status, type, minBeds, maxPrice, sort]);

  const fieldClass =
    "rounded-md border border-border bg-card text-card-foreground " +
    "px-2.5 py-1.5 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-ring/50";

  return (
    <div className="space-y-6">
      {/* Filter bar — unchanged */}
      <div
        className="grid grid-cols-2 md:grid-cols-6 gap-3 p-4 rounded-xl
                   border border-border bg-card"
      >
        <label className="flex flex-col text-xs gap-1">
          <span className="text-muted-foreground">Occupancy</span>
          <select className={fieldClass} value={occupancy}
                  onChange={(e) => setOccupancy(e.target.value)}>
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
          </select>
        </label>

        <label className="flex flex-col text-xs gap-1">
          <span className="text-muted-foreground">Listing</span>
          <select className={fieldClass} value={status}
                  onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="rent">For Rent</option>
            <option value="sale">For Sale</option>
          </select>
        </label>

        <label className="flex flex-col text-xs gap-1">
          <span className="text-muted-foreground">Type</span>
          <select className={fieldClass} value={type}
                  onChange={(e) => setType(e.target.value)}>
            <option value="all">All</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-xs gap-1">
          <span className="text-muted-foreground">Min beds</span>
          <select className={fieldClass} value={minBeds}
                  onChange={(e) => setMinBeds(e.target.value)}>
            <option value="any">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}+</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-xs gap-1">
          <span className="text-muted-foreground">Max price</span>
          <input
            type="number"
            min={0}
            placeholder="e.g. 5000000"
            className={fieldClass}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </label>

        <label className="flex flex-col text-xs gap-1">
          <span className="text-muted-foreground">Sort</span>
          <select className={fieldClass} value={sort}
                  onChange={(e) => setSort(e.target.value)}>
            <option value="price-asc">Price: low → high</option>
            <option value="price-desc">Price: high → low</option>
            <option value="beds-desc">Most bedrooms</option>
          </select>
        </label>
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "property" : "properties"}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          className="rounded-xl border border-dashed border-border
                     p-12 text-center text-muted-foreground"
        >
          No properties match your filters.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((l, i) => (
              <ListingCard
                key={`${l.name}-${l.address}-${l.house_number}-${i}`}
                listing={l}
              />
            ))}
          </div>

          <LoadMoreButton
            totalLoaded={listings.length}
            hasMore={hasMore}
            onLoadMore={onLoadMore}
          />
        </>
      )}
    </div>
  );
}