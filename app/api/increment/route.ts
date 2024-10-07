import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { redis } from '@/src/lib/redis';
// const redis = Redis.fromEnv();
// export const runtime = 'edge';
import crypto from "crypto";
import { headers } from "next/headers";
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  let slug: string | undefined = undefined;
  if ('slug' in body) {
    slug = body.slug;
  }
  if (!slug) {
    return new NextResponse('Slug not found', { status: 400 });
  }
  const KEY = `postview:${body.slug}`;
  const headersList = headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");

  const ipSource = forwardedFor || realIp || "localhost";

  const ip = ipSource.split(",")[0].trim();

  const hashedIp = crypto.createHash("sha256").update(ip).digest("hex");

  //const ip = req.ip;
  //if (ip) {
    // Hash the IP in order to not store it directly in your db.
    const buf = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(ip),
    );
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    // deduplicate the ip for each slug
    const isNew = await redis.set(['ip', hash, slug].join(':'), true, {
      nx: true,
      ex: 24 * 60 * 60,
    });
    if (isNew) {
      await redis.incr(KEY);
      return new NextResponse(null, { status: 202 });
    } else {
    
      return new NextResponse(null, { status: 202 });
     
    }

    if (!isNew) {
      new NextResponse(null, { status: 202 });
    }
 // }
  console.log("test 1")
  await redis.incr(`postview:${slug}`);
  return new NextResponse(null, { status: 202 });
}
