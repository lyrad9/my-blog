"use server";
import { redis } from "@/src/lib/redis";
import crypto from "crypto";
import { headers } from "next/headers";
export async function incrementLikes(slug: string) {
  const headersList = headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  // const ipSource = forwardedFor || realIp;
  const ipSource = forwardedFor ? forwardedFor.split(",")[0] : realIp;
  // const ip = ipSource?.split(",")[0].trim();
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(ipSource ?? undefined)
  );
  const hash = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // const hashedIp = crypto.createHash("sha256").update(ip).digest("hex");

  const viewKey = `postlike:${slug}`;

  const ipViewKey = ["ip", hash, slug].join(":");


   const hasViewed = await redis.get(ipViewKey);
   if(hasViewed) return
  const isNew = await redis.set(ipViewKey, true
  /*   , {
    nx: true,
    ex: 24 * 60 * 60, 
  } */);
  const newLikeCount = await redis.incr(viewKey);
  return { likes: Number(newLikeCount) };

}
