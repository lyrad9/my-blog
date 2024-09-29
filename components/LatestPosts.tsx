import React from "react";
import { posts } from "#site/content";
import { Section } from "./Section";
import { sortPosts } from "@/lib/utils";
import { useCurrentLocale } from "@/locales/client";
import { ItemLatestPosts } from "./ItemLatestPosts";
import { getCurrentLocale,getI18n, } from "@/locales/server";
export const LatestPosts = async() => {
    const t = await getI18n()
  const locale = getCurrentLocale();
  const sortedPosts = sortPosts(
    posts.filter((post) => post.published && post.lang === locale)
  );
  const newestPosts = sortedPosts.slice(0, 3);
  return (
    <Section>
      <p className="mb-8 font-mono text-xl font-bold">{t("newestPosts")}</p>
      <div className="grid gap-8">
        {newestPosts.map((post) => {
          const { date, title,fullDescription,slugAsParams } = post;
          return (
            <div className="" key={slugAsParams}>
              <ItemLatestPosts
              
                slug={slugAsParams}
                date={date}
                title={title}              
                fullDescription={fullDescription}
              />
            </div>
          );
        })}
      </div>
    </Section>
  );
};
