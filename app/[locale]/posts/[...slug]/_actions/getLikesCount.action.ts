"use server";
import { redis } from "@/src/lib/redis";

export async function getLikesCount(slug: string) {
  const viewKey = `postlike:${slug}`;
   const likesCount = Number(await redis.get(viewKey));

  return { likes: likesCount};
}
