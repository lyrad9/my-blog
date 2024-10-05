import { PropsWithChildren } from "react";
import { cn } from "@/src/lib/utils";
export function Span({
  children,
  className,
}: PropsWithChildren & {
  className: string;
}) {
  return <span className={className}>{children}</span>;
}
