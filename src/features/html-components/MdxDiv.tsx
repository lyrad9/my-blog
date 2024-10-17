import { cn } from "@/src/lib/utils";
import { ComponentPropsWithoutRef } from "react";
export const MdxDiv = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  return <div style={{
//    margin:"1.25rem"
  }} className={cn(" mb-[1.25rem]", className)} {...props} />;
};
