
import { NextRequest } from "next/server";
import { CATEGORY_MAP, KEYWORDS, pickEuropeRegions } from "@/lib/youtube";

const API = "https://www.googleapis.com/youtube/v3";
const MAX = 20;

type Item = {
  id: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  thumbnail: string;
  viewCount?: string;
  region: string;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const region = (searchParams.get("region") || "KR").toUpperCase();
  const category = (searchParams.get("category") || "all") as keyof typeof CATEGORY_MAP;
  const q = (searchParams.get("q") || "").trim();
  const key = process.env.YT_API_KEY;
  if (!key) {
    return Response.json({ items: [], error: "Missing YT_API_KEY in environment." }, { status: 200 });
  }

  const regions = region === "EU" ? pickEuropeRegions() : [region];
  const results: Item[] = [];

  for (const r of regions) {
    const cat = CATEGORY_MAP[category];
    const url = new URL(`${API}/videos`);
    url.searchParams.set("key", key);
    url.searchParams.set("chart", "mostPopular");
    url.searchParams.set("part", "snippet,statistics");
    url.searchParams.set("regionCode", r);
    url.searchParams.set("maxResults", "30");
    if (typeof cat === "number" && cat > 0) url.searchParams.set("videoCategoryId", String(cat));

    const res = await fetch(url.toString(), { next: { revalidate: 180 } });
    if (!res.ok) continue;
    const data = await res.json();

    let items = (data.items || []).map((v: any) => ({
      id: v.id,
      title: v.snippet?.title || "",
      channelTitle: v.snippet?.channelTitle || "",
      publishedAt: v.snippet?.publishedAt || "",
      thumbnail: v.snippet?.thumbnails?.medium?.url || v.snippet?.thumbnails?.high?.url || "",
      viewCount: v.statistics?.viewCount,
      region: r
    })) as Item[];

    const filters: string[] = [];
    if (CATEGORY_MAP[category] === "keyword") filters.push(...(KEYWORDS[category] || []));
    if (q) filters.push(q);

    if (filters.length) {
      const rx = new RegExp(filters.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "i");
      items = items.filter(it => rx.test(it.title));
    }

    results.push(...items.slice(0, MAX));
  }

  const priority = new Map<string, number>([["KR", 3], ["US", 2], ["GB", 1], ["DE", 1], ["FR", 1], ["IT", 1], ["ES", 1], ["NL", 1], ["SE", 1]]);
  const uniq = new Map<string, Item>();
  for (const it of results) {
    const p = priority.get(it.region) || 0;
    const prev = uniq.get(it.id);
    if (!prev || (priority.get(prev.region) || 0) < p) uniq.set(it.id, it);
  }

  const items = Array.from(uniq.values()).slice(0, MAX);
  return Response.json({ items });
}
