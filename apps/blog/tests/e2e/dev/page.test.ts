import { describe } from "node:test";
import { expect, test } from "next/experimental/testmode/playwright";
import { oembed } from "../fixture/oembed";
import { articles } from "../fixture/zenn";

describe("/dev:show", () => {
  test("画面が正しく表示される", async ({ page, next }) => {
    next.onFetch((req) => {
      if (
        req.url ===
        "https://zenn.dev/api/articles?username=s_a_k_u&order=latest"
      ) {
        return new Response(JSON.stringify(articles), {
          headers: { "Content-Type": "application/json" },
        });
      }
    });
    await page.goto("http://localhost:3001/dev");
    expect(await page.title()).toContain("Techblog");
  });
  test("Zenn以外の記事をクリックして、記事が表示される", async ({
    page,
    next,
  }) => {
    const ARTICLE_TITLE = "Next.jsでSSGとmarkdown";
    next.onFetch((req) => {
      if (
        req.url ===
        "https://zenn.dev/api/articles?username=s_a_k_u&order=latest"
      ) {
        return new Response(JSON.stringify(articles), {
          headers: { "Content-Type": "application/json" },
        });
      }
      if (req.url === "https://oembed.com/providers.json") {
        return new Response(JSON.stringify(oembed), {
          headers: { "Content-Type": "application/json" },
        });
      }
    });
    await page.goto("http://localhost:3001/dev");
    await page.getByRole("link", { name: ARTICLE_TITLE }).click();
    await page.waitForURL(/articles/);
    expect(await page.title()).toContain(ARTICLE_TITLE);
  });
});

describe("/dev:search", () => {
  test("検索バーにキーワードを入力し、検索ボタンをクリックすると、検索結果が表示されることを確認する", async ({
    page,
    next,
  }) => {
    next.onFetch((req) => {
      if (
        req.url ===
        "https://zenn.dev/api/articles?username=s_a_k_u&order=latest"
      ) {
        return new Response(JSON.stringify(articles), {
          headers: { "Content-Type": "application/json" },
        });
      }
    });
    await page.goto("http://localhost:3001/dev");
    await page.getByRole("searchbox").fill("react");
    const filteredListItems = page
      .getByRole("list")
      .getByRole("listitem")
      .all();
    for (const item of await filteredListItems) {
      const textContent = await item.textContent();
      expect(textContent?.toLowerCase()).toContain("react");
    }
  });
  test("タグ名をクリックして、正しく関連する記事が表示される", async ({
    page,
    next,
  }) => {
    const TAG_NAME = "react";
    next.onFetch((req) => {
      if (
        req.url ===
        "https://zenn.dev/api/articles?username=s_a_k_u&order=latest"
      ) {
        return new Response(JSON.stringify(articles), {
          headers: { "Content-Type": "application/json" },
        });
      }
    });
    await page.goto("http://localhost:3001/dev");
    await page.getByRole("link", { name: TAG_NAME, exact: true }).click();
    await page.waitForURL(/tag/);
    const filteredListItems = page
      .getByRole("list")
      .getByRole("listitem")
      .all();
    for (const item of await filteredListItems) {
      const textContent = await item.textContent();
      expect(textContent?.toLowerCase()).toContain(TAG_NAME.toLowerCase());
    }
  });
});
