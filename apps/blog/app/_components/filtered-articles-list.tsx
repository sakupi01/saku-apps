import { Article } from "@/interfaces/article";
import { ArticleListItem, Divider } from "@repo/ui";
import { ArticleListItemLife } from "./article-list-item-life";

export default async function FilteredArticlesList({
  filteredArticles,
}: {
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

        return (
          <>
            {article.category === "life" ? (
              <ArticleListItemLife
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                url={article.coverImage.url}
                alt={article.coverImage.alt}
                tags={tagWithId}
                slug={article.slug}
              />
            ) : (
              <ArticleListItem
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                colors={`${article.beginColor} ${article.middleColor} ${article.endColor}`}
                tags={tagWithId}
                slug={article.slug}
              />
            )}
            <Divider />
          </>
        );
      })}
    </>
  );
}
