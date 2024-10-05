import { YouTubeEmbed } from "@next/third-parties/google";

export const MdxYouTube = ({ id }: { id: string }) => {
 
  return  <div className="flex w-full flex-col items-stretch"><YouTubeEmbed 
  width={500} style="display:flex;width:100%"  videoid={id} />
  </div>
}
