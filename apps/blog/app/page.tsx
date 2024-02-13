import { getAllArticles } from "@/libs/getApi";
import { Button } from "@repo/ui";
import Link from "next/link";

export default async function Page() {
  const allArticles = getAllArticles();
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center p-24">
      <Button appName="web">Click me!</Button>

      <h1>Articles</h1>
      {allArticles.map((article) => (
        <Link href={`/articles/${article.slug}`}>
          <div key={article.slug}>
            <h2>{article.title}</h2>
          </div>
        </Link>
      ))}
    </main>
  );
}
