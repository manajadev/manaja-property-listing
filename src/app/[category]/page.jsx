import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchListings } from "@/lib/apiservice";
import {
  CATEGORIES,
  getCategoryBySlug,
} from "@/lib/categories";
import CategoryView from "@/components/categories/categoryview";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};

  const title = `${cat.label} — Properties`;
  const description = `Browse verified ${cat.label.toLowerCase()} listings across Africa. Filter by bedrooms, bathrooms, price, and rent or sale.`;

  return {
    title,
    description,
    alternates: { canonical: `/${cat.slug}` },
    openGraph: {
      title: `${title} | Manaja Solutions`,
      description,
      url: `/${cat.slug}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  let listings = [];
  let error = null;

  try {
    const all = await fetchListings({ limit: 100, offset: 0 });
    listings = all.filter((l) => l.property_type === cat.value);
  } catch (e) {
    error = e.message || "Failed to load listings";
  }

  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm
                     text-muted-foreground hover:text-foreground
                     transition-colors mb-4"
        >
          <ArrowLeftIcon />
          Back to listings
        </Link>

        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Properties listed in {cat.label}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Verified {cat.label.toLowerCase()} listings across Africa.
          </p>
        </div>

        {error ? (
          <div
            className="rounded-xl border border-destructive/40
                       bg-destructive/10 text-destructive p-6 text-sm"
          >
            Couldn&apos;t load listings. {error}
          </div>
        ) : listings.length === 0 ? (
          <div
            className="min-h-[60vh] flex items-center justify-center
                       rounded-xl border border-dashed border-border
                       p-12 text-center text-muted-foreground"
          >
            <div>
              <p className="text-base font-medium text-foreground">
                No {cat.label.toLowerCase()} listings yet
              </p>
              <p className="text-sm mt-1">
                Check back soon — or{" "}
                <Link href="/" className="underline hover:text-foreground">
                  browse all properties
                </Link>
                .
              </p>
            </div>
          </div>
        ) : (
          <CategoryView listings={listings} categoryLabel={cat.label} />
        )}
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