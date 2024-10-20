import { ReactNode } from "react";
type ThumbnailProps = {
  title: string;
  date: string;
  beginColor: string;
  middleColor: string;
  endColor: string;
  tags: ReactNode[];
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
      className={`w-full max-w-xl p-4 mt-5 mb-10 rounded-lg bg-gradient-to-r ${beginColor} ${middleColor} ${endColor}`}
    >
      <div className="w-full  text-basic rounded-lg p-10 bg-white shadow-sm">
        <div className="flex flex-wrap">{tags && tags}</div>
        <h1
          className="md:text-4xl text-2xl font-bold text-left text-basic my-10"
          style={{
            fontKerning: "normal",
            fontFeatureSettings: "palt",
            wordBreak: "keep-all",
            overflowWrap: "anywhere",
          }}
        >
          {title}
        </h1>
        <p className="date">{date}</p>
      </div>
    </div>
  );
};
