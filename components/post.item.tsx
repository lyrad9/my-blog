"use client";
import React from "react";

import { Calendar } from "lucide-react";

import { cn, formatDateToLocal } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";

import clsx from "clsx";
export interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
}
export const PostItem = ({ slug, title, description, date }: PostItemProps) => {
  const locale = useCurrentLocale();

  console.log(locale);
  const router = useRouter();

  return (
    <article
      onClick={() => router.push(slug)}
      className="cursor-pointer w-full flex max-sm:flex-col max-sm:items-start py-2  gap-2 border-border border-b justify-between items-center"
    >
      <div>
        <div>
          <h2
            className={clsx(
              "text-2xl font-bold text-primary dark:text-primary-foreground"
            )}
          >
            {title}
          </h2>
        </div>
        <div className="max-w-none text-muted-foreground"> {description}</div>
      </div>
      <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="font-caption  text-slate-500 dark:text-slate-300 flex gap-1">
          <Calendar className="h-4 w-4" />
          <time className="" dateTime={date}>
            {formatDateToLocal(date, locale === "fr" ? "fr-FR" : "en-EN")}
          </time>
        </dd>
      </dl>
    </article>
  );
};
{
  /* <Link
          href={slug}
          className={cn(
            buttonVariants({ variant: "link" }),
            "py-8 flex gap-2 items-center"
          )}
        >
          {t("readMore")}
          
          <MoveRight className="size-4" />
        </Link> */
}
