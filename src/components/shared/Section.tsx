"use client"
import React, { PropsWithChildren } from "react";
import { cn } from "@/src/lib/utils";
import { usePathname } from "next/navigation";
export const Section = (props: PropsWithChildren<{ className?: string }>) => {
  const pathname = usePathname()

  return (
    <section className={cn("w-full px-6 mx-auto", 
    pathname.match(/^\/(fr|en)\/posts(?:\/.*)?$/) ? "max-w-2xl" : "max-w-4xl",
    props.className)}>
      {props.children}
    </section>
  );
};
