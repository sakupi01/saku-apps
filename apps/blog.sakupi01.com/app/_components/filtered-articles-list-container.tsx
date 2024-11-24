import { fetchArticlesByQuery } from "@/libs/getApi";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import FilteredArticlesList from "./filtered-articles-list";

export default async function FilteredArticlesListContainer({
  query,
  currentPage,
  category,
  tag,
}: {
  query: string;
  currentPage: number;
  category: "life" | "dev";
  tag?: string;
}) {
  const filteredArticles = await fetchArticlesByQuery(
    query,
    currentPage,
    category,
    tag,
  );
  return (
    <Suspense
      key={query + currentPage}
      fallback={<Skeleton count={5} height="150px" className="mb-4" />}
    >
      <FilteredArticlesList filteredArticles={filteredArticles} />
    </Suspense>
  );
}
