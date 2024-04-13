import { assertNonNullable } from "@repo/ui/src/libs/assertNonNullable";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type ArticleListItemProps = {
  title: string;
  excerpt: string;
  date: string;
  url: string;
  alt: string;
  tags: { id: string; name: string }[];
  slug: string;
};
export const ArticleListItemLife = ({
  title,
  excerpt,
  date,
  url,
  alt,
  tags,
  slug,
}: ArticleListItemProps) => {
  const isZenn = tags[0]?.name === "zenn";
  const zennBaseUrl = process.env.ZENN_BASE_URL;
  assertNonNullable(zennBaseUrl);
  return (
    <div
      className={clsx(
        "w-full grid grid-rows-[5_minmax(0px,_1fr)] grid-cols-[100px_minmax(0px,_1fr)] gap-x-6 rounded-md transition-colors duration-300",
        isZenn ? "hover:bg-blue-50" : "hover:bg-neutral-50",
      )}
    >
      <div className="ml-2 row-start-3 row-end-4 col-start-1 col-end-2 aspect-square flex justify-center items-center rounded-lg shadow">
        <Image
          src={url}
          alt={alt}
          width={100}
          height={100}
          style={{
            width: "100px",
            aspectRatio: "1/1",
            objectFit: "cover",
            borderRadius: "0.5rem",
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          }}
        />
      </div>

      <div className="pt-10 pr-2 row-start-1 row-end-2 col-start-2 col-end-3 flex flex-wrap pointer-events-none">
        {tags.map((tag) => (
          <Link
            href={`/life/tag/${tag.name}`}
            key={tag.id}
            className="pointer-events-auto z-10"
          >
            <span className="tag mr-3">{tag.name}</span>
          </Link>
        ))}
      </div>
      <Link
        href={
          isZenn ? `${zennBaseUrl}/articles/${slug}` : `/life/articles/${slug}`
        }
        className="pb-10 pr-2 grid grid-rows-subgrid grid-cols-subgrid row-start-1 row-end-6 col-start-1 col-end-3"
      >
        <h2 className="grid grid-rows-subgrid row-start-3 col-end-[-1] md:text-3xl text-2xl font-semibold text-left text-basic">
          {title}
        </h2>
        <p className="grid grid-rows-subgrid grid-cols-subgrid row-start-4 row-end-5 col-end-[-1] subtle line-clamp-4 w-full">
          {excerpt}
        </p>
        <p className="grid grid-rows-subgrid grid-cols-subgrid row-start-5 row-end-6 col-end-[-1] text-sm text-subtle">
          {date}
        </p>
      </Link>
    </div>
  );
};
