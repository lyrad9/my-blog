"use client";
import CopyPasteButton from "../CopyPasteButton";
import { ComponentPropsWithoutRef, useRef } from "react";
import { cn } from "@/src/lib/utils";
export type MdxPreProps = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
  "data-file-name"?: string;
};

export const MdxPre = ({ children, className, ...props }: MdxPreProps) => {
  console.log({ props });

  const language = props["data-language"];
  const fileName = props["data-file-name"];
  const filterProps = Object.entries(props).filter(
    ([key, value]) => key !== "style"
  );

  console.log(Object.entries(props));
  const ref = useRef<HTMLPreElement>(null);
  return (
    <div className=" mb-4 rounded-t-lg bg-accent">
      <div className=" flex items-center gap-2 px-2 py-2">
        <div className=" flex items-center space-x-1.5">
          <span className="block size-2.5 rounded-full bg-red-500"></span>
          <span className="block size-2.5 rounded-full bg-yellow-500"></span>
          <span className="block size-2.5 rounded-full bg-green-500"></span>
        </div>
        <div className="ml-auto"></div>
        <div className="flex items-center justify-center gap-2">
          {props["data-language"] ? (
            <code
              className={cn(
                "data-language data-file-name text-gray-500",
                { "!text-yellow-500": language === "javaScript" },
                { "!text-blue-500": language === "typeScript" },
                { "!text-orange-400": language === "json" }
              )}
            >
              {language}
            </code>
          ) : null}
          <CopyPasteButton
            className="size-4 dark:text-white text-muted-foreground"
            getTextContent={() => {
              const textContent = ref.current?.textContent;
              if (!textContent) return " ";
              const code = textContent.replace(`${props["data-language"]}`, "");
              return textContent;
            }}
          />
        </div>
      </div>
      <pre
        ref={ref}
        className={cn("relative mt-0 overflow-auto lg:text-base", className)}
        style={{ marginTop: 0, marginBottom: 0 }}
        {...filterProps}
      >
        {children}
      </pre>
    </div>
  );
};
