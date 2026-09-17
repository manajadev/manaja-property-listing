"use client";

import { useState, useTransition } from "react";
import ListingsExplorer from "./listingsxplorer";
import { MAX_LISTINGS, PAGE_SIZE } from "./loadmorebutton";

export default function ListingsExplorerContainer({ initialListings }) {
  const [listings, setListings] = useState(initialListings);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [isPending, startTransition] = useTransition();

  const hasMore = limit < MAX_LISTINGS && listings.length >= limit;

  const handleLoadMore = async () => {
    const nextLimit = Math.min(limit + PAGE_SIZE, MAX_LISTINGS);

    // Fetch fresh from the API
    const res = await fetch(
      `/api/listings?limit=${nextLimit}&offset=0`
    );
    if (!res.ok) return;
    const fresh = await res.json();

    startTransition(() => {
      setListings(fresh);
      setLimit(nextLimit);
    });
  };

  return (
    <ListingsExplorer
      listings={listings}
      onLoadMore={handleLoadMore}
      hasMore={hasMore}
    />
  );
}