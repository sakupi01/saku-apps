import { Button, Test } from "@repo/ui";
import Link from "next/link";
import { TypePageBlogPostSkeleton } from "../../../@types/contentful";
import { client } from "../libs/contentfulClient";

const getBlogEntries = async () => {
  const entries = await client.getEntries<TypePageBlogPostSkeleton>({
    content_type: "pageBlogPost",
  });
  return entries;
};

export default async function Page() {
  const entries = await getBlogEntries();
  console.log(entries.items);

  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center p-24">
      <Button appName="web">Click me!</Button>
      {entries.items.map((entry) => {
        const { slug, title, publishedDate } = entry.fields;
        return (
          <div key={slug}>
            <Link href={`/articles/${slug}`}>
              <h2>{title}</h2>
              <span>
                Posted on{" "}
                {new Date(publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </Link>
          </div>
        );
      })}

      <Test />

      <p>blog listing goes here</p>
    </main>
  );
}
