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
  tags: ReactNode[];
  date: string;
}) {
  return (
    <div className="w-full p-4 mt-5 mb-10 rounded-lg">
      <Image
        src={url}
        alt={alt}
        width={800}
        height={450}
        style={{
          width: "100%",
          aspectRatio: "16/11",
          borderRadius: "0.5rem",
          objectFit: "cover",
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        }}
      />
      <div className="w-full  text-basic rounded-lg p-10">
        <div className="flex flex-wrap">{tags && tags}</div>
        <h1 className="md:text-5xl text-3xl font-bold text-left text-basic my-10">
          {title}
        </h1>
        <p className="date">{date}</p>
      </div>
    </div>
  );
}
