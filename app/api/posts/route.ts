import {posts} from "#site/content"
import { sortPosts } from "@/src/components/utils/functions";
import { NextResponse,NextRequest } from 'next/server';
export async function GET(req: NextRequest) {
  //  if(!req ) return  NextResponse.error()
    // const body= await req.json()
  const {searchParams} = new URL(req.url)
 const locale = searchParams.get("locale")

    // Vérifier si la langue est spécifiée
    if (!locale) {
        return NextResponse.json({ error: 'Locale not specified' }, { status: 400 });
      }
  
    const filteredPosts = posts.filter((post) => post.lang === locale)
       const sortedPosts = sortPosts(filteredPosts)
  const recentPosts = sortedPosts.slice(0,3)
  console.log(JSON.stringify(recentPosts))
    return NextResponse.json({ posts: recentPosts });
  }
  