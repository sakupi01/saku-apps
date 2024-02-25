import fs from "fs";
import { join } from "path";
import { Article } from "@/interfaces/article";
import matter from "gray-matter";

const techArticlesDirectory = join(process.cwd(), "../../articles/_tech/");

export function getTechArticleSlugs() {
  return fs.readdirSync(techArticlesDirectory);
}

export function getAllTechArticleTags() {
  const articles = getAllTechArticles();
  const tags = articles.flatMap((article) => article.tags);

  return tags.filter((tag) => tag !== undefined);
}

export function getTechArticleBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(techArticlesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Article;
}

export function getAllTechArticles(): Article[] {
  const slugs = getTechArticleSlugs();
  const articles = slugs
    .map((slug) => getTechArticleBySlug(slug))
    // sort articles by date in descending order
    .sort((article1, article2) => (article1.date > article2.date ? -1 : 1));
  return articles;
}

export function getAllTechArticlesByTag(tag: string): Article[] {
  const articles = getAllTechArticles();
  const filteredArticles = articles.filter((article) => {
    return article.tags?.includes(tag);
  });
  return filteredArticles;
}
