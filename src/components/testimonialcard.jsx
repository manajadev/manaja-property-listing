export default function TestimonialCard({ name, role, quote }) {
  return (
    <article
      className="flex flex-col gap-4 rounded-2xl
                 border border-border bg-card
                 p-5
                 h-full"
    >
      {/* Stars */}
      <div className="flex gap-0.5 text-champagne" aria-label="5 out of 5 stars">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>

      {/* Quote */}
      <p className="text-sm text-muted-foreground leading-relaxed grow">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Author — no avatar */}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {name}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {role}
        </p>
      </div>
    </article>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l2.9 6.9 7.6.6-5.8 5 1.8 7.4L12 18l-6.5 3.9 1.8-7.4-5.8-5 7.6-.6L12 2z" />
    </svg>
  );
}