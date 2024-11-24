import { readFileSync, readdirSync } from "node:fs";
import {
  type Mock,
  beforeEach,
  bench,
  describe,
  test,
  vi,
  vitest,
} from "vitest";
import {
  getArticleBySlug,
  getArticleSlugs,
  getZennArticleByCategory,
} from "../getApi";
import { ARTICLE, CATEGORIES } from "./fixtures/constants";
import { unitTestUtils } from "./utils/unitTestUtils";

vitest.mock("fs");

describe("getApi", () => {
  describe("getArticleSlugs", () => {
    const { createMockDirent } = unitTestUtils;
    const hugeArray = Array.from({ length: 1000000 }, (_, i) => i.toString());
    beforeEach(() => {
      vi.mocked(readdirSync).mockReturnValue(createMockDirent(hugeArray));
    });
    bench("lifeカテゴリのとき、/articles/_life内からファイルを返す", () => {
      getArticleSlugs("life");
    });
    bench("devカテゴリの時/articles/_dev内からファイルを返す", () => {
      getArticleSlugs("dev");
    });
  });

  describe("getArticleBySlug", () => {
    beforeEach(() => {
      vi.mocked(readFileSync).mockReturnValue(ARTICLE.data);
    });

    bench("slugを受け取り、その記事のデータを返す", () => {
      getArticleBySlug(ARTICLE.slug, CATEGORIES.life.name);
    });
  });

  describe("getZennArticleByCategory", () => {
    test("Zennの記事が取得できた場合はArticle型に変換してデータを返す", async () => {
      await getZennArticleByCategory("dev");
    });
  });
});
