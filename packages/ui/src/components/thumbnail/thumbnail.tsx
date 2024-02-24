import Link from "next/link";
type ThumbnailProps = {
  title: string;
  date: string;
  beginColor: string;
  middleColor: string;
  endColor: string;
  tags?: string[];
};
export const Thumbnail = ({
  title,
  date,
  beginColor,
  middleColor,
  endColor,
  tags,
}: ThumbnailProps) => {
  const tagWithId = tags?.map((tag) => {
    const id = Math.random().toString(32).substring(2);
    return {
      id: id,
      name: tag,
    };
  });

  return (
    <div
      className={`w-full p-4 my-10 rounded-lg bg-gradient-to-r ${beginColor} ${middleColor} ${endColor}`}
    >
      <div className="w-full  text-basic rounded-lg p-10 bg-white shadow-sm">
        {tagWithId && (
          <p>
            {tagWithId.map((tag) => (
              <Link href={"/"}>
                <span key={tag.id} className="tag mr-3">
                  {tag.name}
                </span>
              </Link>
            ))}
          </p>
        )}
        <h1 className="text-5xl font-bold text-left text-basic my-10">
          {title}
        </h1>
        <p className="date">{date}</p>
      </div>
    </div>
  );
};
