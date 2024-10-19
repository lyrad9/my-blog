"use client";
import React from "react";
import { formatDateToLocal } from "@/src/components/utils/functions";

import { useRouter } from "next/navigation";
import { useCurrentLocale } from "@/locales/client";
import { useI18n, useScopedI18n } from "@/locales/client";
import { Separator } from "../../../src/components/ui/separator";
import { ArrowUpRight } from "lucide-react";
import { PostItemProps } from "@/src/components/utils/types";
export const PostItem = ({
  slug,
  title,
  description,
  date,
  categories,
}: PostItemProps) => {
  const locale = useCurrentLocale();
  const t = useI18n();
  console.log(locale);
  const router = useRouter();

  return (
    <article className="flex flex-row justify-between items-center duration-300 md:hover:bg-muted md:p-4 rounded-lg cursor-pointer">
      <div className="flex flex-col gap-1">
        <h3 className="">{title}</h3>
        <div className="flex flex-row space-x-2 items-center text-sm text-muted-foreground">
          <span>
            {" "}
            {formatDateToLocal(date, locale === "fr" ? "fr-FR" : "en-EN")}
          </span>
          {/* <span className="h-1 w-1 bg-muted-foreground rounded-full" /> */}
          {/* <span>
                            <span>
                              {Intl.NumberFormat('en-US', {
                                notation: 'compact',
                              }).format(views[post.slug])}{' '}
                              {' views'}
                            </span>
                          </span> */}
          {/* <span className="h-1 w-1 bg-muted-foreground rounded-full" /> */}
        </div>
      </div>
      <ArrowUpRight size={16} />
    </article>
  );
};
