import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  srcPath?: string | null;
  fallbackPath?: string;
  apiBaseUrl?: string;
};

export function ApiImage({
  srcPath,
  fallbackPath = "/uploads/books/no-image.png",
  apiBaseUrl,
  alt,
  ...rest
}: Props) {
  const base =
    apiBaseUrl || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const normalized =
    srcPath && srcPath.trim().length > 0 ? srcPath.trim() : null;

  const fullSrc = `${base}${normalized ?? fallbackPath}`;

  return <Image src={fullSrc} alt={alt} {...rest} />;
}
