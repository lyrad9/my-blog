import React from "react";
import { Section } from "./Section";
import { buttonVariants } from "./ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "./icons";
export const Footer = () => {
  return (
    <footer>
      <Section>
        <div className="py-2 max-sm:gap-2 flex max-sm:flex-col  items-center justify-between">
          <p className="text-sm text-center">
            {" "}
            Copyright  &copy; 2024 {" "}
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
        </div>
      </Section>
    </footer>
  );
};
