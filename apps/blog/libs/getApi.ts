import fs from "fs";
import { join } from "path";
import { Article } from "@/interfaces/article";
import { ZennArticle, ZennArticleObj } from "@/interfaces/zenn";
import matter from "gray-matter";
import { assertNonNullable } from "./assertNonNullable";
import { convertDateToYYYYMMDD } from "./convertDate";

const techArticlesDirectory = join(process.cwd(), "../../articles/_dev/");
const lifeArticlesDirectory = join(process.cwd(), "../../articles/_life/");
type Category = "life" | "dev";
const ITEMS_PER_PAGE = 4;

export function getArticleSlugs(which: Category) {
  const articlesDirectory =
    which === "life" ? lifeArticlesDirectory : techArticlesDirectory;
  return fs.readdirSync(articlesDirectory);
}

export async function getAllArticleTags(which: Category) {
  const articles = await getAllArticlesByCategory(which);
  const tags = articles.flatMap((article) => article.tags);

  return tags.filter((tag) => tag !== undefined);
}

export function getArticleBySlug(slug: string, which: Category) {
  const articlesDirectory =
    which === "life" ? lifeArticlesDirectory : techArticlesDirectory;
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(articlesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  if (data.status !== "preview") {
    return { ...data, slug: realSlug, content } as Article;
  }
}

export const getZennArticleByCategory = async (
  which: Category,
): Promise<Article[] | undefined> => {
  try {
    const zennUrl = process.env.ZENN_URL;
    assertNonNullable(zennUrl);
    const res = await fetch(zennUrl);
    const zennArticleObj = (await res.json()) as ZennArticleObj;
    // convert ZennArticle to Article
    const articleCompatibleZennArticle = (
      articles: ZennArticle[],
    ): Article[] => {
      const article_type = which === "dev" ? "tech" : "idea";
      return articles
        .filter((article) => article.article_type === article_type)
        .map((article) => {
          return {
            slug: article.slug,
            title: article.title,
            date: convertDateToYYYYMMDD(article.published_at.toString()),
            coverImage: {
              url: article.user.avatar_small_url,
              alt: article.user.name,
            },
            excerpt: `Zennで執筆した「${article.title}」に関する記事です`,
            content: "",
            preview: false,
            beginColor: "from-sky-200",
            middleColor: "via-blue-200",
            endColor: "to-violet-300",
            category: which,
            tags: ["zenn"],
          };
        });
    };
    const convertedArticles = articleCompatibleZennArticle(
      zennArticleObj.articles,
    );
    return convertedArticles;
  } catch (e) {
    console.error(e);
  }
};

// MEMO: 現状使用していない
export async function getAllArticlesByCategory(
  which: Category,
): Promise<Article[]> {
  const slugs = getArticleSlugs(which);
  const articles = slugs
    .map((slug) => getArticleBySlug(slug, which))
    .filter((article): article is Article => article !== undefined);
  const zennArticles = await getZennArticleByCategory(which);
  const squashedArticles = articles
    .concat(zennArticles ?? [])
    .sort(
      (article1, article2) =>
        Date.parse(article2.date) - Date.parse(article1.date),
    );
  return squashedArticles;
}

export function getAllArticles(): Article[] {
  const dev_slugs = getArticleSlugs("dev");
  const life_slugs = getArticleSlugs("life");
  const dev_articles = dev_slugs
    .map((slug) => getArticleBySlug(slug, "dev"))
    .filter((article): article is Article => article !== undefined)
    .sort((article1, article2) => (article1.date > article2.date ? -1 : 1));
  const life_articles = life_slugs
    .map((slug) => getArticleBySlug(slug, "life"))
    .filter((article): article is Article => article !== undefined)
    .sort((article1, article2) => (article1.date > article2.date ? -1 : 1));
  const articles = dev_articles.concat(life_articles);
  return articles;
}

export async function getAllArticlesByCategoryByTag(
  which: Category,
  tag = "",
): Promise<Article[]> {
  const articles = await getAllArticlesByCategory(which);
  const filteredArticles = articles.filter((article) => {
    return article.tags.some((t) => t.toLowerCase().includes(tag));
  });
  return filteredArticles;
}

export async function fetchArticlesByQuery(
  query: string,
  currentPage: number,
  which: Category,
  tag = "",
) {
  const articles = await getAllArticlesByCategoryByTag(which, tag);
  const filteredArticles = articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase()),
      )
    );
  });
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(start, end);
  return paginatedArticles;
}

export async function fetchArticlePages(which: Category, query = "", tag = "") {
  const articles = await getAllArticlesByCategoryByTag(which, tag);
  const filteredArticles = articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase()),
      )
    );
  });
  return Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
}
