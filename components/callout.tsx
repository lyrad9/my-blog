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
        "my-6 items-start border text-white  border-l-[4.5px] p-4 w-full dark:max-w-none",
        {
          "border-red-900 bg-red-50 dark:prose ": type === "danger",
          "border-yellow-900 bg-yellow-50  ": type === "warning",
          "border-blue-900 text-white bg-blue-500  ": type === "info",
        }
      )}
      {...props}
    >
      <div>{children}</div>
    </div>
  );
};
