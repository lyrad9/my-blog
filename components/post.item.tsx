"use client";
import React from "react";

import { Calendar } from "lucide-react";

import { cn, formatDateToLocal } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import Link from "next/link";
import clsx from "clsx";

import { useI18n, useScopedI18n } from "@/locales/client";
export interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
}
export const PostItem = ({ slug, title, description, date }: PostItemProps) => {
  const locale = useCurrentLocale();
  const t = useI18n();

  console.log(locale);
  const router = useRouter();

  return (
    <article
      onClick={() => router.push(`posts/${slug}`)}
      className="cursor-pointer w-full flex max-sm:flex-col sm:items-end py-4 border-border border-b justify-between "
    >
      <div className="flex flex-col gap-1">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className=" text-sm font-caption  text-slate-500 dark:text-slate-300 flex gap-1">
            <Calendar className="h-4 w-4" />
            <time className="" dateTime={date}>
              {formatDateToLocal(date, locale === "fr" ? "fr-FR" : "en-EN")}
            </time>
          </dd>
        </dl>
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
      </div>
      <div>
        {" "}
        <Link
          href={`posts/${slug}`}
          className="hover:underline transition-all text-primary text-sm"
        >
          {t("readArticle")}
        </Link>
      </div>
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
