import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "../ui/button";
import { cn } from "@/src/lib/utils";
import { Icons } from "../svg/icons";
import MainNav from "./main.nav";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "@/Theme/Theme-toggle";
import { MoonIcon, SunIcon } from "lucide-react";
import { LocaleSelect } from "@/src/components/shared/LocaleSelect";
import { Section } from "./Section";
export const SiteHeader = () => {
  return (
    <header className="z-20 sticky top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Section className=" flex h-16 items-center">
        <Link href="/" className="text-lg font-light text-foreground ">
          {/* <Icons.logo className="w-6 h-6"  /> */}
          Darylngako
        </Link>
      <div className="flex-1" />
        <div className="flex items-center justify-center gap-4">
        <MainNav className="text-sm flex items-center justify-center space-x-2 lg:space-x-4" />
          <LocaleSelect />         
{/*  <SunIcon
        size={40}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <MoonIcon
        size={20}
        className="absolute rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100 "
      /> */}
          <ThemeToggle />
        </div>
      </Section>
    </header>
  );
};
                                                                                               