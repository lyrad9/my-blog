"use client";
import React from "react";
import Link from "next/link";
import { Icons } from "../svg/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/src/lib/utils";
import { usePathname } from "next/navigation";

const MainNav = ({className}:{className:string}) => {
  const pathname = usePathname();
  return (
    <nav className={
      cn(className)
    }>
      {/* <Link href="/" className="flex items-center space-x-2">
        <span className=" text-lg font-light text-foreground ">Darylngako</span>
      </Link> */}
   {/*    <Link
        href="/posts"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          {
            "text-primary underline": pathname?.match(
              /^\/(fr|en)\/posts(?:\/.*)?$/
            ),
          }
        )}
      >
        Posts
      </Link> */}
      <Link
        href="/about"
        className={cn(
          " font-medium transition-colors hover:text-primary",
          { "text-primary underline": pathname?.match(/^\/(fr|en)\/about$/) }
        )}
      >
        About
      </Link>
      <Link
        href="https://lyrad.vercel.app"
        className={cn(
          "font-medium transition-colors hover:text-primary"
        )}
      >
        My porfolio
      </Link>
    </nav>
  );
};

export default MainNav;
