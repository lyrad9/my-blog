"use client";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const LocaleSelect = () => {
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  const pathname = usePathname();
  const router = useRouter();
  if (pathname.match(/^\/(fr|en)\/posts\/.+$/)) return null;
  const getPostInOtherLang = (lang: "fr" | "en") => {
    changeLocale(lang);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className=" border-none bg-none flex justify-center items-center"
          variant="ghost"
          size="icon"
        >
          <span
            className={cn(
              "h-[1.2rem] w-[1.2rem] underline",
              locale === "fr" ? "rotate-0  scale-100 " : "-rotate-90 scale-0"
            )}
          >
            🇫🇷
          </span>
          <span
            className={cn(
              "absolute h-[1.2rem] w-[1.2rem] underline",
              locale === "en" ? "rotate-0  scale-100  " : "-rotate-90 scale-0"
            )}
          >
            🇬🇧
          </span>

          <span className="sr-only">Toggle lang</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => getPostInOtherLang("fr")}>
          <span>🇫🇷</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => getPostInOtherLang("en")}>
          <span>🇬🇧</span>
        </DropdownMenuItem>
     
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
