import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { Separator } from "@/components/ui/separator";
import { getCurrentLocale } from "@/locales/server";
import { notFound } from "next/navigation";
import { ChangeLocalPost } from "@/components/ChangeLocalPost";
import { Section } from "@/components/Section";
import { formatDateToLocal, formateDate } from "@/lib/utils";
import { getI18n } from "@/locales/server";
import Link from "next/link";
import { Code } from "@/components/Code";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from "@/locales/server";
import { Spacing } from "@/components/Spacing";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
// export const dynamic = "force-static";
async function getPostFromParams( slugParams: string[]) {
  console.log("getPostParams",slugParams);
  const slug = slugParams?.join("/");
  console.log(slug);
  const post = posts.find((post) => post.slugAsParams === slug);
console.log("post",post)
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

  // const ogSearchParams = new URLSearchParams();
  // ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    // openGraph: {
    //   title: post.title,
    //   description: post.description,
    //   type: "article",
    //   url: post.slug,
    //   images: [
    //     {
    //       url: `/api/og?${ogSearchParams.toString()}`,
    //       width: 1200,
    //       height: 630,
    //       alt: post.title,
    //     },
    //   ],
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: post.title,
    //   description: post.description,
    //   images: [`/api/og?${ogSearchParams.toString()}`],
    // },
  };
}

export interface PostPageProps {
  params: {
    slug: string[];
    locale: string;
  };
}

export async function generateStaticParams() {
  // : Promise<
  //   { slug: string[] }[]

  // >
  //return getStaticParams();
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  setStaticParamsLocale(params.locale);
  console.log(params);

  const t = await getI18n();

  const post = await getPostFromParams(params.slug);
  if (!post || !post?.published) {
    notFound();
  }
  return (
    <Section>
         <Spacing size="md" />
      <article className="">
        <div className="grid gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Link className="hover:text-muted-foreground" href="/posts">
                <span className="cursor-pointer underline font-semibold">
                  {t("back")}
                </span>
              </Link>

              <div className="w-1 h-1 bg-foreground dark:bg-primary-foreground rounded-full" />
              <span> {new Date(post.date).toLocaleDateString()}</span>
              {post.otherSlug && <ChangeLocalPost params={params} />}
            </div>
          </div>
          <div className="max-w-2xl">
            <h1 className="m-none text-6xl max-sm:text-3xl font-bold ">
              {" "}
              {post.title}
            </h1>
          </div>

          <p className="text-sm text-muted-foreground">
            {t("whoAndWhenWrittenPost", {
              author: (
                <span className=" text-primary underline font-bold">
                  Ngako Daryl
                </span>
              ),
              date: formatDateToLocal(
                post.date,
                params.locale === "fr" ? "fr-FR" : "en-EN"
              ),
            })}
          </p>

          <p>
            {post.lang === "fr" && (
              <Code className="text-sm text-blue-500 dark:text-blue-500">
                version française
              </Code>
            )}
            {post.lang === "en" && (
              <Code className="text-sm text-foreground text-blue-500 dark:text-blue-500">
                english version
              </Code>
            )}
          </p>
        </div>

        <Separator className="my-4" />
        <MDXContent code={post.body} />
      </article>
      <Spacing size="md" />
    </Section>
  );
}
