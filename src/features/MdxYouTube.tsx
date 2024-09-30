import { YouTubeEmbed } from "@next/third-parties/google";

export const MdxYouTube = ({ id }: { id: string }) => {
  return <YouTubeEmbed style="width:100%"  videoid={id} />;
};
