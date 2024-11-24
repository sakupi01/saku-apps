import type { ArticleSchemaType } from "@/interfaces/type";
import { ArticleListItem, Divider } from "@repo/ui";
import { ArticleListItemLife } from "./article-list-item-life";

export default async function FilteredArticlesList({
  filteredArticles,
}: {
  filteredArticles: ArticleSchemaType[];
}) {
  return (
    <div role="list">
      {filteredArticles.map((article) => {
        const tagWithId = article.tags.map((tag) => {
          const id = Math.random().toString(32).substring(2);
          return {
            id: id,
            name: tag,
          };
        });

        return (
          <div key={article.slug}>
            {article.category === "life" ? (
              <ArticleListItemLife
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                url={
                  article.coverImage?.url ||
                  "https://blog.sakupi01.com/icon.svg"
                }
                alt={article.coverImage?.alt || "saku's Icon"}
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
          </div>
        );
      })}
    </div>
  );
}
