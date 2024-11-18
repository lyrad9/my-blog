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
      <Section className=" flex h-20  items-center">
        <Link href="/" className="text-lg font-light text-foreground ">
          {/* <Icons.logo className="w-6 h-6"  /> */}
          Darylngako
        </Link>
        <MainNav className="text-lg flex items-center justify-center space-x-4 lg:space-x-4 flex-1" />
        <div className="flex items-center justify-center gap-1">
          <LocaleSelect />
          {/* <nav className="flex items-center">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-10 px-0"
                  )}
                >
                  <Icons.GithubIcon className="w-4 h-4" />
                  <span className="sr-only">Github</span>
                </div>
              </Link>

             
            </nav> */}

          <ThemeToggle />
        </div>
      </Section>
    </header>
  );
};
