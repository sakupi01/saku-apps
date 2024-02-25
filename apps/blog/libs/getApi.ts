import fs from "fs";
import { join } from "path";
import { Article } from "@/interfaces/article";
import matter from "gray-matter";

const articlesDirectory = join(process.cwd(), "../../articles/_articles/");

export function getArticleSlugs() {
  return fs.readdirSync(articlesDirectory);
}

export function getAllArticleTags() {
  const articles = getAllArticles();
  const tags = articles.flatMap((article) => article.tags);

  return tags.filter((tag) => tag !== undefined);
}

export function getArticleBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(articlesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Article;
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    // sort articles by date in descending order
    .sort((article1, article2) => (article1.date > article2.date ? -1 : 1));
  return articles;
}

export function getAllArticlesByTag(tag: string): Article[] {
  const articles = getAllArticles();
  const filteredArticles = articles.filter((article) => {
    return article.tags?.includes(tag);
  });
  return filteredArticles;
}
