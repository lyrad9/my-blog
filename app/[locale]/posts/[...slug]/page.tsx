import { posts } from "#site/content";
import { MDXContent } from "@/src/features/mdx/mdx-components";
import { Separator } from "@/src/components/ui/separator";
import { getCurrentLocale } from "@/locales/server";
import { notFound } from "next/navigation";
import { ChangeLocalPost } from "@/app/[locale]/posts/[...slug]/_components/ChangeLocalPost";
import { Section } from "@/src/components/shared/Section";
import {
  formatDateToLocal,
  formateDate,
} from "@/src/components/utils/functions";
import { getI18n } from "@/locales/server";
import Link from "next/link";
import { Code } from "@/src/components/shared/Code";
import { setStaticParamsLocale } from "next-international/server";
import { Spacing } from "@/src/components/shared/Spacing";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ViewCount } from "./_components/ViewCount";

import { ArrowLeft } from "lucide-react";
import { Heart } from "lucide-react";
import { LikesCount } from "./_components/LikesCount";
import { IncrementLikesCountBtn } from "./_components/IncrementLikesCountBtn";
import { MdxImage } from "@/src/features/mdx/MdxImage";
// export const dynamic = "force-static";
// export const revalidate = 0;
async function getPostFromParams(slugParams: string[]) {
  console.log("getPostParams", slugParams);
  const slug = slugParams?.join("/");
  console.log(slug);
  const post = posts.find((post) => post.slug === slug);
  console.log("post", post);
  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params.slug);

  if (!post) {
    return {
      title: "404 - Page Not Found",
      description: "Page not found",
    };
  }
  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: siteConfig.author, url:"https://lyrad.vercel.app" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://darylblog/${post.slug}/vercel.app`,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
   
    category: post.categories.join(','),
    keywords: post.meta.keywords,
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
    alternates: post.versions
      ? {
          languages: Object.entries(post.versions).reduce(
            (acc, [lang, url]) => {
              acc[lang as "fr" | "en"] = url;
              return acc;
            },
            {} as Record<"fr" | "en", string>
          ),
        }
      : {},
  };
}

export interface PostPageProps {
  params: {
    slug: string[];
    locale: string;
  };
}

export async function generateStaticParams() {
  // : Promise<{ slug: string[] }[]>
  //return getStaticParams();
  return posts.map((post) => ({ slug: post.slug.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  setStaticParamsLocale(params.locale);
  console.log(params);
  const t = await getI18n();

  const post = await getPostFromParams(params.slug);
  if (!post || !post?.published) {
    notFound();
  }
  // const views = (await redis.get<number>(`postview:${post.slug}`)) ?? 0;
  return (
    <Section className="relative">
      <Spacing size="md" />
      <article className="article">
        <div className="grid gap-3">
          <div>
            <div className="flex flex-row  mb-3 text-sm">
              <Link
                href="/posts"
                className="group flex flex-row items-center space-x-1"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 duration-300 group-hover:text-muted-foreground"
                />
                <span className="text-lg size-6 group-hover:text-muted-foreground duration-300">
                  Back
                </span>
              </Link>
            </div>
            <div className="text-base flex flex-row space-x-2 items-center">
              <span className="text-base text-muted-foreground">
                {formateDate(post.date)}
              </span>
              <span className="h-1 w-1 bg-muted-foreground  rounded-full" />
              {<ViewCount slug={post.slug} />}
              <span className="h-1 w-1 bg-muted-foreground  rounded-full" />
              <LikesCount slug={post.slug} />
              <span className="h-1 w-1 bg-muted-foreground  rounded-full" />
              <span>{<ChangeLocalPost params={params} />}</span>
            </div>
          </div>
          <h1 className=" text-4xl max-md:text-3xl font-bold">{post.title}</h1>

          <p className="text-lg text-muted-foreground">
            {t("whoAndWhenWrittenPost", {
              author: (
                <span className="  underline font-bold">Ngako Daryl</span>
              ),
              date: formatDateToLocal(
                post.date,
                params.locale === "fr" ? "fr-FR" : "en-EN"
              ),
            })}
          </p>
          <div>
            {" "}
            <IncrementLikesCountBtn slug={post.slug} />
          </div>
        </div>
      
        <Separator className="my-4" />
        <div id="prose" className="prose prose-invert text-muted-foreground">
          <MDXContent code={post.body} />
        </div>
      </article>
      <Spacing size="md" />
    </Section>
  );
}
