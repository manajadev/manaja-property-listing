export default function PropertyManager({ manager }) {
  const hasContact =
    manager &&
    (manager.preferred_phone || manager.preferred_email);

  if (!hasContact) {
    return null;
  }

  return (
    <aside
      className="rounded-2xl border border-border bg-card
                 p-6 space-y-5"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-champagne">
          Contact
        </p>
        <h3 className="mt-2 font-serif text-xl">
          Speak with the property manager
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Ask about availability, pricing, or schedule a viewing.
        </p>
      </div>

      <div className="space-y-2.5">
        {manager.preferred_phone && (
          <a
            href={`tel:${manager.preferred_phone}`}
            className="w-full inline-flex items-center justify-center gap-2
                       rounded-xl
                       bg-primary text-primary-foreground
                       px-4 py-3 text-sm font-medium
                       hover:opacity-90 transition-opacity"
          >
            <PhoneIcon />
            Call
          </a>
        )}
        {manager.preferred_email && (
          <a
            href={`mailto:${manager.preferred_email}`}
            className="w-full inline-flex items-center justify-center gap-2
                       rounded-xl
                       border border-border
                       px-4 py-3 text-sm font-medium
                       hover:bg-muted transition-colors"
          >
            <MailIcon />
            Email
          </a>
        )}
      </div>

      <div className="flex gap-6 border-t border-border pt-3 items-center">
        {manager.preferred_phone && (
        <div>
          <p className="text-xs text-muted-foreground">Direct line</p>
          <p className="text-sm font-medium mt-0.5">
            {manager.preferred_phone}
          </p>
        </div>
      )}

      {manager.preferred_email && (
        <div>
          <p className="text-xs text-muted-foreground">Email</p>
          <p className="text-sm font-medium mt-0.5 break-all">
            {manager.preferred_email}
          </p>
        </div>
      )}
      </div>

      <p className="mt-1 text-sm"><span className="font-bold uppercase text-sm ">Please Note</span>: Kindly verify property before making any payment.</p>
    </aside>
    
  );
}

/* --------------------------------------------------------- */

function Icon({ children, size = 15 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function PhoneIcon() {
  return (
    <Icon>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Icon>
  );
}

function MailIcon() {
  return (
    <Icon>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </Icon>
  );
}