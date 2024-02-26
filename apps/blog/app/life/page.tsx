import { fetchArticlePages } from "@/libs/getApi";
import FilteredArticlesListContainer from "../_components/filtered-articles-list-container";
import Pagination from "../_components/pagenation";

const CATEGORY = "life" as const;
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchArticlePages(CATEGORY, query);

  return (
    <main className="flex min-w-screen flex-col items-center justify-center p-14 md:p-24">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="w-full text-5xl font-bold text-left text-basic my-10">
          Articles
        </h1>
        <FilteredArticlesListContainer
          query={query}
          currentPage={currentPage}
          category={CATEGORY}
        />
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
