"use client";

const BEDS = ["any", 1, 2, 3, 4, 5];
const BATHS = ["any", 1, 2, 3, 4];

export default function CategoryFilters({
  filters,
  onChange,
  resultCount,
}) {
  const fieldClass =
    "w-full rounded-lg border border-border bg-card text-card-foreground " +
    "px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-ring/50";

  const set = (key) => (e) =>
    onChange({ ...filters, [key]: e.target.value });

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-4">
      {/* Rent / Sale toggle */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange({ ...filters, status: "rent" })}
          className={[
            "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            filters.status === "rent"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/70",
          ].join(" ")}
        >
          Rentals
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...filters, status: "sale" })}
          className={[
            "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            filters.status === "sale"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/70",
          ].join(" ")}
        >
          Sales
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...filters, status: "all" })}
          className={[
            "rounded-lg px-3 py-2 text-xs transition-colors",
            filters.status === "all"
              ? "text-foreground font-medium"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          All
        </button>
      </div>

      {/* Filter grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Bedrooms</span>
          <select
            className={fieldClass}
            value={filters.minBeds}
            onChange={set("minBeds")}
          >
            <option value="any">Any</option>
            {BEDS.slice(1).map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Bathrooms</span>
          <select
            className={fieldClass}
            value={filters.minBaths}
            onChange={set("minBaths")}
          >
            <option value="any">Any</option>
            {BATHS.slice(1).map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Min price</span>
          <input
            type="number"
            min={0}
            placeholder="Min"
            className={fieldClass}
            value={filters.minPrice}
            onChange={set("minPrice")}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Max price</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            className={fieldClass}
            value={filters.maxPrice}
            onChange={set("maxPrice")}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Sort</span>
          <select
            className={fieldClass}
            value={filters.sort}
            onChange={set("sort")}
          >
            <option value="price-asc">Price: low → high</option>
            <option value="price-desc">Price: high → low</option>
            <option value="beds-desc">Most bedrooms</option>
          </select>
        </label>
      </div>

      {/* Result count + reset */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-sm text-muted-foreground">
          {resultCount} {resultCount === 1 ? "property" : "properties"}
        </p>
        <button
          type="button"
          onClick={() =>
            onChange({
              status: "all",
              minBeds: "any",
              minBaths: "any",
              minPrice: "",
              maxPrice: "",
              sort: "price-asc",
            })
          }
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}