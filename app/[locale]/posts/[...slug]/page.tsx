import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { Separator } from "@/src/components/ui/separator";
import { getCurrentLocale } from "@/locales/server";
import { notFound } from "next/navigation";
import { ChangeLocalPost } from "@/components/ChangeLocalPost";
import { Section } from "@/components/Section";
import { formatDateToLocal } from "@/src/components/utils/functions";
import { getI18n } from "@/locales/server";
import Link from "next/link";
import { Code } from "@/components/Code";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from "@/locales/server";
import { Spacing } from "@/components/Spacing";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ViewCount } from "./ViewCount";
import { ChevronLeft } from "lucide-react"
import { redis } from "@/src/lib/redis";
import { ReportView } from "./view";
// export const dynamic = "force-static";
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

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: siteConfig.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://darylblog/${post.slug}/vercel.app`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
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
  const views =(await redis.get<number>(`postview:${post.slug}`)) ?? 0;
  return (
    <Section>
        <ReportView slug={post.slug} />
      <Spacing size="md" />
      <article className="article">
        <div className="grid gap-3">
          <div>
            <Link
              className="mb-2 w-8 h-8 border rounded-full bg-muted hover:bg-foreground/10 dark:bg-muted/30 dark:hover:bg-muted/50 flex justify-center items-center cursor-pointer "
              href="/posts"
            >
              <ChevronLeft className=" text-muted-foreground dark:text-primary-foreground " size={15} />

              {/* {t("back")} */}
            </Link>
            <div className="flex gap-2">
              <span className="text-muted-foreground">
                {" "}
                {new Date(post.date).toLocaleDateString()} |{" "}
                {/* {<ViewCount slug={post.slug} />} */}
                {views}
              </span>

              {post.translation && <ChangeLocalPost params={params} />}
            </div>
          </div>
          <h1 className=" text-5xl max-sm:text-3xl font-bold">{post.title}</h1>

          <p className="text-sm text-muted-foreground">
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
          <div className="flex max-sm:flex-col max-sm:gap-2 justify-between">
            <div className="flex gap-2">
              <Code className="px-1 rounded-md text-sm text-blue-900 dark:text-blue-500">
                {post.lang === "fr" ? "Version française" : "English version"}
              </Code>

              <Code className="rounded-md text-primary text-sm px-1 py-0">
                {post.categories.join(",")}
              </Code>
            </div>
          </div>
        </div>

        <Separator className="my-4" />
        <div className="text-muted-foreground">
          <MDXContent code={post.body} />
        </div>
      </article>
      <Spacing size="md" />
    </Section>
  );
}
