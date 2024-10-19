import { NextResponse } from "next/server";
import { incrementViews } from "@/app/[locale]/posts/[...slug]/_actions/views.action";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  // Appeler la fonction incrementViews avec la requête pour traiter l'IP
  const result = await incrementViews(slug);

  return NextResponse.json({ views: result.views });
}
