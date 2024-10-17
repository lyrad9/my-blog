import { PropsWithChildren } from "react";
export function P({ children }:PropsWithChildren) {
    return <p className="my-5 [blockquote_&]:my-2">{children}</p>;
  }
  