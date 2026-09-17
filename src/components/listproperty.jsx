export default function ListProperty() {
  return (
    <section className="py-16 sm:py-20" aria-label="List your property">
      <div className="container mx-auto px-4">
        <div
          className="relative overflow-hidden rounded-3xl
                     text-hero-panel-foreground"
        >
          {/* Background image — covers the whole panel */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cta-image.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

          {/* Overlay — gradient from panel bg on left to transparent on right.
              Keeps text readable while letting the image breathe. */}
          <div
            aria-hidden="true"
            className="absolute inset-0
                       bg-linear-to-r
                       from-hero-panel via-hero-panel/95 to-hero-panel/40
                       dark:from-hero-panel dark:via-hero-panel/95 dark:to-hero-panel/40"
          />

          {/* Content — sits above the overlay */}
          <div
            className="relative z-10
                       grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]
                       gap-10 lg:gap-6
                       px-6 sm:px-10 lg:px-16
                       py-14 sm:py-20 lg:py-28"
          >
            {/* Left — content */}
            <div className="flex flex-col justify-center max-w-xl">
              <h2
                className="font-serif
                           text-3xl sm:text-4xl lg:text-5xl
                           leading-[1.1] tracking-tight"
              >
                List your property
              </h2>

              <p
                className="mt-5 text-sm sm:text-base
                           text-hero-panel-foreground/80
                           leading-relaxed max-w-[52ch]"
              >
                Reach thousands of verified buyers across Africa. Get your
                listing in front of serious investors today — from luxury
                apartments to prime land, all in one place.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://manaja.solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2
                             rounded-xl
                             bg-charcoal text-charcoal-foreground
                             px-5 py-3 text-sm font-medium
                             hover:opacity-90 transition-opacity"
                >
                  Visit Manaja Solutions
                  <ArrowUpRightIcon />
                </a>

                <a
                  href="https://app.manaja.solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2
                             rounded-xl
                             border border-hero-panel-foreground/25
                             px-5 py-3 text-sm font-medium
                             hover:bg-hero-panel-foreground/10
                             transition-colors"
                >
                  Get Started
                  <ArrowUpRightIcon />
                </a>
              </div>
            </div>

            {/* Right column — reserved space for visual balance on desktop.
                The background image occupies this side. */}
            <div className="hidden lg:block" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- */

function ArrowUpRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}