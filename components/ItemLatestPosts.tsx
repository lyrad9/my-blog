"use client";
import React from "react";
import { PostItemProps } from "./post.item";
import { formatDateToLocal } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { useCurrentLocale } from "@/locales/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useI18n, useScopedI18n } from "@/locales/client";
export const ItemLatestPosts = ({
  slug,
  title,
  date,
  fullDescription,
}: PostItemProps & {
  fullDescription: string | undefined;
}) => {
  const locale = useCurrentLocale();
  const router = useRouter();
  const t = useI18n();
  return (
    <article
      onClick={() => router.push(`posts/${slug}`)}
      className="cursor-pointer grid gap-2"
    >
      <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="font-caption text-slate-500 dark:text-slate-300 flex gap-1 underline">
          <Calendar className="h-4 w-4" />
          <time className="" dateTime={date}>
            {formatDateToLocal(date, locale === "fr" ? "fr-FR" : "en-EN")}
          </time>
        </dd>
      </dl>
      <div className="font-semibold text-primary dark:text-primary-foreground">
        {title}
      </div>
      <div>
        <p className="text-muted-foreground"> {fullDescription}</p>
        <Link
          href={`posts/${slug}`}
          className="hover:underline transition-all text-primary text-sm"
        >
          {t("readMore")}
        </Link>
      </div>

    
    </article>
  );
};
