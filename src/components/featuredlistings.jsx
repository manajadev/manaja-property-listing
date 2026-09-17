import Link from "next/link";

const PROPERTY_TYPES = [
  { value: "Flat/Apartment", label: "Apartment", slug: "apartment", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop" },
  { value: "Duplex", label: "Duplex", slug: "duplex", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop" },
  { value: "Land", label: "Land", slug: "land", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop" },
  { value: "Commercial property", label: "Commercial", slug: "commercial-property", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" },
  { value: "Event center/Venue", label: "Event Center", slug: "event-center-venue", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800&auto=format&fit=crop" },
];

export default function FeaturedListings({ listings = [] }) {
  // Count listings per backend property_type
  const counts = listings.reduce((acc, l) => {
    const key = l.property_type;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="py-16 sm:py-20 lg:py-24" aria-label="Featured listings">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-10 sm:mb-12">
          Featured Listings
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {PROPERTY_TYPES.map((type) => {
            const count = counts[type.value] || 0;
            const label = count === 1 ? "listing" : "listings";

            return (
              <Link
                key={type.slug}
                href={`/${type.slug}`}
                className="group flex flex-col gap-4"
              >
                {/* Image */}
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={type.image}
                    alt={type.label}
                    className="absolute inset-0 w-full h-full object-cover
                               transition-transform duration-500
                               group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Label + count */}
                <div className="px-1">
                  <h3 className="font-semibold text-base sm:text-lg text-foreground">
                    {type.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {count} {label}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}