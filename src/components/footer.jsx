import Link from "next/link";
import { formatPrice } from "@/lib/apiservice";

const PROPERTY_TYPES = [
  { value: "Flat/Apartment", label: "Apartment", slug: "apartment" },
  { value: "Duplex", label: "Duplex", slug: "duplex" },
  { value: "Land", label: "Land", slug: "land" },
  { value: "Commercial property", label: "Commercial", slug: "commercial-property" },
  { value: "Event center/Venue", label: "Event Center", slug: "event-center-venue" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/manaja-solutions", icon: LinkedInIcon },
  { label: "Instagram", href: "https://www.instagram.com/manaja.solutions", icon: InstagramIcon },
];

const CONTACT = {
  address: "Lagos, Nigeria",
  phone: "+234 814 694 6985",
  email: "hello@manaja.solutions",
};

export default function Footer({ listings = [] }) {
  // Featured — take first 2
  const featured = listings.slice(0, 2);

  // Category counts
  const counts = listings.reduce((acc, l) => {
    acc[l.property_type] = (acc[l.property_type] || 0) + 1;
    return acc;
  }, {});

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* About */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Manaja Solutions is committed to delivering a high level of
              expertise, customer service, and attention to detail in the
              marketing and sales of luxury real estate across Africa.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center
                             w-9 h-9 rounded-lg
                             bg-muted text-muted-foreground
                             hover:bg-primary hover:text-primary-foreground
                             transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Featured Properties */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              Featured Properties
            </h3>
            <ul className="space-y-4">
              {featured.map((l, i) => {
                const image =
                  l.property_interior_images?.[0] ??
                  l.property_exterior_images?.[0] ??
                  null;
                return (
                  <li key={`${l.name}-${i}`} className="flex items-start gap-3">
                    <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={image}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-tight line-clamp-2">
                        {l.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatPrice(l.price)}
                        {l.property_status === "rent" && " / month"}
                      </p>
                    </div>
                  </li>
                );
              })}
              {featured.length === 0 && (
                <li className="text-sm text-muted-foreground">
                  No listings yet.
                </li>
              )}
            </ul>
          </div>

          {/* Listings by Category */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              Listings by Category
            </h3>
            <ul className="space-y-2.5">
              {PROPERTY_TYPES.map((type) => {
                const count = counts[type.value] || 0;
                return (
                  <li key={type.slug}>
                    <Link
                      href={`/${type.slug}`}
                      className="text-sm text-muted-foreground
                                 hover:text-foreground transition-colors
                                 inline-flex items-center gap-1.5"
                    >
                      {type.label}
                      <span className="text-xs opacity-70">({count})</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <PinIcon />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <PhoneIcon />
                <a href={`tel:${CONTACT.phone}`} className="hover:text-foreground transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MailIcon />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-foreground transition-colors">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Copyright Manaja Solutions. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link href="https://www.manaja.solutions/terms-of-use" target="_blank" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Use
            </Link>
            <Link href="https://www.manaja.solutions/privacy-policy" target="_blank" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="https://www.manaja.solutions/cookie-policy" target="_blank" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
            <BackToTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------------------------------- */
/* Back to top                                               */
/* --------------------------------------------------------- */

function BackToTopButton() {
  return (
    <a
      href="#"
      aria-label="Back to top"
      className="inline-flex items-center justify-center
                 w-7 h-7 rounded-md
                 border border-border
                 text-muted-foreground
                 hover:bg-muted transition-colors"
    >
      <ChevronUpIcon />
    </a>
  );
}

/* --------------------------------------------------------- */
/* Icons                                                     */
/* --------------------------------------------------------- */

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

function PinIcon() {
  return (
    <Icon>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
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

function ChevronUpIcon() {
  return (
    <Icon size={14}>
      <polyline points="6 15 12 9 18 15" />
    </Icon>
  );
}

function FacebookIcon() {
  return (
    <Icon size={15}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Icon>
  );
}

function WhatsAppIcon() {
  return (
    <Icon size={15}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </Icon>
  );
}

function TelegramIcon() {
  return (
    <Icon size={15}>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7z" />
    </Icon>
  );
}

function TikTokIcon() {
  return (
    <Icon size={15}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </Icon>
  );
}

function LinkedInIcon() {
  return (
    <Icon size={15}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Icon>
  );
}

function YouTubeIcon() {
  return (
    <Icon size={15}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </Icon>
  );
}

function InstagramIcon() {
  return (
    <Icon size={15}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </Icon>
  );
}

function Logo() {
  return (
    <picture>
      <source srcSet="/logo.png" media="(prefers-color-scheme: dark)" />
      <img
        src="/logo.png"
        alt="Manaja"
        width={28}
        height={28}
        className="h-10 w-auto object-contain"
      />
    </picture>
  );
}