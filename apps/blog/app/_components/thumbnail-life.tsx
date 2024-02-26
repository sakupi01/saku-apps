import Image from "next/image";
import { ReactNode } from "react";
export default function TunbnailLife({
  url,
  alt,
  title,
  tags,
  date,
}: {
  url: string;
  alt: string;
  title: string;
  tags?: ReactNode[];
  date: string;
}) {
  return (
    <div className="w-full p-4 mt-5 mb-10 rounded-lg">
      <Image
        src={url}
        alt={alt}
        width={200}
        height={150}
        objectFit="cover"
        className="w-full"
        style={{
          borderRadius: "0.5rem",
        }}
      />
      <div className="w-full  text-basic rounded-lg p-10">
        {tags && tags}
        <h1 className="text-5xl font-bold text-left text-basic my-10">
          {title}
        </h1>
        <p className="date">{date}</p>
      </div>
    </div>
  );
}
