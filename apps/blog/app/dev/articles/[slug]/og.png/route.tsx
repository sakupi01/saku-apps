import { generateOgImage } from "@/libs/generateOgImage";
import { getArticleBySlug, getArticleSlugs } from "@/libs/getApi";

const CATEGORY = "dev" as const;

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
  return generateOgImage(article, CATEGORY);
}
