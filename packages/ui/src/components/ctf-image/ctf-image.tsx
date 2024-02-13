import { clsx } from "clsx";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { ICtfImageFields } from "../../../../../@types/index";

interface ImageProps extends ICtfImageFields {
  nextImageProps?: Omit<NextImageProps, "src" | "alt">;
}

export const CtfImage = ({ nextImageProps, ...props }: ImageProps) => {
  const { file } = props.fields;
  const url = `https:${file.url}`;
  const { width, height } = file.details.image;
  if (!url || !width || !height) return null;

  const blurURL = new URL(url);
  blurURL.searchParams.set("w", "10");

  return (
    <NextImage
      src={url}
      width={width}
      height={height}
      alt={props.fields.title || ""}
      sizes="(max-width: 1200px) 100vw, 50vw"
      placeholder="blur"
      blurDataURL={blurURL.toString()}
      {...nextImageProps}
      className={clsx(nextImageProps?.className, "transition-all")}
    />
  );
};
