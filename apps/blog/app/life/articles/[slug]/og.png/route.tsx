import type { Size } from "@/interfaces/common";
import { loadGoogleFont } from "@/libs/font";
import { generateOgImage } from "@/libs/generateOgImage";
import { getArticleBySlug, getArticleSlugs } from "@/libs/getApi";
import { ImageResponse } from "next/og";

const CATEGORY = "life" as const;

// Image metadata
export const alt = "記事のアイキャッチ画像";
export const size: Size = {
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
export async function GET(req: Request, { params: { slug } }: Props) {
  const article = getArticleBySlug(slug, CATEGORY);
  return generateOgImage(article, size);
}
