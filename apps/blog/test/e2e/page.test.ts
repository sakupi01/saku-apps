import { describe } from "node:test";
import { expect, test } from "next/experimental/testmode/playwright";
import { articles } from "./fixture/zenn";

// 検索バーにキーワードを入力し、検索ボタンをクリックすると、検索結果が表示されることを確認する
// 各リンクをクリックすると、ページが遷移することを確認する
describe("/", () => {
  test("Techblogをクリックすると、ページが遷移することを確認する", async ({
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
    await page.goto("http://localhost:3001");
    await page
      .getByRole("main")
      .getByRole("link", { name: "Techblog" })
      .click();
    await page.waitForURL(/dev/);
    expect(page.url()).toContain("dev");
  });

  test("Lifeblogをクリックすると、ページが遷移することを確認する", async ({
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
    await page.goto("http://localhost:3001");
    await page
      .getByRole("main")
      .getByRole("link", { name: "Lifeblog" })
      .click();
    await page.waitForURL(/life/);
    expect(page.url()).toContain("life");
  });
});
