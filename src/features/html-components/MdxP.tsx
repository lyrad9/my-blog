import { cn } from "@/src/lib/utils";
import { ComponentPropsWithoutRef } from "react";
export const MdxP = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) => {
  return <p className={cn("my-0", className)} {...props} />;
};
