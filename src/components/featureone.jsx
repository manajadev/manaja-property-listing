import FeatureCard from "./featurecard";
import FeatureItem from "./featureitem";

const CARDS = [
  {
    image:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200&auto=format&fit=crop",
    alt: "Luxury pool with palm trees at a resort",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    alt: "Modern glass-walled villa exterior",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    alt: "Modern wood-paneled residence",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    alt: "Contemporary house with pool at dusk",
    mobileOnly: true,
  },
];

export default function FeatureOne() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <ContourPattern />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-center">
          {/* LEFT — cards. 4 on mobile, 3 on sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6">
            {CARDS.map((card) => (
              <div
                key={card.image}
                className={card.mobileOnly ? "sm:hidden" : ""}
              >
                <FeatureCard image={card.image} alt={card.alt} />
              </div>
            ))}
          </div>

          {/* RIGHT — content */}
          <div>
            <p
              className="text-xs sm:text-sm font-medium tracking-[0.2em]
                         text-champagne uppercase"
            >
              Where luxury finds you
            </p>

            <h2
              className="mt-4 font-serif
                         text-3xl sm:text-4xl lg:text-5xl
                         leading-[1.1] tracking-tight text-foreground"
            >
              Find Your New
              <br />
              Home With Us
            </h2>

            <p
              className="mt-5 text-sm sm:text-base
                         text-muted-foreground leading-relaxed
                         max-w-[52ch]"
            >
              With over 2,000 verified listings across Africa&apos;s finest
              locations, Manaja Solutions connects you with luxury apartments,
              premium land, and investment opportunities you can trust.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              <FeatureItem
                icon={<HandshakeIcon />}
                title="Trusted Listings"
                subtitle="Verified by Manaja"
              />
              <FeatureItem
                icon={<ChartUpIcon />}
                title="Buy a Home"
                subtitle="No hidden fees"
              />
              <FeatureItem
                icon={<ClipboardCheckIcon />}
                title="Free Valuation"
                subtitle="Expert appraisal"
              />
              <FeatureItem
                icon={<CameraIcon />}
                title="Professional Photos"
                subtitle="Every listing"
              />
            </div>
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none select-none
                   absolute right-0 bottom-0
                   font-serif uppercase
                   text-[120px] sm:text-[180px] lg:text-[260px]
                   leading-none tracking-tight
                   text-foreground/3 dark:text-foreground/5
                   translate-y-6 lg:translate-y-12
                   hidden md:block"
      >
        Luxury
      </span>
    </section>
  );
}

/* --------------------------------------------------------- */

function ContourPattern() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1400 660"
      preserveAspectRatio="none"
      className="absolute inset-0 pointer-events-none opacity-[0.10] z-0"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M-200 120 C 300 40, 900 180, 1600 80" />
        <path d="M-200 240 C 300 160, 900 280, 1600 180" />
        <path d="M-200 360 C 300 280, 900 400, 1600 300" />
        <path d="M-200 480 C 300 400, 900 520, 1600 420" />
        <path d="M-200 600 C 300 520, 900 640, 1600 540" />
      </g>
    </svg>
  );
}

/* ----------------------------- Icons ----------------------------- */

function Icon({ children, size = 22 }) {
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

function HandshakeIcon() {
  return (
    <Icon>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </Icon>
  );
}

function ChartUpIcon() {
  return (
    <Icon>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </Icon>
  );
}

function ClipboardCheckIcon() {
  return (
    <Icon>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </Icon>
  );
}

function CameraIcon() {
  return (
    <Icon>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </Icon>
  );
}