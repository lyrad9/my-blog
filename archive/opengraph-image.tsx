import { Post } from "@/.velite";
import { ImageResponse } from "next/og";
import { OgImage } from "../app/[locale]/posts/[...slug]/OgImage";
import { getUrl } from "../app/[locale]/posts/[...slug]/getUrl";

const URL = getUrl();

export const alt = "Codelynx posts image preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OgImagePage({
  params
}: {
  params: {
    locale: string;
    slug: string[];
  };
}) {
  const slug = params.slug.join("/");
  const post = (await fetch(`${URL}/api/post/${slug}`).then((res) =>
    res.json()
  )) as Post;

  return new ImageResponse(<OgImage post={post} url={URL} />, {
    ...size,
  });
}
