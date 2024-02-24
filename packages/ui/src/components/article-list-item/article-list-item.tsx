import { ReactNode } from "react";
import { Divider } from "../divider/divider";
type ArticleListItemProps = {
  title: string;
  excerpt: string;
  date: string;
  beginColor: string;
  middleColor: string;
  endColor: string;
  tags?: ReactNode[];
};
export const ArticleListItem = ({
  title,
  excerpt,
  date,
  beginColor,
  middleColor,
  endColor,
  tags,
}: ArticleListItemProps) => {
  return (
    <>
      <div className="w-full py-10 px-2 flex items-center gap-6 rounded-md hover:bg-neutral-50">
        <div className="flex justify-center items-center p-5 rounded-lg bg-primary-subtle shadow">
          <div
            className={`w-[50px] h-[50px] rounded-[50px] shadow-md bg-gradient-to-r ${beginColor} ${middleColor} ${endColor}`}
          />
        </div>
        <div className="flex flex-col justify-between gap-2">
          <div className="flex">{tags && tags}</div>
          <h2 className="text-3xl font-semibold text-left text-basic">
            {title}
          </h2>
          <p className="subtle">{excerpt}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <Divider />
    </>
  );
};
