import fs from "node:fs";
import { join } from "node:path";
import { ArticleSchema, ZennArticleObjSchema } from "@/interfaces/schema";
import type { ArticleSchemaType, ZennArticleType } from "@/interfaces/type";
import matter from "gray-matter";
import * as v from "valibot";
import { assertNonNullable } from "./assertNonNullable";
import { convertDateToYYYYMMDD } from "./convertDate";

const devArticlesDirectory = join(process.cwd(), "../../articles/_dev/");
const lifeArticlesDirectory = join(process.cwd(), "../../articles/_life/");
type Category = "life" | "dev";
const ITEMS_PER_PAGE = 10;

export const getArticleSlugs = (category: Category) => {
  const articlesDirectory =
    category === "life" ? lifeArticlesDirectory : devArticlesDirectory;
  return fs.readdirSync(articlesDirectory);
};

export async function getAllArticleTags(category: Category) {
  const articles = await getAllArticlesByCategory(category);
  const tags = articles.flatMap((article) => article.tags);

  return tags.filter((tag) => tag !== undefined);
}

export function getArticleBySlug(slug: string, category: Category) {
  const articlesDirectory =
    category === "life" ? lifeArticlesDirectory : devArticlesDirectory;
  const rawSlag = slug.replace(/\.md$/, "");
  const fullPath = join(articlesDirectory, `${rawSlag}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  if (data.status !== "preview") {
    return v.parse(ArticleSchema, {
      ...data,
      slug: rawSlag,
      content,
    });
  }
}

const articleCompatibleZennArticle = (
  articles: ZennArticleType[],
  category: Category,
) => {
  const article_type = category === "dev" ? "tech" : "idea";
  return articles
    .filter((article) => article.article_type === article_type)
    .map((article) => {
      return v.parse(ArticleSchema, {
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
        category: category,
        tags: ["zenn"],
        status: "published",
      });
    });
};

export const getZennArticleByCategory = async (category: Category) => {
  try {
    const zennArticleObj = await fetchZennData();
    const convertedArticles = articleCompatibleZennArticle(
      zennArticleObj.articles,
      category,
    );
    return convertedArticles;
  } catch (e) {
    console.error(e);
  }
};

async function fetchZennData() {
  const zennUrl = process.env.ZENN_URL;
  assertNonNullable(zennUrl);
  const res = await fetch(zennUrl);
  return v.parse(ZennArticleObjSchema, await res.json());
}

export async function getAllArticlesByCategory(category: Category) {
  const slugs = getArticleSlugs(category);
  const articles = slugs
    .map((slug) => getArticleBySlug(slug, category))
    .filter((article): article is ArticleSchemaType => article !== undefined);

  const zennArticles = await getZennArticleByCategory(category);
  const squashedArticles = articles
    .concat(zennArticles ?? [])
    .sort(
      (article1, article2) =>
        Date.parse(article2.date) - Date.parse(article1.date),
    );
  return squashedArticles;
}

export function getAllArticles() {
  const dev_slugs = getArticleSlugs("dev");
  const life_slugs = getArticleSlugs("life");
  console.log(dev_slugs);
  console.log(life_slugs);
  const dev_articles = dev_slugs
    .map((slug) => getArticleBySlug(slug, "dev"))
    .filter((article): article is ArticleSchemaType => article !== undefined)
    .sort((article1, article2) => (article1.date > article2.date ? -1 : 1));
  const life_articles = life_slugs
    .map((slug) => getArticleBySlug(slug, "life"))
    .filter((article): article is ArticleSchemaType => article !== undefined)
    .sort((article1, article2) => (article1.date > article2.date ? -1 : 1));
  const articles = dev_articles.concat(life_articles);
  return articles;
}

export async function getAllArticlesByCategoryByTag(
  category: Category,
  tag = "",
) {
  const articles = await getAllArticlesByCategory(category);
  const filteredArticles = articles.filter((article) => {
    return article.tags.some((t) => t.toLowerCase().includes(tag));
  });
  return filteredArticles;
}

export async function fetchArticlesByQuery(
  query: string,
  currentPage: number,
  category: Category,
  tag = "",
) {
  const articles = await getAllArticlesByCategoryByTag(category, tag);
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

export async function fetchArticlePages(
  category: Category,
  query = "",
  tag = "",
) {
  const articles = await getAllArticlesByCategoryByTag(category, tag);
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
