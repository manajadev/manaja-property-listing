"use client";

import { useEffect, useState } from "react";

export default function PhotoModal({ images = [], name = "", onClose }) {
  const [index, setIndex] = useState(0);

  // Keyboard navigation + body scroll lock
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [images.length, onClose]);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95
                 flex items-center justify-center
                 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photos of ${name}`}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6
                   z-10 inline-flex items-center justify-center
                   w-10 h-10 rounded-full
                   bg-white/10 text-white
                   hover:bg-white/20 transition-colors"
      >
        <CloseIcon />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-5 sm:top-7 sm:left-7 z-10
                      text-white/80 text-sm font-medium">
        {index + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous photo"
          className="absolute left-3 sm:left-6 z-10
                     inline-flex items-center justify-center
                     w-11 h-11 rounded-full
                     bg-white/10 text-white
                     hover:bg-white/20 transition-colors"
        >
          <ChevronLeftIcon />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-[92vw] max-h-[86vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[index]}
          alt={`${name} — photo ${index + 1}`}
          className="max-w-full max-h-[86vh] object-contain
                     rounded-lg select-none"
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next photo"
          className="absolute right-3 sm:right-6 z-10
                     inline-flex items-center justify-center
                     w-11 h-11 rounded-full
                     bg-white/10 text-white
                     hover:bg-white/20 transition-colors"
        >
          <ChevronRightIcon />
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2
                     flex gap-2 px-3 py-2 rounded-xl
                     bg-black/60 backdrop-blur-sm
                     max-w-[92vw] overflow-x-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={[
                "shrink-0 w-12 h-12 rounded-md overflow-hidden",
                "ring-2 transition-all",
                i === index
                  ? "ring-white"
                  : "ring-transparent opacity-60 hover:opacity-100",
              ].join(" ")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------- */

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}