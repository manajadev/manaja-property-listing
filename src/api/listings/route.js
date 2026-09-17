import { NextResponse } from "next/server";

const RAW_BASE = process.env.API_BASE_URL;
const API_BASE = RAW_BASE ? RAW_BASE.replace(/\/+$/, "") : null;

export async function GET(request) {
  if (!API_BASE) {
    return NextResponse.json(
      { error: "API_BASE_URL is not set" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 20, 1), 100);
  const offset = Math.max(Number(searchParams.get("offset")) || 0, 0);

  const url = new URL(`${API_BASE}/listings`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e.message || "Fetch failed" },
      { status: 500 }
    );
  }
}