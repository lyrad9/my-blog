import {posts} from "#site/content"
import { sortPosts } from "@/src/components/utils/functions";
import { NextResponse,NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
  //  if(!req ) return  NextResponse.error()
    const body= await req.json()
    const filteredPosts = posts.filter((post) => post.lang === body.locale)
       const sortedPosts = sortPosts(filteredPosts)
  const recentPosts = sortedPosts.slice(0,3)
  console.log(JSON.stringify(recentPosts))
    return NextResponse.json({ posts: recentPosts });
  }
  