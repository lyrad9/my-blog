"use client";
import React from "react";
import { PostItemProps } from "./post.item";
import { formatDateToLocal } from "@/src/components/utils/functions";
import { Calendar } from "lucide-react";
import { useCurrentLocale } from "@/locales/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useI18n, useScopedI18n } from "@/locales/client";
export const ItemLatestPosts = ({
  slug,
  title,
  date,
  description,
  categories,
}: PostItemProps) => {
  const locale = useCurrentLocale();
  const router = useRouter();
  const t = useI18n();
  return (
    <article
      onClick={() => router.push(`posts/${slug}`)}
      className="cursor-pointer grid gap-2 p-8 hover:bg-muted-foreground/10 rounded-2xl"
    >
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
      <div className="font-semibold">
        {title}
      </div>

      <p className="text-muted-foreground"> {description}</p>
      <Link
          href={`posts/${slug}`}
          className="font-semibold w-fit gap-1.5 flex justify-center items-center transition-all text-slate-500 dark:text-slate-300 text-sm"
        >
          <span> {t("readMore")}</span>
         
          <ChevronRight size={12} />
        </Link>
    </article>
  );
};
