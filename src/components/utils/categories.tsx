"use client"
import Image from "next/image"
import { join } from "path";
import { Icons } from "../svg/icons";
type IconProps = React.HTMLAttributes<SVGElement>
export const Categories = [
    {
        name: "design",
        icon: <Icons.CreativityIcon size={20}  />,
      },
      {
        name: "tips",
        icon: <Icons.TipsIcon size={20} />,
      },
      {
        name: "story",
        icon: <Icons.StoryIcon size={20} />,
      },
      {
        name: "advice",
        icon: <Icons.AdviceIcon size={20} />,
      },
      {
        name: "nextjs",
        icon: <Icons.NextjsIcon size={20} />,
      
      },
      {
        name: "css",
        icon: <Icons.CssIcon size={20} />,
      },
      {
        name: "javaScript",
        icon: <Icons.JsIcon size={20}  />,
      },
   
]
