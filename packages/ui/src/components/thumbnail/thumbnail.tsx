import { ReactNode } from "react";
type ThumbnailProps = {
  title: string;
  date: string;
  beginColor: string;
  middleColor: string;
  endColor: string;
  tags?: ReactNode[];
};
export const Thumbnail = ({
  title,
  date,
  beginColor,
  middleColor,
  endColor,
  tags,
}: ThumbnailProps) => {
  return (
    <div
      className={`w-full p-4 mt-5 mb-10 rounded-lg bg-gradient-to-r ${beginColor} ${middleColor} ${endColor}`}
    >
      <div className="w-full  text-basic rounded-lg p-10 bg-white shadow-sm">
        {tags && tags}
        <h1 className="text-5xl font-bold text-left text-basic my-10">
          {title}
        </h1>
        <p className="date">{date}</p>
      </div>
    </div>
  );
};
