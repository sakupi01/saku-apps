import generateToc from "@/libs/generateToc";
import { getArticleBySlug, getArticleSlugs } from "@/libs/getApi";
import markdownToHtml from "@/libs/markdownToHtml";
import { sanitizeHtml } from "@/libs/sanitize";
import { Thumbnail, Toc } from "@repo/ui";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = {
  params: {
    slug: string;
  };
};

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const slugs = getArticleSlugs();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function Article({ params }: Params) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return notFound();
  }

  const [content, toc] = await Promise.all([
    markdownToHtml(article.content),
    generateToc(article.content),
  ]);

  const tagWithId = article.tags?.map((tag) => {
    const id = Math.random().toString(32).substring(2);
    return {
      id: id,
      name: tag,
    };
  });

  const renderTags = tagWithId?.map((tag) => (
    <Link href={`/tag/${tag.name}`}>
      <span key={tag.id} className="tag mr-3">
        {tag.name}
      </span>
    </Link>
  ));

  return (
    <main>
      <div className="max-w-2xl mx-auto">
        <Thumbnail
          title={article.title}
          date={article.date}
          beginColor={`${article.beginColor}`}
          middleColor={`${article.middleColor}`}
          endColor={`${article.endColor}`}
          tags={renderTags}
        />
        <div className="flex justify-start items-start gap-10">
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
          {/* biome-ignore lint/suspicious/noExplicitAny: <As described https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents> */}
          <Toc nodes={toc as any[]} />
        </div>
      </div>
    </main>
  );
}
