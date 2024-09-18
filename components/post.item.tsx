import React from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn, formatDateToLocal } from "@/lib/utils";
import { MoveRight } from "lucide-react";
interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
}
export const PostItem = ({ slug, title, description, date }: PostItemProps) => {
  return (
    <article className="flex flex-col gap-2 border-border border-b">
      <div>
        <h2 className="text-2xl font-bold">
          <Link href={slug}>{title}</Link>
        </h2>
      </div>
      <div className="max-w-none text-muted-foreground">{description}</div>
      <div className="flex justify-between items-center">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time className="" dateTime={date}>
              {formatDateToLocal(date)}
            </time>
          </dd>
        </dl>
        <Link
          href={slug}
          className={cn(
            buttonVariants({ variant: "link" }),
            "py-8 flex gap-2 items-center"
          )}
        >
          Read More
          <MoveRight className="size-4" />
        </Link>
      </div>
    </article>
  );
};
