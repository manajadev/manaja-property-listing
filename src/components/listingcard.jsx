import Link from "next/link";
import { formatPrice } from "@/lib/apiservice";
import { listingSlug } from "@/lib/slugify";

export default function ListingCard({ listing }) {
  const image =
    listing.property_interior_images?.[0] ??
    listing.property_exterior_images?.[0] ??
    null;

  const location = [listing.house_number, listing.address, listing.state, listing.country]
    .filter(Boolean)
    .join(", ");

  const slug = listingSlug(listing);

  return (
    <Link
      href={`/properties/${slug}`}
      className="flex flex-col group"
    >
      {/* Image */}
      <div className="aspect-16/10 bg-muted rounded-xl overflow-hidden relative">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={listing.name}
            className="h-full w-full object-cover
                       group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-muted-foreground">
            <ImageOffIcon />
          </div>
        )}

        {/* Status badge */}
        <span
          className="absolute top-2 left-2 rounded-full
                     bg-primary text-primary-foreground
                     px-2.5 py-0.5 text-xs font-medium"
        >
          {listing.property_status === "rent" ? "For Rent" : "For Sale"}
        </span>

        {/* Occupancy badge */}
        <span
          className="absolute top-2 right-2 rounded-full
                     bg-card/90 text-card-foreground backdrop-blur-sm
                     px-2.5 py-0.5 text-xs font-medium capitalize"
        >
          {listing.occupancy_status}
        </span>
      </div>

      {/* Body */}
      <div className="pt-3 flex flex-col gap-2 grow">
        <h3 className="font-semibold text-base leading-tight line-clamp-2
                       group-hover:text-primary transition-colors">
          {listing.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-1 inline-flex items-center gap-1.5">
          <PinIcon />
          <span className="truncate">{location}</span>
        </p>

        <p className="text-lg font-bold">
          {formatPrice(listing.price)}
          {listing.property_status === "rent" && (
            <span className="text-sm font-normal text-muted-foreground">
              {" "}/year
            </span>
          )}
        </p>

        <div className="text-sm text-muted-foreground flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <BedIcon />
            {listing.bedrooms}
          </span>
          <span className="inline-flex items-center gap-1">
            <BathIcon />
            {listing.bathrooms}
          </span>
          <span className="inline-flex items-center gap-1">
            <HomeIcon />
            {listing.property_type}
          </span>
        </div>

        {listing.features?.length ? (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {listing.features.slice(0, 3).join(" · ")}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

/* ----------------------------- Icons ----------------------------- */

function Icon({ children, size = 14 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

function PinIcon() {
  return (
    <Icon>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  );
}

function BedIcon() {
  return (
    <Icon>
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </Icon>
  );
}

function BathIcon() {
  return (
    <Icon>
      <path d="M10 4 8 6" />
      <path d="M17 19v2" />
      <path d="M2 12h20" />
      <path d="M7 19v2" />
      <path d="M9 5 7.5 3.5a2.1 2.1 0 0 0-3 3L7 8" />
      <path d="M2 12v5a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-5" />
    </Icon>
  );
}

function HomeIcon() {
  return (
    <Icon>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </Icon>
  );
}

function ImageOffIcon() {
  return (
    <Icon size={24}>
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" />
      <path d="M13.5 6H19a2 2 0 0 1 2 2v8" />
      <path d="M6 6h.01" />
      <path d="M3 3v14a2 2 0 0 0 2 2h14" />
    </Icon>
  );
}