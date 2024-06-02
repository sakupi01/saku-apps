import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";

export async function fetcher<TResult, TVariables>(
  url: string,
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<TResult> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "node.js",
    },
    body: JSON.stringify({
      query: print(document),
      variables,
    }),
  });
  if (response.status !== 200) {
    throw new Error(
      `Failed to fetch: ${response.statusText}. Body: ${await response.text()}`,
    );
  }

  return (await response.json()).data;
}
