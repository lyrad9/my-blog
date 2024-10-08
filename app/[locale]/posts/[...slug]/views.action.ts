"use server";
import { redis } from "@/src/lib/redis";
import crypto from "crypto";
import { headers } from "next/headers";
export async function incrementViews(slug: string) {
  const headersList = headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const ipSource = forwardedFor || realIp;

  const ip = ipSource?.split(",")[0].trim();
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(ip ?? undefined)
  );
  const hash = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // const hashedIp = crypto.createHash("sha256").update(ip).digest("hex");

  const viewKey = `postview:${slug}`;

  const ipViewKey = ["ip", hash, slug].join(":");

  const hasViewed = await redis.get(ipViewKey);

  if (!hasViewed) {
    const newViewCount = await redis.incr(viewKey);
    return { views: Number(newViewCount) };
  } else {
    return {
      views: Number(await redis.get(viewKey)),
    };
  }
}
