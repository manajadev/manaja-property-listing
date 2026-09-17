"use client";

import { useEffect, useState } from "react";

export default function PropertyActions({ title = "" }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";

    // Native share (mobile, some desktop browsers)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: title || document.title,
          url,
        });
        return;
      } catch (err) {
        // User cancelled — do nothing
        if (err?.name === "AbortError") return;
        // Fall through to clipboard
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Last resort: prompt
      window.prompt("Copy this link:", url);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative flex items-center gap-2 lg:justify-end">
      <ActionButton
        onClick={handleShare}
        icon={<ShareIcon />}
        label="Share"
      />
      <ActionButton
        onClick={handlePrint}
        icon={<PrintIcon />}
        label="Print"
      />

      {/* Copied toast */}
      {copied && (
        <span
          role="status"
          className="absolute -bottom-9 right-0
                     rounded-lg bg-foreground text-background
                     px-3 py-1.5 text-xs font-medium
                     shadow-md animate-in fade-in slide-in-from-top-1"
        >
          Link copied
        </span>
      )}
    </div>
  );
}

/* --------------------------------------------------------- */

function ActionButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5
                 rounded-lg border border-border
                 px-3 py-1.5 text-xs
                 text-muted-foreground hover:text-foreground
                 hover:bg-muted transition-colors"
    >
      {icon}
      {label}
    </button>
  );
}

function Icon({ children, size = 14 }) {
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
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

function ShareIcon() {
  return (
    <Icon>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.6" y1="10.7" x2="15.4" y2="6.3" />
      <line x1="8.6" y1="13.3" x2="15.4" y2="17.7" />
    </Icon>
  );
}

function PrintIcon() {
  return (
    <Icon>
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </Icon>
  );
}