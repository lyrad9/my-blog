import React from "react";
import { Section } from "./Section";
import { buttonVariants } from "../src/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { Icons } from "./icons";
import { posts } from "#site/content";
import { getCurrentLocale } from "@/locales/server";
export const Footer = () => {
 
  const favouritePosts = posts.filter(
    (post) => post.favourite == true && post.lang === "fr"
  );
  return (
    <footer className="text-sm py-4 border border-border shadow-xl min-h-14 bg-muted">
      <Section className="max-w-2xl">
        <div className="flex flex-col gap-8 flex-wrap">
          <div className="grid lg:grid-cols-[150px_2fr_1fr] gap-8 grid-cols-1 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="font-mono">Ngakodaryl</div>

              <div className="text-muted-foreground font-semibold flex flex-col gap-1">
                {" "}
                <Link  href="/posts">Posts</Link>
                <Link href="/about">About</Link>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-[3]">
              <p className="font-bold">Best posts</p>
              {favouritePosts.map((favourite) => (
                <Link className="dark:text-primary-foreground text-primary hover:underline" href={`/posts/${favourite.slug}`}>{favourite.title}</Link>
              ))}
            </div>
            <div className="flex gap-2 flex-col flex-1 ">
              <p className="font-bold">Socials</p>
              <div className="dark:text-primary-foreground text-primary flex flex-col">
                <Link className="hover:underline" href="/">
                  Github
                </Link>
                <Link className="hover:underline" href="#">
                  Gmail
                </Link>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            Copyright &copy; {new Date().getFullYear()}{" "}
            <span className="">Ngako Daryl</span>. All rights reserved
          </p>
        </div>

        {/* <div className="py-2 max-md:gap-2 flex max-md:flex-col  items-center justify-between">
          <p className="text-sm text-center">
            {" "}
            Copyright &copy; 2024{" "}
            <span className="font-bold text-primary">Ngako Daryl</span>. All
            rights reserved
          </p>

          <div className="flex items-center gap-2">
            <Link
              className="cursor-pointer"
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <Icons.GithubIcon className="w-4 h-4" />
              <span className="sr-only">Github</span>
            </Link>
            <Link
              className="cursor-pointer"
              href="mailto:mbakopngako@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <Icons.MailIcon className="w-4 h-4" />
            </Link>
          </div>
        </div> */}
      </Section>
    </footer>
  );
};
