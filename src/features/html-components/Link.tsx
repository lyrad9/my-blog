import { cn } from "@/src/lib/utils";

import Link from "next/link";
import { LinkProps } from "next/link";
interface MdxLinkProps extends LinkProps {
  children: React.ReactNode;

  className?: string;
}
export const MdxLink = ({ href, children, className, ...props }: MdxLinkProps) => {
  return (
    <Link className={cn("text-blue-500 custom no-underline",className)} href={href} {...props}>
      {children}
    </Link>
  );
};
