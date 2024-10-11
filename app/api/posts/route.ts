import {posts} from "#site/content"
import { sortPosts } from "@/src/components/utils/functions";
import { NextResponse,NextRequest } from 'next/server';
export async function GET(req: NextRequest) {
  //  if(!req ) return  NextResponse.error()
    const body = await req.body()
    const filteredPosts = posts.filter((post) => post.lang === body.lang)
       const sortedPosts = sortPosts(filteredPosts)
  const recentPosts = sortedPosts.slice(0,3)
  
    return NextResponse.json({ posts: recentPosts });
  }
  