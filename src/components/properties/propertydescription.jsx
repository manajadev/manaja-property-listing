export default function PropertyDescription({ listing }) {
  const text =
    listing.description ||
    "No description provided for this listing.";

  return (
    <section
      className="rounded-2xl border border-border bg-card
                 p-6 sm:p-8"
    >
      <h2 className="text-xl font-bold">Description</h2>
      <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
        {text}
      </p>
    </section>
  );
}