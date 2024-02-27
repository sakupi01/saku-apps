import { getArticleBySlug } from "@/libs/getApi";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "記事のアイキャッチ画像";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: { slug: string };
};

// Image generation
export default async function Image({ params: { slug } }: Props) {
  const article = getArticleBySlug(slug, "life");
  // Font
  //   const interSemiBold = fetch(
  //     new URL("./Inter-SemiBold.ttf", import.meta.url),
  //   ).then((res) => res.arrayBuffer());
  const tagWithId = article.tags?.map((tag) => {
    const id = Math.random().toString(32).substring(2);
    return {
      id: id,
      name: tag,
    };
  });

  const renderTags = tagWithId?.map((tag) => (
    <span className="tag mr-3" key={tag.id}>
      {tag.name}
    </span>
  ));
  const colors = `${article.beginColor} ${article.middleColor} ${article.endColor}`;
  if (article) {
    return new ImageResponse(
      <div
        className={`w-full p-4 mt-5 mb-10 rounded-lg bg-gradient-to-r ${colors}`}
      >
        <div className="w-full  text-basic rounded-lg p-10 bg-white shadow-sm">
          {renderTags}
          <h1 className="text-5xl font-bold text-left text-basic my-10">
            {article.title}
          </h1>
          <p className="date">{article.date}</p>
        </div>
      </div>,
      {
        // For convenience, we can re-use the exported opengraph-image
        // size config to also set the ImageResponse's width and height.
        ...size,
        fonts: [
          //   {
          //     name: "Inter",
          //     data: await interSemiBold,
          //     style: "normal",
          //     weight: 400,
          //   },
        ],
      },
    );
  } else {
    return new Response("Not Found", { status: 404 });
  }
}
