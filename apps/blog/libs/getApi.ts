import fs from "fs";
import { join } from "path";
import { Article } from "@/interfaces/article";
import matter from "gray-matter";
import { sleep } from "./utils";

const techArticlesDirectory = join(process.cwd(), "../../articles/_tech/");
const lifeArticlesDirectory = join(process.cwd(), "../../articles/_life/");
type Category = "life" | "tech";
const ITEMS_PER_PAGE = 4;

export function getArticleSlugs(which: Category) {
  const articlesDirectory =
    which === "life" ? lifeArticlesDirectory : techArticlesDirectory;
  return fs.readdirSync(articlesDirectory);
}

export function getAllArticleTags(which: Category) {
  const articles = getAllArticles(which);
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

  return { ...data, slug: realSlug, content } as Article;
}

export function getAllArticles(which: Category): Article[] {
  const slugs = getArticleSlugs(which);
  const articles = slugs
    .map((slug) => getArticleBySlug(slug, which))
    .sort((article1, article2) => (article1.date > article2.date ? -1 : 1));
  return articles;
}

export function getAllArticlesByTag(tag = "", which: Category): Article[] {
  const articles = getAllArticles(which);
  const filteredArticles = articles.filter((article) => {
    return article.tags?.some((t) => t.toLowerCase().includes(tag));
  });
  return filteredArticles;
}

export async function fetchArticlesByQuery(
  query: string,
  currentPage: number,
  which: Category,
  tag = "",
) {
  const articles = getAllArticlesByTag(tag, which);
  const filteredArticles = articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      article.tags?.some((tag) =>
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
  const articles = getAllArticlesByTag(tag, which);
  const filteredArticles = articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      article.tags?.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase()),
      )
    );
  });
  return Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
}
