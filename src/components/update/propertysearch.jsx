"use client";

import { useState } from "react";
import SearchTabs from "./searchtabs";
import SearchField from "./searchfield";

export default function PropertySearch() {
  const [tab, setTab] = useState("sales");

  return (
    <div className="max-w-[1000px] w-full">
      {/* Tabs — sit on top of the search box */}
      <SearchTabs active={tab} onChange={setTab} />

      {/* Search card — flush with tabs, top-left rounded, other corners rounded */}
      <div
        className="bg-white dark:bg-card rounded-b-2xl rounded-tr-2xl
                   shadow-[0_10px_40px_-12px_rgba(15,20,24,0.15)]
                   border border-neutral-100 dark:border-border
                   p-3 sm:p-4
                   grid grid-cols-1 md:grid-cols-[1fr_1.6fr_1fr_auto] gap-3 md:gap-0"
      >
        <SearchField
          label="Category"
          placeholder="Select Category"
          variant="select"
        />

        <SearchField
          label="Property Location"
          placeholder="Enter an address, state, city, area or zip code"
          variant="input"
          withDivider
        />

        <SearchField
          label="Bedrooms"
          placeholder="Select Bedrooms"
          variant="select"
          withDivider
        />

        <button
          type="button"
          aria-label="Search"
          className="rounded-xl bg-champagne text-champagne-foreground
                     h-12 md:h-auto md:w-14
                     inline-flex items-center justify-center
                     hover:opacity-90 transition-opacity
                     ml-0 md:ml-3"
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="20" y1="20" x2="16.5" y2="16.5" />
    </svg>
  );
}