export default function PropertyOverview({ listing }) {
  const specs = [
    {
      icon: <HomeIcon />,
      label: "Type",
      value: listing.property_type,
    },
    {
      icon: <BedIcon />,
      label: "Bedrooms",
      value: listing.bedrooms,
    },
    {
      icon: <BathIcon />,
      label: "Bathrooms",
      value: listing.bathrooms,
    },
    {
      icon: <TagIcon />,
      label: "Status",
      value:
        listing.property_status === "rent" ? "For Rent" : "For Sale",
    },
    {
      icon: <CheckCircleIcon />,
      label: "Availability",
      value:
        listing.occupancy_status === "available" ? "Available" : "Occupied",
    },
  ];

  return (
    <section
      className="rounded-2xl border border-border bg-card
                 p-6 sm:p-8"
    >
      <h2 className="text-xl font-bold">Overview</h2>

      <div
        className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
                   gap-y-6 gap-x-4"
      >
        {specs.map((spec) => (
          <div key={spec.label} className="flex flex-col gap-1.5">
            <span className="inline-flex items-center gap-1.5
                             text-xs text-muted-foreground">
              <span className="text-muted-foreground">{spec.icon}</span>
              {spec.label}
            </span>
            <span className="text-base font-semibold text-foreground leading-tight">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- Icons ----------------------------- */

function Icon({ children, size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {children}
    </svg>
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

function TagIcon() {
  return (
    <Icon>
      <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <circle cx="7" cy="7" r="1.5" />
    </Icon>
  );
}

function CheckCircleIcon() {
  return (
    <Icon>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </Icon>
  );
}