import { cn } from "@/src/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export const Code = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) => {
  return (
    <span
      className={cn(
        "font-sans  bg-accent/30  border border-accent rounded-sm px-1 py-0.5 hover:bg-accent-50 transition-colors",
        className
      )}
      {...props}
    />
  );
};
