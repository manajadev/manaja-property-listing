"use client";

export default function SearchTabs({ active = "sales", onChange }) {
  const tabs = [
    { key: "sales", label: "Sales" },
    { key: "rentals", label: "Rentals" },
  ];

  return (
    <div
      className="inline-flex rounded-tl-2xl rounded-tr-2xl overflow-hidden
                 translate-y-px"
      role="tablist"
      aria-label="Listing type"
    >
      {tabs.map((t) => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange?.(t.key)}
            className={[
              "px-6 sm:px-8 py-3 text-sm font-medium transition-colors",
              isActive
                ? "bg-white dark:bg-card text-neutral-900 dark:text-foreground"
                : "bg-champagne text-champagne-foreground hover:opacity-95",
            ].join(" ")}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}