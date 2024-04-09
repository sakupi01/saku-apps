import FilteredArticlesListContainer from "@/app/_components/filtered-articles-list-container";
import Pagination from "@/app/_components/pagenation";
import { fetchArticlePages, getAllArticleTags } from "@/libs/getApi";

const CATEGORY = "dev" as const;

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
  const slugs = await getAllArticleTags(CATEGORY);

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function Page({ params, searchParams }: Params) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchArticlePages(CATEGORY, query, params.slug);

  return (
    <main className="flex min-w-screen flex-col items-center justify-center p-5 md:p-24">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-left text-basic my-10">
          Articles
        </h1>
        <FilteredArticlesListContainer
          query={query}
          currentPage={currentPage}
          category={CATEGORY}
          tag={params.slug}
        />
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
