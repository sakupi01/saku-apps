import clsx from "clsx";
import Link from "next/link";
import { assertNonNullable } from "../../libs/assertNonNullable";

type ArticleListItemProps = {
  title: string;
  excerpt: string;
  date: string;
  colors?: string;
  tags: { id: string; name: string }[];
  slug: string;
};
export const ArticleListItem = ({
  title,
  excerpt,
  date,
  colors,
  tags,
  slug,
}: ArticleListItemProps) => {
  const isZenn = tags[0]?.name === "zenn";
  const zennBaseUrl = process.env.ZENN_BASE_URL;
  assertNonNullable(zennBaseUrl);
  return (
    <div
      className={clsx(
        "w-full grid grid-rows-[5_minmax(0px,_1fr)] grid-cols-[100px_minmax(0px,_1fr)] gap-x-6 rounded-md transition-colors duration-300 ",
        isZenn ? "hover:bg-blue-50" : "hover:bg-neutral-50",
      )}
      role="listitem"
    >
      <div className="ml-2 row-start-3 row-end-4 col-start-1 col-end-2 aspect-square flex justify-center items-center self-center rounded-lg bg-primary-subtle shadow">
        <div
          className={clsx(
            "w-[50px] h-[50px] rounded-[50px] shadow-md bg-gradient-to-r",
            colors,
          )}
        />
      </div>
      <div className="pt-10 pr-2 row-start-1 row-end-2 col-start-2 col-end-3 flex flex-wrap pointer-events-none">
        {tags.map((tag) => (
          <Link
            href={`/dev/tag/${tag.name}`}
            key={tag.id}
            className="pointer-events-auto z-10"
          >
            <span className="tag mr-3">{tag.name}</span>
          </Link>
        ))}
      </div>
      <Link
        href={
          isZenn ? `${zennBaseUrl}/articles/${slug}` : `/dev/articles/${slug}`
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
