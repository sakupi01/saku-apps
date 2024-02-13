import { strict as assert } from "assert";
import { createClient } from "contentful";

assert(process.env.CONTENTFUL_SPACE_ID);
assert(process.env.CONTENTFUL_ACCESS_TOKEN);

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Multiple versions of [slug] using page will be statically generated
// using the `params` returned by `generateStaticParams`
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  const queryOptions = {
    content_type: "pageBlogPost",
    select: "fields.slug",
  };
  const articles = await client.getEntries(queryOptions);
  return articles.items.map((article) => ({
    slug: article.fields.slug,
  }));
}
