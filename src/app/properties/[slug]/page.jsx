import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchListings } from "@/lib/apiservice";
import { listingSlug } from "@/lib/slugify";
import { CATEGORIES } from "@/lib/categories";
import PropertyGallery from "@/components/properties/propertygallery";
import PropertyHeader from "@/components/properties/propertyheader";
import PropertyBody from "@/components/properties/propertybody";
import PropertyManager from "@/components/properties/propertymanager";
import RelatedProperties from "@/components/properties/relatedproperties";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  let listing = null;
  try {
    const all = await fetchListings({ limit: 100, offset: 0 });
    listing = all.find((l) => listingSlug(l) === slug) || null;
  } catch {
    // fall through
  }

  if (!listing) return {};

  const location = [listing.house_number, listing.address, listing.state]
    .filter(Boolean)
    .join(", ");

  const description =
    listing.description ||
    `${listing.property_type} in ${location}. Verified listing on Manaja Solutions.`;

  return {
    title: listing.name,
    description,
    alternates: { canonical: `/properties/${slug}` },
    openGraph: {
      title: `${listing.name} | Manaja Solutions`,
      description,
      url: `/properties/${slug}`,
      images:
        listing.property_interior_images?.[0] ||
        listing.property_exterior_images?.[0]
          ? [
              {
                url:
                  listing.property_interior_images?.[0] ||
                  listing.property_exterior_images[0],
              },
            ]
          : [],
    },
  };
}

export default async function PropertyDetailPage({ params }) {
  const { slug } = await params;

  let all = [];
  let listing = null;
  let error = null;

  try {
    all = await fetchListings({ limit: 100, offset: 0 });
    listing = all.find((l) => listingSlug(l) === slug) || null;
  } catch (e) {
    error = e.message || "Failed to load listing";
  }

  if (error) {
    return (
      <main className="min-h-screen">
        <section className="container mx-auto px-4 py-12">
          <div className="rounded-xl border border-destructive/40
                          bg-destructive/10 text-destructive p-6 text-sm">
            Couldn&apos;t load listing. {error}
          </div>
        </section>
      </main>
    );
  }

  if (!listing) {
    notFound();
  }

  const cat = CATEGORIES.find((c) => c.value === listing.property_type);
  const categoryLabel = cat?.label || listing.property_type;
  const categorySlug = cat?.slug || "";

  const images = [
    ...(listing.property_interior_images || []),
    ...(listing.property_exterior_images || []),
  ];

  // Related: same category, excluding current, cap at 4 for the sidebar
  const related = all
    .filter(
      (l) =>
        l.property_type === listing.property_type &&
        listingSlug(l) !== slug
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 py-6 sm:py-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm
                     text-muted-foreground hover:text-foreground
                     transition-colors mb-4"
        >
          <ArrowLeftIcon />
          Back to listings
        </Link>

        {/* Gallery */}
        <PropertyGallery images={images} name={listing.name} />

        {/* Header */}
        <div className="mt-8">
          <PropertyHeader
            listing={listing}
            categoryLabel={categoryLabel}
            categorySlug={categorySlug}
          />
        </div>

        {/* Body + sidebar */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8">
          {/* Main content */}
          <PropertyBody listing={listing} />

          {/* Sidebar — sticky on desktop */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <PropertyManager manager={listing.manager} />
            <RelatedProperties listings={related} />
          </div>
        </div>
      </section>
    </main>
  );
}

function ArrowLeftIcon() {
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
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}