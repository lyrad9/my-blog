import React from "react";
import { Separator } from "@/src/components/ui/separator";
import { posts } from "#site/content";
import { getCurrentLocale } from "@/locales/server";
import { PostItem } from "@/app/[locale]/posts/posts.item";
import { sortPosts } from "@/src/components/utils/functions";
import { PageProps } from "@/src/components/utils/types";
import { Spacing } from "@/src/components/shared/Spacing";
import { Section } from "@/src/components/shared/Section";
import { CategoriesPosts } from "@/app/[locale]/fonts/_components/posts.categories";
import { useCurrentLocale } from "@/locales/client";
import { Post } from "#site/content";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
const BlogPage = async ({
  searchParams,
}: {
  searchParams?: { category?: string };
}) => {
  // const t = await getI18n();
  const locale = getCurrentLocale();
  const category = searchParams?.category;
  const filteredPosts = category
    ? posts.filter(
        (post) =>
          post.published &&
          // process.env.NODE_ENV === "development" &&
          post.lang === locale &&
          post.categories.includes(searchParams?.category as string)
      )
    : posts.filter(
        (post) =>
          post.published &&
          // process.env.NODE_ENV === "production" &&
          post.lang === locale
      );

  const sortedPosts = sortPosts(filteredPosts);

  return (
    <Section>
      <Spacing size="md" />
      <div className="flex flex-col gap-8">
        <CategoriesPosts />
        <div>
          <h1 className="text-2xl">
            Posts
          </h1>

          <Separator className="my-4" />
          {/* {sortedPosts.length === 0 ? (
            <div className="w-full mt-8 flex justify-center items-center">
              Aucun post trouvé
            </div>
          ) : ( */}
          <div className="flex flex-col gap-8">
            {sortedPosts.map((post) => {
              const { slug, date, title, description, categories } = post;
              return (
                <Link href={`posts/${slug}`} className="" key={slug}>
                  <PostItem
                    categories={categories}
                    slug={slug}
                    date={date}
                    title={title}
                    description={description}
                  />
                </Link>
              );
            })}
          </div>

          {/* )} */}
        </div>
      </div>

      <Spacing size="md" />
    </Section>
  );
};

export default BlogPage;
