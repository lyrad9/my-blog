"use client"
import React from "react";
import cors from "../../../public/cors_1.jpg"
import Image, { StaticImageData } from "next/image";
import images from "@/src/components/utils/constants";
import { getUrl } from "@/app/[locale]/posts/[...slug]/getUrl";
import { X } from "lucide-react"
import { useState } from "react"

export const MdxImage = ({path,title,alt,isBanner}:{
  path:string,
  title?:string,
  alt:string,
  isBanner?:string
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
console.log(isModalOpen)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
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
    <>
    
    <div 
     onClick={openModal}
    className=" not-prose p-2 bg-muted border rounded-lg m-auto w-ful">
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
    {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-8">
          <div className="relative max-h-screen">
            <button
              onClick={closeModal}
              className="absolute -right-4 -top-4 rounded-full bg-white p-2 text-gray-800 shadow-md hover:bg-gray-200"
            >
              <X className="size-3" />
            </button>
            <img
             alt={alt}
             src={`${url}/${path}`}
              className="max-h-[80vh] w-[800px] rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
   
  );
};
