"use client";
import React from "react";
import { useCurrentLocale } from "@/locales/client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { posts } from "#site/content";
import Link from "next/link";
import { PostPageProps } from "@/app/[locale]/posts/[...slug]/page";
export const ChangeLocalPost = ({ params }: PostPageProps) => {
  const slug = params?.slug?.join("/");
  console.log(slug);

  const post = posts.find((post) => post.slug === slug);
  console.log(post);
  const locale = useCurrentLocale();

  const pathname = usePathname();

  console.log(pathname);
  const router = useRouter();
  return (
   
      <Link
        href={
          locale === "fr"
            ? `/en/posts/${post?.translation}`
            : `/fr/posts/${post?.translation}`
        }
        className={post?.translation ? "underline" : " pointer-events-none"}
      >
        {locale === "en" && <span>🇬🇧</span>}
        {locale === "fr" && <span>🇫🇷</span>}
      </Link>
   
  );
};
