export default function CategoryMap({ count = 0, label = "" }) {
  return (
    <div
      className="relative w-full h-full min-h-80 lg:min-h-140
                 overflow-hidden rounded-2xl
                 border border-border bg-muted"
      aria-hidden="true"
    >
      {/* Static map image (decorative) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Soft tint so text is readable if we ever add chrome */}
      <div className="absolute inset-0 bg-background/10" />

      {/* Hover overlay — shows on mouse over, hides on leave */}
      <div
        className="absolute inset-0 flex items-center justify-center
                   bg-black/50 opacity-0 hover:opacity-100
                   transition-opacity duration-300
                   text-white text-center px-6"
      >
        <div>
          <p className="font-serif text-2xl sm:text-3xl">
            Map view coming soon
          </p>
          <p className="mt-2 text-sm text-white/80">
            {count} {count === 1 ? "property" : "properties"} in {label}
          </p>
        </div>
      </div>
    </div>
  );
}