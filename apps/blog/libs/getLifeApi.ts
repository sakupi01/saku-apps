import fs from "fs";
import { join } from "path";
import { Article } from "@/interfaces/article";
import matter from "gray-matter";

const lifeArticlesDirectory = join(process.cwd(), "../../articles/_life/");

export function getLifeArticleSlugs() {
  return fs.readdirSync(lifeArticlesDirectory);
}

export function getAllLifeArticleTags() {
  const articles = getAllLifeArticles();
  const tags = articles.flatMap((article) => article.tags);

  return tags.filter((tag) => tag !== undefined);
}

export function getLifeArticleBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(lifeArticlesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Article;
}

export function getAllLifeArticles(): Article[] {
  const slugs = getLifeArticleSlugs();
  const articles = slugs
    .map((slug) => getLifeArticleBySlug(slug))
    // sort articles by date in descending order
    .sort((article1, article2) => (article1.date > article2.date ? -1 : 1));
  return articles;
}

export function getAllLifeArticlesByTag(tag: string): Article[] {
  const articles = getAllLifeArticles();
  const filteredArticles = articles.filter((article) => {
    return article.tags?.includes(tag);
  });
  return filteredArticles;
}
