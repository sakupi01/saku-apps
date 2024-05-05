import { loadGoogleFont } from "@/libs/font";
import { getArticleBySlug, getArticleSlugs } from "@/libs/getApi";
import { ImageResponse } from "@vercel/og";

const CATEGORY = "dev" as const;

// Route segment config
export const runtime = "nodejs";

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

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const slugs = getArticleSlugs(CATEGORY);

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Image generation
export default async function Image({ params: { slug } }: Props) {
  const article = getArticleBySlug(slug, CATEGORY);
  // Font
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
        <div tw={`flex w-full h-full p-4 rounded-lg`}>
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
                - 🌸 saku's Techblog
              </p>
            </div>
          </div>
        </div>
      </div>,
      // ImageResponse options
      {
        // For convenience, we can re-use the exported opengraph-image
        // size config to also set the ImageResponse's width and height.
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
  } else {
    return new Response("Not Found", { status: 404 });
  }
}
