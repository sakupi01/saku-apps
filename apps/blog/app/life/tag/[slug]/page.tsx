import Pagination from "@/app/_components/pagenation";
import {
  fetchArticlePages,
  fetchArticlesByQuery,
  getAllArticleTags,
} from "@/libs/getApi";
import { ArticleListItem } from "@repo/ui";
import Link from "next/link";
import { Suspense } from "react";

const CATEGORY = "life" as const;

type Params = {
  params: {
    slug: string;
  };
  searchParams: {
    query?: string;
    page?: string;
  };
};
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const slugs = getAllArticleTags(CATEGORY);

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function Page({ params, searchParams }: Params) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchArticlePages(CATEGORY, query, params.slug);

  const filteredArticles = await fetchArticlesByQuery(
    query,
    currentPage,
    CATEGORY,
    params.slug,
  );
  return (
    <main className="flex min-w-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl font-bold text-left text-basic my-10">
        Articles
      </h1>
      <div className="w-full max-w-2xl mx-auto">
        <Suspense key={query + currentPage} fallback={<>loading...</>}>
          {filteredArticles.map((article) => {
            const tagWithId = article.tags?.map((tag) => {
              const id = Math.random().toString(32).substring(2);
              return {
                id: id,
                name: tag,
              };
            });

            const renderTags = tagWithId?.map((tag) => (
              <Link href={`/life/tag/${tag.name}`} key={tag.id}>
                <span className="tag mr-3">{tag.name}</span>
              </Link>
            ));

            return (
              <Link href={`/life/articles/${article.slug}`} key={article.slug}>
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
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
