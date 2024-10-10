"use server";
import { redis } from "@/src/lib/redis";
import crypto from "crypto";
import { headers } from "next/headers";
export async function getLikesCount(slug: string) {
  const viewKey = `postlike:${slug}`;
  const likesCount = Number(await redis.get(viewKey));
  return { views: Number(likesCount) };
}
