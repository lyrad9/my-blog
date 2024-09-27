import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export const Code = ({ className, ...props }: ComponentPropsWithoutRef<"span">) => {
    return (
      <span
        className={cn(
          "font-sans  dark:text-primary-foreground bg-accent/30  border border-accent rounded-sm text-primary px-1 py-0.5 hover:bg-accent-50 transition-colors",
          className
        )}
        {...props}
      />
    );
  };
