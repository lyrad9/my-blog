"use client";
import React from "react";
import { PostItemProps } from "@/src/components/utils/types";
import { formatDateToLocal } from "@/src/components/utils/functions";
import { useCurrentLocale } from "@/locales/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/locales/client";
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
    <article className="cursor-pointer grid gap-2 sm:p-8 sm:hover:bg-muted-foreground/10 rounded-2xl">
      <div>
        <span className="inline-flex items-center text-base font-caption text-secondary-foreground font-medium text-zinc-700 dark:text-slate-300">
          {formatDateToLocal(date, locale === "fr" ? "fr-FR" : "en-EN")}
        </span>

        <div className="font-semibold">{title}</div>
      </div>

      <p className="text-muted-foreground"> {description}</p>
      <Link
        href={`posts/${slug}`}
        className="font-semibold w-fit gap-1.5 flex justify-center items-center transition-all text-zinc-700 dark:text-slate-300 text-sm"
      >
        <span> {t("readMore")}</span>

        <ChevronRight size={12} />
      </Link>
    </article>
  );
};
