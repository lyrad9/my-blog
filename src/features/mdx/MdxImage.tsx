import React from "react";
import cors from "../../../public/cors_1.jpg"
import Image, { StaticImageData } from "next/image";
import images from "@/src/components/utils/constants";
import { getUrl } from "@/app/[locale]/posts/[...slug]/getUrl";

export const MdxImage = ({path,title,alt,isBanner}:{
  path:string,
  title?:string,
  alt:string,
  isBanner?:string
}) => {
  const url = getUrl()
//   const select = (images.find((img)=> img.path === path))
// console.log("select",select)
if(isBanner && Boolean(isBanner)) return (
  <img
  style={{
    width:"100%"
  }}
  alt={alt}
  src={`${url}/${path}`}
  className="h-auto w-full dark:border-2 dark:border-white cursor-pointer rounded-md"
/>
)
  return (
    <div className=" not-prose p-2 bg-muted border rounded-lg m-auto w-ful">
      <img
       style={{
        width:"100%"
      }}
  alt={alt}
  src={`${url}/${path}`}
  className="h-auto w-full dark:border-2 cursor-pointer rounded-md"
/>
      <div className="mt-2 w-full flex items-center justify-center">
        <span className="text-xs font-light italic text-muted-foreground lg:text-sm">
         {title}
        </span>
      </div>
    </div>
  );
};
