"use client";

import { useState } from "react";
import PhotoModal from "./photomodal";

export default function PropertyGallery({ images = [], name = "" }) {
  const [open, setOpen] = useState(false);

  // Ensure at least 5 slots
  const gallery = [...images];
  while (gallery.length > 0 && gallery.length < 5) {
    gallery.push(gallery[0]);
  }
  const top = gallery.slice(0, 5);
  const totalRealImages = images.length;

  if (top.length === 0) {
    return (
      <div className="aspect-16/10 sm:aspect-21/9 rounded-2xl bg-muted grid place-items-center text-muted-foreground">
        No images
      </div>
    );
  }

  return (
    <>
      <div
        className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr]
                   gap-2 sm:gap-3
                   rounded-2xl overflow-hidden"
      >
        {/* Hero image */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open photo gallery"
          className="relative lg:row-span-2 aspect-16/10 lg:aspect-auto
                     lg:min-h-[520px] bg-muted group cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={top[0]}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover
                       group-hover:scale-[1.02] transition-transform duration-500"
            loading="eager"
            fetchPriority="high"
          />
        </button>

        {/* Right tiles */}
        <div className="hidden lg:contents">
          {top.slice(1, 5).map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={i === 3 ? "See all photos" : `Open photo ${i + 2}`}
              className="relative aspect-4/3 bg-muted group cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${name} — photo ${i + 2}`}
                className="absolute inset-0 w-full h-full object-cover
                           group-hover:scale-[1.03] transition-transform duration-500"
                loading="lazy"
              />
              {i === 3 && (
                <div
                  className="absolute inset-0 bg-black/40
                             flex items-center justify-center
                             text-white text-sm font-medium
                             group-hover:bg-black/50 transition-colors"
                >
                  See all {totalRealImages} photos
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <PhotoModal
          images={images.length > 0 ? images : top}
          name={name}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}