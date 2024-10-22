"use client";
import React from "react";
import { Code } from "@/src/components/shared/Code";
import { useI18n, useScopedI18n } from "@/locales/client";
import { tabCategories } from "../../../../src/components/utils/constants";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/src/lib/utils";
export const CategoriesPosts = ({ className }: { className?: string }) => {
  const t = useI18n();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPostURL = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.has("category", category)) params.set("category", "");
    else params.set("category", category);

    if (pathname.match(/^\/(fr|en)$/))
      return `${pathname}/posts/?${params.toString()}`;
    return `${pathname}?${params.toString()}`;
  };
  console.log(pathname.match(/^\/(fr|en)$/));

  return (
    <section className={className}>
      <p
        className={cn("mb-8 font-caption text-2xl", {
          // "tracking-wider": !pathname.match(/^\/(fr|en)$/),
        })}
      >
        {t("categoriesPosts")}
      </p>
      <div className="flex flex-wrap gap-4">
        {tabCategories.map((category, index) => (
          <Link key={index} href={createPostURL(category)}>
            <Code
              className={cn(
                "px-2 py-1 rounded-sm border-none text-sm text-muted-foreground dark:bg-accent bg-muted",
                {
                  "dark:text-primary/60 dark:bg-primary/20 bg-primary/10 text-primary ":
                    searchParams.has("category", category),
                }
              )}
            >
              {category}
            </Code>
          </Link>
        ))}
      </div>
    </section>
  );
};
