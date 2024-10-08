import React from "react";
import { posts } from "#site/content";
import { Section } from "./Section";
import { sortPosts } from "@/src/components/utils/functions";
import { useCurrentLocale } from "@/locales/client";
import { ItemLatestPosts } from "./ItemLatestPosts";
import { getCurrentLocale, getI18n } from "@/locales/server";
import Link from "next/link";
export const LatestPosts = async ({ className }: { className?: string }) => {
  const t = await getI18n();
  const locale = getCurrentLocale();
  const sortedPosts = sortPosts(
    posts.filter(
      (post) =>
        post.published &&
        process.env.NODE_ENV === "development" &&
        post.lang === locale
    )
  );
  const newestPosts = sortedPosts.slice(0, 3);
  return (
    <section className={className}>
      <p className="mb-8 font-caption text-xl">{t("newestPosts")}</p>
      <div className="grid gap-8">
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
