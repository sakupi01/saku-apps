import clsx from "clsx";
import { ReactNode } from "react";
import { Divider } from "../divider/divider";
type ArticleListItemProps = {
  title: string;
  excerpt: string;
  date: string;
  colors?: string;
  tags?: ReactNode[];
};
export const ArticleListItem = ({
  title,
  excerpt,
  date,
  colors,
  tags,
}: ArticleListItemProps) => {
  return (
    <article>
      <div className="w-full py-10 px-2 flex items-center gap-6 rounded-md hover:bg-neutral-50">
        <div className="flex justify-center items-center p-5 rounded-lg bg-primary-subtle shadow">
          <div
            className={clsx(
              "w-[50px] h-[50px] rounded-[50px] shadow-md bg-gradient-to-r",
              colors,
            )}
          />
        </div>
        <div className="flex flex-col justify-between gap-2">
          <div className="flex">{tags && tags}</div>
          <h2 className="text-3xl font-semibold text-left text-basic">
            {title}
          </h2>
          <p className="subtle">{excerpt}</p>
          <p className="text-sm text-subtle">{date}</p>
        </div>
      </div>
      <Divider />
    </article>
  );
};
