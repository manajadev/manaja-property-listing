"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeSwitch from "./themeswitch";

const CATEGORIES = [
  { href: "/apartment", label: "Apartment" },
  { href: "/duplex", label: "Duplex" },
  { href: "/land", label: "Land" },
  { href: "/commercial-property", label: "Commercial" },
  { href: "/event-center-venue", label: "Event Center" },
];

const ABOUT_URL = "https://manaja.solutions";
const PHONE = "+234 814 694 6985";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef(null);

  // Close the desktop dropdown when clicking outside
  useEffect(() => {
    const onClick = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="sticky top-0 z-50
                   border-b border-border
                   bg-background/80 backdrop-blur-md
                   supports-backdrop-filter:bg-background/60"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* LEFT — logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <Logo />
            </Link>

            {/* CENTER — nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-1 ml-4">
              <Link
                href="/"
                className="relative px-3 py-2 text-sm rounded-md
                           text-muted-foreground hover:text-foreground
                           hover:bg-muted transition-colors"
              >
                Home
              </Link>

              <Link
                href="/#properties"
                className="relative px-3 py-2 text-sm rounded-md
                           text-muted-foreground hover:text-foreground
                           hover:bg-muted transition-colors"
              >
                Properties
              </Link>

              {/* Categories dropdown */}
              <div ref={catRef} className="relative">
                <button
                  type="button"
                  onClick={() => setCatOpen((v) => !v)}
                  aria-expanded={catOpen}
                  aria-haspopup="true"
                  className="relative inline-flex items-center gap-1
                             px-3 py-2 text-sm rounded-md
                             text-muted-foreground hover:text-foreground
                             hover:bg-muted transition-colors"
                >
                  Categories
                  <ChevronDownIcon
                    className={[
                      "transition-transform duration-200",
                      catOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>

                {catOpen && (
                  <div
                    className="absolute left-0 top-full mt-2
                               min-w-[200px]
                               rounded-xl border border-border
                               bg-card shadow-lg
                               p-1.5
                               animate-in fade-in slide-in-from-top-1"
                  >
                    {CATEGORIES.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setCatOpen(false)}
                        className="block px-3 py-2 text-sm rounded-md
                                   text-muted-foreground
                                   hover:text-foreground
                                   hover:bg-muted
                                   transition-colors"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* About → external */}
              <a
                href={ABOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-1
                           px-3 py-2 text-sm rounded-md
                           text-muted-foreground hover:text-foreground
                           hover:bg-muted transition-colors"
              >
                About
                <ExternalIcon />
              </a>
            </nav>

            {/* RIGHT — actions */}
            <div className="flex items-center gap-3">
              {/* Phone */}
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="hidden md:inline-flex items-center gap-2
                           text-sm font-medium text-foreground
                           hover:text-primary transition-colors"
              >
                <PhoneIcon />
                <span>{PHONE}</span>
              </a>

              {/* Theme switch */}
              <ThemeSwitch />

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="lg:hidden inline-flex items-center justify-center
                           w-10 h-10 rounded-lg
                           border border-border
                           hover:bg-muted transition-colors"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer — rendered outside <header> so stacking is clean */}
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden={!open}
        className={[
          "lg:hidden fixed inset-0 z-[60] bg-black/50",
          "transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Panel */}
      <aside
        className={[
          "lg:hidden fixed top-0 right-0 z-[70]",
          "h-full w-1/2 min-w-[260px] max-w-[400px]",
          "bg-background border-l border-border",
          "flex flex-col",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        aria-hidden={!open}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border shrink-0">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex items-center justify-center
                       w-10 h-10 rounded-lg
                       hover:bg-muted transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Panel nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="px-3 py-3 rounded-md text-sm font-medium
                       hover:bg-muted transition-colors"
          >
            Home
          </Link>

          <Link
            href="/#properties"
            onClick={() => setOpen(false)}
            className="px-3 py-3 rounded-md text-sm font-medium
                       hover:bg-muted transition-colors"
          >
            Properties
          </Link>

          <div className="mt-3 px-3">
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Categories
            </p>
          </div>
          <div className="flex flex-col">
            {CATEGORIES.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm
                           text-muted-foreground
                           hover:text-foreground
                           hover:bg-muted transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </div>

          <div className="h-px bg-border my-3" />

          <a
            href={ABOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="px-3 py-3 rounded-md text-sm font-medium
                       hover:bg-muted transition-colors
                       inline-flex items-center gap-1.5"
          >
            About
            <ExternalIcon />
          </a>
        </nav>

        {/* Panel footer — phone */}
        <div className="border-t border-border px-4 py-4 shrink-0">
          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2
                       text-sm font-medium text-foreground
                       hover:text-primary transition-colors"
          >
            <PhoneIcon />
            <span>{PHONE}</span>
          </a>
        </div>
      </aside>
    </>
  );
}

/* --------------------------------------------------------------- */
/* Logo                                                             */
/* --------------------------------------------------------------- */

function Logo() {
  return (
    <picture>
      <source srcSet="/logo-dark.png" media="(prefers-color-scheme: dark)" />
      <img
        src="/logo.png"
        alt="Manaja"
        width={28}
        height={28}
        className="h-8 w-auto object-contain"
      />
    </picture>
  );
}

/* --------------------------------------------------------------- */
/* Icons                                                           */
/* --------------------------------------------------------------- */

function Icon({ children, size = 16, className = "" }) {
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
      className={`shrink-0 ${className}`}
    >
      {children}
    </svg>
  );
}

function MenuIcon() {
  return (
    <Icon>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </Icon>
  );
}

function CloseIcon() {
  return (
    <Icon>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </Icon>
  );
}

function ChevronDownIcon({ className = "" }) {
  return (
    <Icon size={14} className={className}>
      <polyline points="6 9 12 15 18 9" />
    </Icon>
  );
}

function PhoneIcon() {
  return (
    <Icon size={15}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Icon>
  );
}

function ExternalIcon() {
  return (
    <Icon size={12}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </Icon>
  );
}