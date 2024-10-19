import { ReactNode } from "react";
import { cn } from "@/src/lib/utils";
import { getCurrentLocale } from "@/locales/server";
interface CalloutProps {
  children?: React.ReactNode;
  type?: "default" | "warning" | "danger" | "info";
}

export const Callout = ({
  children,
  type = "default",
  ...props
}: CalloutProps) => {
  return (
    <div
      className={cn(
        "my-6  border-l-4 text-opacity-75 px-2 py-4 lg:px-4 lg:py-6  items-start w-full dark:max-w-none",
        {
          "border-red-900 bg-red-50 dark:prose ": type === "danger",
          "border-yellow-900 bg-yellow-50  ": type === "warning",
          "border-info bg-info/20  ": type === "info",
        }
      )}
      {...props}
    >
      <div>{children}</div>
    </div>
  );
};
