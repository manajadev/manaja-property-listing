export default function HeroContent() {
  return (
    <div
      className="relative z-10 flex flex-col justify-center
                 text-hero-panel-foreground
                 px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-20"
    >
      {/* Eyebrow / tagline */}
      <p
        className="relative z-10 mb-3 sm:mb-4
                   text-xs sm:text-sm font-medium tracking-wide
                   text-champagne uppercase"
      >
        Premium &amp; verified property listing guaranteed.
      </p>

      {/* Heading — serif */}
      <h1
        className="relative z-10 font-serif
                   text-3xl sm:text-4xl lg:text-6xl xl:text-7xl
                   leading-[1.05] tracking-tight
                   max-w-[18ch]"
      >
        Discover Your Perfect Space
      </h1>

      {/* Body */}
      <p
        className="relative z-10 mt-5 sm:mt-6
                   text-sm sm:text-base
                   text-hero-panel-foreground/75
                   max-w-[52ch] leading-relaxed"
      >
        Explore exclusive properties across Africa&apos;s finest locations.
        From luxury apartments to investment opportunities, find what matters
        most to you.
      </p>
    </div>
  );
}