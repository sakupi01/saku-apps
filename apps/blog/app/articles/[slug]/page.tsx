import { getArticleBySlug } from "@/libs/getApi";
import markdownToHtml from "@/libs/markdownToHtml";
import { sanitizeHtml } from "@/libs/sanitize";
import { notFound } from "next/navigation";

type Params = {
  params: {
    slug: string;
  };
};

export default async function Article({ params }: Params) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return notFound();
  }

  const content = await markdownToHtml(article.content);

  return (
    <main>
      <article className="mb-32">
        <div className="max-w-2xl mx-auto">
          <div
            className="markdown"
            // https://biomejs.dev/ja/linter/rules/no-dangerously-set-inner-html/
            // `sanitizeHtml`によりサニタイズ済みのDOMを渡すので、`dangerouslySetInnerHTML`を許容する
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
          />
        </div>
      </article>
    </main>
  );
}
