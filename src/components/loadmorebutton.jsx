"use client";

export const MAX_LISTINGS = 100;
export const PAGE_SIZE = 20;

export default function LoadMoreButton({
  currentLimit,
  totalLoaded,
  onLoadMore,
  hasMore,
}) {
  if (!hasMore) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-muted-foreground">
          All listings loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-6">
      <button
        type="button"
        onClick={onLoadMore}
        className="inline-flex items-center gap-2
                   rounded-xl
                   border border-border
                   bg-card text-card-foreground
                   px-6 py-3 text-sm font-medium
                   hover:bg-muted transition-colors"
      >
        Load more properties
        <ChevronDownIcon />
      </button>
      <p className="mt-2 text-xs text-muted-foreground">
        Showing {totalLoaded} of up to {MAX_LISTINGS}
      </p>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}