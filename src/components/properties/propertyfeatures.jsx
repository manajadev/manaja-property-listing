export default function PropertyFeatures({ listing }) {
  const features = listing.features || [];

  if (features.length === 0) return null;

  return (
    <section
      className="rounded-2xl border border-border bg-card
                 p-6 sm:p-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Features</h2>
        <ChevronUpIcon />
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-foreground">
          Amenities
        </h3>

        <ul
          className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                     gap-x-8 gap-y-3"
        >
          {features.map((f) => (
            <li
              key={f}
              className="inline-flex items-center gap-2
                         text-sm text-muted-foreground"
            >
              <CheckCircleIcon />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- */

function CheckCircleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-champagne"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-muted-foreground"
    >
      <polyline points="6 15 12 9 18 15" />
    </svg>
  );
}