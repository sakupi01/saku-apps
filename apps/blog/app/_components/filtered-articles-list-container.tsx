import { fetchArticlesByQuery } from "@/libs/getApi";
import FilteredArticlesList from "./filtered-articles-list";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

export default async function FilteredArticlesListContainer({
  query,
  currentPage,
  category,
}: {
  query: string;
  currentPage: number;
  category: "life" | "dev";
}) {
  const filteredArticles = await fetchArticlesByQuery(
    query,
    currentPage,
    category,
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
