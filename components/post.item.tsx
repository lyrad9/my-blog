"use client";
import React from "react";

import { Calendar } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { formatDateToLocal } from "@/src/components/utils/functions";
import { MoveRight } from "lucide-react";
import { Button } from "../src/components/ui/button";
import { useRouter } from "next/navigation";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import Link from "next/link";
import clsx from "clsx";
import { Code } from "./Code";
import { useI18n, useScopedI18n } from "@/locales/client";
import { Separator } from "../src/components/ui/separator";
export interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  categories: string[];
}
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
    <article
      onClick={() => router.push(`posts/${slug}`)}
      className="cursor-pointer w-full flex max-sm:flex-col sm:items-end py-4 border-border border-b justify-between "
    >
      <div className="flex flex-col gap-1">
        <div className="flex flex-row max-sm:flex-col gap-1">
        <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="inline-flex items-center justify-center text-sm font-caption text-slate-500 dark:text-slate-300">
          {/* <Calendar className="h-4 w-4" /> */}
          <span className="mr-2">|</span>
          <time className=""  dateTime={date}>
            {formatDateToLocal(date, locale === "fr" ? "fr-FR" : "en-EN")}
          </time>
        </dd>
      </dl>
{/* 
          <span className="w-fit  text-sm rounded-md px-1 py-0">
            {categories.join(",")}
          </span> */}
        </div>

        <h2 className={clsx("text-2xl font-bold")}>{title}</h2>

        {/* <div className="max-w-none text-muted-foreground"> {description}</div> */}
      </div>
      <div>
        {" "}
        <Link
          href={`posts/${slug}`}
          className="underline transition-all text-primary text-sm"
        >
          {t("readArticle")}
        </Link>
      </div>
    </article>
  );
};
