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
export interface PostPageProps {
  params: {
    slug: string[];
  };
}
async function getPostFromParams(params: PostPageProps["params"]) {
  console.log(params);
  const slug = params?.slug?.join("/");
  console.log(slug);
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}
export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}
export default async function PostPage({ params }: PostPageProps) {
  console.log(params);
  const locale = getCurrentLocale();
  const t = await getI18n();
  console.log(locale);
  const post = await getPostFromParams(params);
  if (!post || !post?.published) {
    notFound();
  }
  return (
    <Section>
      <article className=" ">
        <div className="grid gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Link className="hover:text-muted-foreground" href="/posts">
                <span className="cursor-pointer underline font-semibold">
                  {t("back")}
                </span>
              </Link>

              <div className="w-1 h-1 bg-foreground dark:bg-primary-foreground rounded-full" />
              <span> {formateDate(post.date)}</span>
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
                locale === "fr" ? "fr-FR" : "en-EN"
              ),
            })}
          </p>

          <p >
            {post.lang === "fr" && <Code className="text-sm text-blue-500 dark:text-blue-500">version française</Code>}
            {post.lang === "en" && <Code className="text-sm text-foreground text-blue-500 dark:text-blue-500">english version</Code>}
          </p>
        </div>

        <Separator className="my-4" />
        <MDXContent code={post.body} />
      </article>
    </Section>
  );
}
