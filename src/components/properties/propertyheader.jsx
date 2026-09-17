import Link from "next/link";
import { formatPrice } from "@/lib/apiservice";
import PropertyActions from "./propertyactions";

export default function PropertyHeader({ listing, categoryLabel, categorySlug }) {
  const isRent = listing.property_status === "rent";
  const location = [listing.house_number, listing.address, listing.state, listing.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span aria-hidden="true">›</span>
        <Link
          href={`/${categorySlug}`}
          className="hover:text-foreground transition-colors"
        >
          {categoryLabel}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-foreground truncate">{listing.name}</span>
      </nav>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full
                         bg-primary text-primary-foreground
                         px-3 py-1 text-xs font-medium">
          {isRent ? "Rentals" : "Sales"}
        </span>
        <span className="inline-flex items-center rounded-full
                         border border-border
                         px-3 py-1 text-xs font-medium">
          {categoryLabel}
        </span>
        <span className="inline-flex items-center rounded-full
                         border border-border
                         px-3 py-1 text-xs font-medium capitalize">
          {listing.occupancy_status}
        </span>
      </div>

      {/* Title + price + actions */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="min-w-0">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
            {listing.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground inline-flex items-center gap-1.5">
            <PinIcon />
            <span className="truncate">{location}</span>
          </p>
        </div>

        <div className="lg:text-right shrink-0">
          <p className="text-3xl sm:text-4xl font-bold">
            {formatPrice(listing.price)}
            {isRent && (
              <span className="text-base font-normal text-muted-foreground">
                {" "}/ month
              </span>
            )}
          </p>

          <div className="mt-3">
            <PropertyActions title={listing.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- */

function PinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}