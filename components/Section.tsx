import React, { PropsWithChildren } from "react";
import { cn } from "@/src/lib/utils";
export const Section = (props: PropsWithChildren<{ className?: string }>) => {
  return (
    <section className={cn("w-full max-w-4xl px-6 mx-auto", props.className)}>
      {props.children}
    </section>
  );
};
