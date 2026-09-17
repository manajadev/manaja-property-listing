import Link from "next/link";
import { formatPrice } from "@/lib/apiservice";
import { listingSlug } from "@/lib/slugify";

export default function RelatedProperties({ listings = [] }) {
  if (listings.length === 0) return null;

  return (
    <aside
      className="rounded-2xl border border-border bg-card
                 p-6 space-y-5"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-champagne">
          Similar
        </p>
        <h3 className="mt-2 font-serif text-xl">
          More in this category
        </h3>
      </div>

      <ul className="space-y-4">
        {listings.map((l, i) => {
          const image =
            l.property_interior_images?.[0] ??
            l.property_exterior_images?.[0] ??
            null;

          const location = [l.address, l.state].filter(Boolean).join(", ");
          const slug = listingSlug(l);

          return (
            <li key={`${l.name}-${l.address}-${i}`}>
              <Link
                href={`/properties/${slug}`}
                className="group flex gap-3 items-start"
              >
                {/* Thumbnail */}
                <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={l.name}
                      className="w-full h-full object-cover
                                 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-muted-foreground">
                      <ImageOffIcon />
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <h4
                    className="text-sm font-semibold leading-tight line-clamp-2
                               group-hover:text-primary transition-colors"
                  >
                    {l.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {location}
                  </p>
                  <p className="text-sm font-bold mt-1">
                    {formatPrice(l.price)}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

/* --------------------------------------------------------- */

function ImageOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" />
      <path d="M13.5 6H19a2 2 0 0 1 2 2v8" />
      <path d="M6 6h.01" />
      <path d="M3 3v14a2 2 0 0 0 2 2h14" />
    </svg>
  );
}