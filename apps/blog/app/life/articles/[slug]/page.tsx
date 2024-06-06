import ShareLinks from "@/app/_components/share";
import ThumbnailLife from "@/app/_components/thumbnail-life";
import generateToc from "@/libs/generateToc";
import { getArticleBySlug, getArticleSlugs } from "@/libs/getApi";
import markdownToHtml from "@/libs/markdownToHtml";
import { sanitizeHtml } from "@/libs/sanitize";
import { Button, Toc } from "@repo/ui";
import { ArrowUpCircle, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const CATEGORY = "life" as const;

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = params.slug;

  const article = getArticleBySlug(slug, CATEGORY);

  return {
    metadataBase: new URL("https://www.skr-blog.com"),
    title: {
      default: article?.title ?? "saku's blog",
      template: `%s - saku's Lifeblog`,
    },
    description: "saku's Lifeblog",
    openGraph: {
      title: article?.title ?? "saku's blog",
      description: "saku's Lifeblog",
      url: "/",
      siteName: "saku's blog",
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: article?.title ?? "saku's blog",
      description: "saku's Lifeblog",
      site: "@SakuOnTheWeb",
      creator: "@SakuOnTheWeb",
    },
    alternates: {
      canonical: "/",
    },
  };
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const slugs = getArticleSlugs(CATEGORY);

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function Article({ params }: Params) {
  const article = getArticleBySlug(params.slug, CATEGORY);

  if (!article) {
    return notFound();
  }

  const [content, toc] = await Promise.all([
    markdownToHtml(article.content),
    generateToc(article.content),
  ]);

  const tagWithId = article.tags.map((tag) => {
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
    <main>
      <div className="max-w-3xl mx-auto md:pt-20 md:px-20 md:pb-0 p-5">
        <Link href={"/life"}>
          <Button aria-label="back" intent="square-icon" size="square">
            <ChevronLeft />
          </Button>
        </Link>
        <ThumbnailLife
          url={article.coverImage.url}
          alt={article.coverImage.alt}
          title={article.title}
          date={article.date}
          tags={renderTags}
        />

        <div className="w-full flex justify-center items-start gap-10">
          <article className="w-full grow shrink-0 mb-32">
            <div className="w-full">
              <div
                className="markdown"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
              />
            </div>
          </article>
          <Toc
            // biome-ignore lint/suspicious/noExplicitAny: <As described https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents>
            nodes={toc as any[]}
            backToTopLink={
              <Link
                href="#top"
                className="w-full flex items-center justify-start gap-2 text-subtle hover:underline hover:text-basic"
              >
                ページの先頭に戻る
                <ArrowUpCircle />
              </Link>
            }
          />
        </div>
        <ShareLinks
          title={article.title}
          category={CATEGORY}
          slug={params.slug}
        />
      </div>
    </main>
  );
}
