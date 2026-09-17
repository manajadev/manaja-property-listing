import HeroContent from "./herocontent";
import PropertyImage from "./propertyimage";

export default function Hero() {
  return (
    <section className="pt-6 sm:pt-8" aria-label="Hero">
      <div className="container mx-auto px-4">
        <div
          className="relative rounded-3xl overflow-hidden
                     bg-hero-panel
                     grid grid-cols-1 lg:grid-cols-[52fr_48fr]
                     min-h-105 sm:min-h-130 lg:min-h-143"
        >
          <ContourPattern />
          <HeroContent />
          <PropertyImage />
        </div>
      </div>
    </section>
  );
}

function ContourPattern() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1400 660"
      preserveAspectRatio="none"
      className="absolute inset-0 pointer-events-none opacity-[0.18] z-0"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="var(--hero-panel-foreground)"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.5"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M-200 120 C 300 40, 900 180, 1600 80" />
        <path d="M-200 200 C 300 130, 900 260, 1600 170" />
        <path d="M-200 280 C 300 220, 900 340, 1600 260" />
        <path d="M-200 360 C 300 300, 900 420, 1600 340" />
        <path d="M-200 440 C 300 380, 900 500, 1600 420" />
        <path d="M-200 520 C 300 460, 900 580, 1600 500" />
        <path d="M-200 600 C 300 540, 900 660, 1600 580" />
      </g>
    </svg>
  );
}