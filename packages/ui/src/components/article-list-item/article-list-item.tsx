import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";
type ArticleListItemProps = {
  title: string;
  excerpt: string;
  date: string;
  colors?: string;
  tags?: ReactNode[];
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
  return (
    <div className="w-full py-10 px-2 grid grid-rows-[5_minmax(0px,_1fr)] grid-cols-[100px_minmax(0px,_1fr)] gap-6 rounded-md hover:bg-neutral-50">
      <div className="row-span-5  aspect-square flex justify-center items-center self-center rounded-lg bg-primary-subtle shadow">
        <div
          className={clsx(
            "w-[50px] h-[50px] rounded-[50px] shadow-md bg-gradient-to-r",
            colors,
          )}
        />
      </div>
      <div className="grid grid-rows-subgrid row-span-5 col-start-2">
        <div className="row-start-2 col-start-1 col-end-2 flex flex-wrap pointer-events-none">
          {tags && tags}
        </div>
        <Link
          href={`/dev/articles/${slug}`}
          className="grid grid-rows-subgrid row-span-5 col-start-1 col-end-2"
        >
          <h2 className="md:text-3xl text-2xl font-semibold text-left text-basic">
            {title}
          </h2>
          <p className="subtle line-clamp-4 w-full">{excerpt}</p>
          <p className="text-sm text-subtle">{date}</p>
        </Link>
      </div>
    </div>
  );
};
