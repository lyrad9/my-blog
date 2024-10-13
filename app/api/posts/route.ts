import { posts } from "#site/content";
import { sortPosts } from "@/src/components/utils/functions";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  // Liste blanche des origines autorisées
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://darylblog.vercel.app",
   " http://radylb.vercel.app"
  ];

  
  // Récupérer l'origine de la requête
  const origin = req.headers.get("origin");

  // Vérifier si l'origine est dans la liste blanche
  const isAllowedOrigin = allowedOrigins.includes(origin || "");

  if (!isAllowedOrigin) {
    // Si l'origine n'est pas autorisée, renvoyer une réponse 403 (Interdit)
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale");

  // Vérifier si la langue est spécifiée
  if (!locale) {
    return new NextResponse("Locale not specified", { status: 400 });
    // return NextResponse.json({ error: 'Locale not specified' }, { status: 400 });
  }

  const filteredPosts = posts.filter((post) => post.lang === locale);
  const sortedPosts = sortPosts(filteredPosts);
  const recentPosts = sortedPosts.slice(0, 3);
  console.log(JSON.stringify(recentPosts));
  const response = NextResponse.json({ posts: recentPosts });

  // Ajouter les en-têtes CORS
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin as string);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  }
  return response;
  // return NextResponse.json({ posts: recentPosts });
}
