import { Article } from "@/interfaces/article";
import { ArticleListItem } from "@repo/ui";
import Link from "next/link";
import { ArticleListItemLife } from "./article-list-item-life";

export default async function FilteredArticlesList({
  category,
  filteredArticles,
}: {
  category: "life" | "dev";
  filteredArticles: Article[];
}) {
  return (
    <>
      {filteredArticles.map((article) => {
        const tagWithId = article.tags?.map((tag) => {
          const id = Math.random().toString(32).substring(2);
          return {
            id: id,
            name: tag,
          };
        });

        const renderTags = tagWithId?.map((tag) => (
          <Link href={`/${category}/tag/${tag.name}`} key={tag.id}>
            <span className="tag mr-3">{tag.name}</span>
          </Link>
        ));

        return (
          <Link
            href={`/${category}/articles/${article.slug}`}
            key={article.slug}
          >
            {category === "life" ? (
              <ArticleListItemLife
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                url={article.coverImage.url}
                alt={article.coverImage.alt}
                tags={renderTags}
              />
            ) : (
              <ArticleListItem
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                colors={`${article.beginColor} ${article.middleColor} ${article.endColor}`}
                tags={renderTags}
              />
            )}
          </Link>
        );
      })}
    </>
  );
}
