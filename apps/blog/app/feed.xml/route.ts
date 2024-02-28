import { getAllArticles } from "@/libs/getApi";
import RSS from "rss";

const HOST = "https://www.skr-blog.com" as const;
export async function GET() {
  const feed = new RSS({
    title: "saku's blog",
    description: "sakuの備忘録",
    site_url: "https://www.skr-blog.com",
    feed_url: "https://www.skr-blog.com/feed.xml",
    copyright: "saku",
    language: "ja",
    pubDate: new Date().toISOString(),
  });
  const articles = getAllArticles();
  articles.map((article) => {
    feed.item({
      title: article.title,
      guid: `${HOST}/${article.category}/articles/${article.slug}`,
      url: `${HOST}/${article.category}/articles/${article.slug}`,
      date: article.date,
      description: article.excerpt,
      author: "saku",
      categories: article.tags?.map((tag) => tag) || [],
    });
  });
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
