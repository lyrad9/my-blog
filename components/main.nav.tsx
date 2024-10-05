"use client";
import React from "react";
import Link from "next/link";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/src/lib/utils";
import { usePathname } from "next/navigation";
const MainNav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 lg:space-x-4">
      <Link href="/" className="flex items-center space-x-2">
        {/* <Icons.logo className="w-6 h-6"  /> */}
        <span className=" text-xl text-foreground dark:text-muted-foreground">
          {siteConfig.name}
        </span>
      </Link>
      <Link
        href="/posts"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden md:inline-block",
          {
            "text-primary underline": pathname.match(
              /^\/(fr|en)\/posts(?:\/.*)?$/
            ),
          }
        )}
      >
        Posts
      </Link>
      <Link
        href="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden md:inline-block",
          { "text-primary underline": pathname.match(/^\/(fr|en)\/about$/) }
        )}
      >
        About
      </Link>
    </nav>
  );
};

export default MainNav;
