import { clsx } from "clsx";

import { ICtfImage } from "../../../../../@types";
import { TypeComponentRichImageFields } from "../../../../../@types/contentful/TypeComponentRichImage";
import { CtfImage } from "../ctf-image";

interface ArticleImageProps {
  image: TypeComponentRichImageFields;
}

export const ArticleImage = ({ image }: ArticleImageProps) => {
  return image.image ? (
    <figure>
      <div className="flex justify-center">
        <CtfImage
          nextImageProps={{
            className: clsx(
              "mt-0 mb-0 ",
              image.fullWidth
                ? "md:w-screen md:max-w-[calc(100vw-40px)] md:shrink-0"
                : "rounded-2xl border border-gray300 shadow-lg",
            ),
          }}
          {...(image.image as unknown as ICtfImage)}
        />
      </div>
      {image.caption && (
        <figcaption className="mt-4">{image.caption.values}</figcaption>
      )}
    </figure>
  ) : null;
};
