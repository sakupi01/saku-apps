import { describe } from "node:test";
import { expect } from "@playwright/test";
import { test } from "next/experimental/testmode/playwright.js";
import { articles } from "./fixture/zenn";

// 各リンクをクリックすると、ページが遷移することを確認する
describe("navigation", () => {
  test("ロゴをクリックすると、ホームにもどることを確認する", async ({
    page,
  }) => {
    await page.goto("http://localhost:3001");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "saku" })
      .click();
    await page.waitForURL("");
    expect(page.url()).toBe("http://localhost:3001/");
  });

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
      .getByRole("navigation")
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
      .getByRole("navigation")
      .getByRole("link", { name: "Lifeblog" })
      .click();
    await page.waitForURL(/life/);
    expect(page.url()).toContain("life");
  });
  test("Aboutをクリックすると、ページが遷移することを確認する", async ({
    page,
  }) => {
    await page.goto("http://localhost:3001");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "About" })
      .click();
    await page.waitForURL(/about/);
    expect(page.url()).toContain("about");
  });
});
