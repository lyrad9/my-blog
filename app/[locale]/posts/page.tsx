import React from "react";
import { Separator } from "@/components/ui/separator";
import { posts } from "#site/content";
import { getCurrentLocale } from "@/locales/server";
import { PostItem } from "@/components/post.item";
import { sortPosts } from "@/lib/utils";

import { Section } from "@/components/Section";
const BlogPage = async () => {
  // const t = await getI18n();
  const locale = getCurrentLocale();
  const sortedPosts = sortPosts(
    posts.filter((post) => post.published && post.lang === locale)
  );
  const displayPosts = sortedPosts;

  return (
    <Section>
      <h1 className="inline-block font-black text-3xl tracking-wider font-mono lg:text-5xl">
        Posts
      </h1>

      <Separator className="mt-8" />
      <ul className="flex flex-col gap-4">
        {displayPosts.map((post) => {
          const { slug, date, title, description } = post;
          return (
            <li className="" key={slug}>
              <PostItem
                slug={slug}
                date={date}
                title={title}
                description={description}
              />
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

export default BlogPage;
