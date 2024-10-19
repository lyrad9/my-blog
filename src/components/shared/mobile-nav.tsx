"use client";
import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Icons } from "../svg/icons";
import { cn } from "@/src/lib/utils";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/Theme/Theme-toggle";
import { Separator } from "@/src/components/ui/separator";
export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="w-10 px-0 md:hidden" variant={"outline"} size={"sm"}>
          <Menu className="size-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </SheetTrigger>

      <SheetContent side={"right"} className="flex-1">
        <div className="flex flex-col h-full">
          <div>
            <MobileLink href={"/"} onOpenChange={setOpen} className="">
              <span className="font-bold">{siteConfig.name}</span>
            </MobileLink>

            <div className="flex flex-col gap-3 mt-3">
              <MobileLink
                href={"/posts"}
                onOpenChange={setOpen}
                className={clsx(
                  "hover:text-primary transition-colors text-muted-foreground",
                  {
                    "text-primary ": pathname.match(
                      /^\/(fr|en)\/posts(?:\/.*)?$/
                    ),
                  }
                )}
              >
                posts
              </MobileLink>
              <MobileLink
                href={"/about"}
                onOpenChange={setOpen}
                className={clsx(
                  "hover:text-primary transition-colors text-muted-foreground",
                  { "text-primary ": pathname.match(/^\/(fr|en)\/about$/) }
                )}
              >
                About
              </MobileLink>
            </div>
            <Separator />
            <div className="flex flex-col gap-2 mt-2">
              <Link
                className="cursor-pointer"
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <span className="s">Github</span>
              </Link>
              <Link
                className="cursor-pointer"
                href="mailto:mbakopngako@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                Gmail
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
interface MobileLinksProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinksProps) {
  const router = useRouter();
  return (
    <Link
      className={className}
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
