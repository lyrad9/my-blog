"use server"
import { redis } from "@/src/lib/redis";
import crypto from "crypto";
import { headers } from "next/headers";


export async function incrementViews(slug: string) {
  const headersList = headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");

  const ipSource = forwardedFor || realIp || "localhost";

  const ip = ipSource.split(",")[0].trim();

  const hashedIp = crypto.createHash("sha256").update(ip).digest("hex");

  const viewKey = ["pageviews", "blogs", slug].join(":");
  const ipViewKey = ["ip", hashedIp, "views", slug].join(":");

  const hasViewed = await redis.get(ipViewKey);

  let viewCount: number;

  if (!hasViewed) {
    const pipeline = redis.pipeline();
    pipeline.incr(viewKey);
    pipeline.set(ipViewKey, "1");
    await pipeline.exec();

    viewCount = (await redis.get<number>(viewKey)) ?? 0;
    return {  views: Number(viewCount) };
  } else {
    viewCount = (await redis.get<number>(viewKey)) ?? 0;
    return { views:  Number(viewCount) };
  }
}

