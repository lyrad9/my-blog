"use server";
import { redis } from "@/src/lib/redis";

export async function getLikesCount(slug: string) {
  const viewKey = `postlike:${slug}`;
   const likesCount = Number(await redis.get(viewKey));
 const a = await redis.set(viewKey,{
    ["2"]:{productId:"fffffff"},
   })
   await redis.hget
  return { likes: likesCount};
}
