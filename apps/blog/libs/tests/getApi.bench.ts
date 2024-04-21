import { readFileSync, readdirSync } from "fs";
import { Mock, bench, describe, expect, test, vitest } from "vitest";
import {
  getAllArticles,
  getArticleBySlug,
  getArticleSlugs,
  getZennArticleByCategory,
} from "../getApi";
import { ARTICLE, WHICH } from "./constants/unitTestConstants";

vitest.mock("fs");

describe("getApi", () => {
  describe("getArticleSlugs", () => {
    // create a huge array
    const hugeArray = Array.from({ length: 1000000 }, (_, i) => i);
    bench(
      "lifeカテゴリの時/articles/_life内ファイルのslugを文字列配列として返す",
      () => {
        (readdirSync as Mock).mockReturnValue(hugeArray);
        getArticleSlugs("life");
      },
    );
    bench(
      "devカテゴリの時/articles/_dev内ファイルのslugを文字列配列として返す",
      () => {
        (readdirSync as Mock).mockReturnValue(hugeArray);
        getArticleSlugs("dev");
      },
    );
  });

  describe("getArticleBySlug", () => {
    bench("slugを受け取り、その記事のデータを返す", () => {
      (readdirSync as Mock).mockReturnValue(["test1.md"]);
      (readFileSync as Mock).mockReturnValue(
        ARTICLE.content.replace(/^\n/g, "\n"),
      );
      getArticleBySlug(ARTICLE.slug, WHICH.life.name);
    });
  });

  describe("getZennArticleByCategory", () => {
    test("カテゴリを受け取り、Zenn記事のデータを返し、カテゴリの記事を抽出し、ブログの記事の型に合わせる", async () => {
      await getZennArticleByCategory("dev");
    });
  });

  describe("getAllArticles", () => {
    bench("すべての記事を取得する", () => {
      (readdirSync as Mock).mockReturnValue(["test1.md"]);
      (readFileSync as Mock).mockReturnValue(
        ARTICLE.content.replace(/^\n/g, "\n"),
      );
      getAllArticles();
    });
  });
});
