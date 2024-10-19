import React from "react";
import cors from "../../../public/cors_1.jpg"
import Image, { StaticImageData } from "next/image";
import images from "@/src/components/utils/constants";
export const MdxImage = ({path,title,alt,isBanner}:{
  path:string,
  title?:string,
  alt:string,
  isBanner?:boolean
}) => {
  const select = (images.find((img)=> img.path === path))
console.log("select",select)
if(select?.isBanner) return (
  <Image
  alt={alt}
  src={select?.src as string | StaticImageData}
  className="h-auto w-full cursor-pointer rounded-md"
/>
)
  return (
    <div className="not-prose p-2 bg-muted border rounded-lg m-auto w-ful">
      <Image
        alt={alt}
        src={select?.src as string | StaticImageData}
        className="h-auto w-full cursor-pointer rounded-md"
      />
      <div className="mt-2 w-full flex items-center justify-center">
        <span className="text-xs font-light italic text-muted-foreground lg:text-sm">
         {title}
        </span>
      </div>
    </div>
  );
};
