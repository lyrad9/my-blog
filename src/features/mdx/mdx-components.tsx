import * as runtime from "react/jsx-runtime";

import { Callout } from "./callout";
import { Code } from "../../components/shared/Code";
import { cn } from "@/src/lib/utils";
import { Suspense } from "react";
import { MdxLink } from "@/src/features/html-components/Link";
import { MdxYouTube } from "@/src/features/mdx/MdxYouTube";
import { MdxPre } from "@/src/features/mdx/MdxPre";
import { MdxP } from "@/src/features/html-components/MdxP";
import { MdxDiv } from "@/src/features/html-components/MdxDiv";
import { Spacing } from "../../components/shared/Spacing";
import TableOfContents from "@/components/TableOfContents";
import { MdxImage } from "./MdxImage";
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};
const components = {
  Callout,
  Code,
  MdxLink,
  YouTube: MdxYouTube,
  pre: MdxPre,
  Spacing,
  MdxImage,
  TableOfContents
  // p:MdxP


};
interface MdxProps {
  code: string;
}
export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Component  components={components} />
    </Suspense>
  );
}
