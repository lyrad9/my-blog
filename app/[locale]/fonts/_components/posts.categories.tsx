"use client";
import React from "react";
import { Code } from "@/src/components/shared/Code";
import { useI18n, useScopedI18n } from "@/locales/client";
/* import { tabCategories } from "../../../../src/components/utils/constants"; */
import { Categories } from "@/src/components/utils/categories";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/src/components/svg/icons";
import { cn } from "@/src/lib/utils";
import { buttonVariants } from "@/src/components/ui/button";
export const CategoriesPosts = ({ className }: { className?: string }) => {

  const t = useI18n();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPostURL = (category: string) => {
    const params = new URLSearchParams(searchParams ?? undefined);
    if (params.has("category", category)) params.set("category", "");
    else params.set("category", category);

    if (pathname?.match(/^\/(fr|en)$/))
      return `${pathname}/posts/?${params.toString()}`;
    return `${pathname}?${params.toString()}`;
  };
  // console.log(pathname?.match(/^\/(fr|en)$/));

  return (
    <section className={className}>
      <p
        className={cn("mb-8 font-caption text-3xl", {
          // "tracking-wider": !pathname.match(/^\/(fr|en)$/),
        })}
      >
        {t("categoriesPosts")}
      </p>
      <div className="flex flex-wrap gap-4">
        {Categories.map((category, index) => (
          <Link key={index} href={createPostURL(category.name)}>
          
              <Code
              className={cn(
                "flex items-center gap-2 px-2 py-1 rounded-sm border-none text-sm text-muted-foreground dark:bg-accent bg-muted",
                {
                  "dark:text-primary/60 dark:bg-primary/20 bg-primary/10 text-primary ":
                    searchParams?.has("category", category.name),
                }
              )}
            >
              {category.icon}
              {category.name}
            </Code>
          </Link>
        ))}
      </div>
    </section>
  );
};
