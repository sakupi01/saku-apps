import type { Article } from "@/interfaces/article";
import type { Size } from "@/interfaces/common";
import { ImageResponse } from "next/og";
import { loadGoogleFont } from "./font";

export const generateOgImage = async (
  article: Article | undefined,
  size: Size,
) => {
  const interArrayBuffer = await loadGoogleFont({
    family: "Inter",
    weight: 600,
  });

  const tagWithId = article?.tags.map((tag) => {
    const id = Math.random().toString(32).substring(2);
    return {
      id: id,
      name: tag,
    };
  });

  const renderTags = tagWithId?.map((tag) => (
    <span
      tw="text-3xl p-1 font-medium rounded text-left text-[#B8A47C] hover:underline hover:bg-neutral-100 mr-3"
      key={tag.id}
    >
      {tag.name}
    </span>
  ));

  if (article) {
    return new ImageResponse(
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div tw={"flex w-full h-full p-4 rounded-lg"}>
          <div tw="flex flex-col justify-around items-start w-full h-ful text-basic rounded-lg px-10 py-6 bg-white shadow-sm">
            <p tw="flex gap-3 mb-5">{renderTags}</p>
            <h1 tw="text-6xl font-bold text-left text-basic my-5">
              {article.title}
            </h1>
            <div tw="flex w-full justify-between">
              <p tw="text-lg font-medium text-left text-[#B8A47C]">
                {article.date}
              </p>
              <p tw="text-3xl font-medium text-left text-basic">
                - 🌸 saku's Lifeblog
              </p>
            </div>
          </div>
        </div>
      </div>,
      // ImageResponse options
      {
        ...size,
        fonts: [
          {
            name: "Inter",
            data: interArrayBuffer,
            style: "normal",
            weight: 600,
          },
        ],
      },
    );
  }
  return new Response("Not Found", { status: 404 });
};
