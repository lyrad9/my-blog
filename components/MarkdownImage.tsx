import Image from 'next/image';

interface MarkdownImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const MarkdownImage: React.FC<MarkdownImageProps> = ({ src, alt, width = 600, height = 400 }) => {
  return <Image src={src} alt={alt} width={width} height={height} />;
};

export default MarkdownImage;