import React from "react";
import { posts } from "#site/content";
import { sortPosts } from "@/src/components/utils/functions";
import { ItemLatestPosts } from "@/src/features/posts/posts.latest.item";
import { getCurrentLocale, getI18n } from "@/locales/server";
import Link from "next/link";
export const LatestPosts = async ({ className }: { className?: string }) => {
  const t = await getI18n();
  const locale = getCurrentLocale();
  const sortedPosts = sortPosts(
    posts.filter(
      (post) =>
        post.published &&
        // process.env.NODE_ENV === "development"
        //  &&
        post.lang === locale
    )
  );
  const newestPosts = sortedPosts.slice(0, 3);
  return (
    <section className={className}>
      <p className="mb-8 font-caption text-3xl">{t("newestPosts")}</p>
      <div className="grid gap-16">
        {newestPosts.map((post) => {
          const { slug, date, title, description, categories } = post;
          return (
            <Link href={`posts/${slug}`} className="" key={slug}>
              <ItemLatestPosts
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
    </section>
  );
};
