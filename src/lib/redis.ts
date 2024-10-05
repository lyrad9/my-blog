import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: 'https://subtle-wasp-26319.upstash.io',
  token: process.env.UPSTASH_REDIS_TOKEN,
});
