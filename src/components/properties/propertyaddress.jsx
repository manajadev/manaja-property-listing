export default function PropertyAddress({ listing }) {
  const items = [
    { label: "Address", value: listing.house_number, prefix: "" },
    { label: "Street", value: listing.address },
    { label: "City / State", value: listing.state },
    { label: "Country", value: listing.country },
    { label: "Zip / Postal code", value: listing.zip_code },
  ].filter((i) => i.value);

  return (
    <section
      className="rounded-2xl border border-border bg-card
                 p-6 sm:p-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Address</h2>
        <ChevronUpIcon />
      </div>

      <div
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                   gap-y-4 gap-x-8"
      >
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-sm font-medium text-foreground mt-0.5">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
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