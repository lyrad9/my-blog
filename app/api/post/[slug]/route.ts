import { posts } from "#site/content";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  props: { params: { slug: string } }
) => {
  const { slug } = props.params;

  const post = posts.filter((post) => post.slug === slug )

  return NextResponse.json(post);
};
