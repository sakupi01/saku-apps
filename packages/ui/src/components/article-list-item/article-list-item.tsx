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
    <div className="w-full py-10 px-2 flex items-center gap-6 rounded-md hover:bg-neutral-50">
      <div className="flex justify-center items-center p-5 rounded-lg bg-primary-subtle shadow">
        <div
          className={clsx(
            "w-[50px] h-[50px] rounded-[50px] shadow-md bg-gradient-to-r",
            colors,
          )}
        />
      </div>
      <div className="w-full flex flex-col justify-between gap-2">
        <div className="flex">{tags && tags}</div>
        <Link href={`/dev/articles/${slug}`} className="w-full">
          <h2 className="text-3xl font-semibold text-left text-basic">
            {title}
          </h2>
          <p className="subtle line-clamp-4">{excerpt}</p>
          <p className="text-sm text-subtle">{date}</p>
        </Link>
      </div>
    </div>
  );
};
