import { fetchListings } from "@/lib/apiservice";
import Hero from "@/components/hero";
import ListingsExplorerContainer from "@/components/listingsexplorercontainer";
import FeatureOne from "@/components/featureone";
import FeaturedListings from "@/components/featuredlistings";
import Testimonials from "@/components/testimonials";
import ListProperty from "@/components/listproperty";

export default async function Home() {
  let listings = [];
  let error = null;

  try {
    listings = await fetchListings({ limit: 20, offset: 0 });
  } catch (e) {
    error = e.message || "Failed to load listings";
  }

  return (
    <main className="min-h-screen">
      <Hero />

      <section className="container mx-auto px-4 py-8 sm:py-12" id="properties">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold">Properties</h2>
          <p className="text-sm text-muted-foreground">
            Premium &amp; verified listings across Africa.
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
            className="rounded-xl border border-dashed border-border
                       p-12 text-center text-muted-foreground"
          >
            No properties are listed yet.
          </div>
        ) : (
          <ListingsExplorerContainer initialListings={listings} />
        )}
      </section>

      <FeatureOne />
      <FeaturedListings listings={listings} />
      <Testimonials />
      <ListProperty />
    </main>
  );
}