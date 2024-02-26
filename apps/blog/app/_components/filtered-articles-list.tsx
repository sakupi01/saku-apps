import { Article } from "@/interfaces/article";
import { fetchArticlesByQuery } from "@/libs/getApi";
import { ArticleListItem } from "@repo/ui";
import Link from "next/link";

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

        const renderTags = tagWithId?.map((tag) => (
          <Link href={`/dev/tag/${tag.name}`} key={tag.id}>
            <span className="tag mr-3">{tag.name}</span>
          </Link>
        ));

        return (
          <Link href={`/dev/articles/${article.slug}`} key={article.slug}>
            <ArticleListItem
              title={article.title}
              excerpt={article.excerpt}
              date={article.date}
              colors={`${article.beginColor} ${article.middleColor} ${article.endColor}`}
              tags={renderTags}
            />
          </Link>
        );
      })}
    </>
  );
}
