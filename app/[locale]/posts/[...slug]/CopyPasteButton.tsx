"use client";
import React from "react";
import { Copy } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";
export const CopyPasteButton = ({
  getTextContent,
}: {
  getTextContent: () => string;
}) => {
  const [copiedText, copy] = useCopyToClipboard();
  return (
    <div onClick={() => copy(getTextContent())} className="rounded-md">
      <Copy className="size-5" />
    </div>
  );
};
