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
    <article className="cursor-pointer grid gap-2 rounded-2xl">
      <div>
        <span className="inline-flex items-center font-light text-base font-caption  text-muted-foreground">
          {formatDateToLocal(date, locale === "fr" ? "fr-FR" : "en-EN")}
        </span>

        <div className="font-semibold dark:text-white text-primary">{title}</div>
      </div>

      <p className="text-muted-foreground"> {description}</p>
      {/* <Link
        href={`posts/${slug}`}
        className="text-muted-foreground font-semibold w-fit gap-1.5 flex justify-center items-center transition-all  text-sm"
      >
        <span> {t("readMore")}</span>

        <ChevronRight size={12} />
      </Link> */}
    </article>
  );
};
