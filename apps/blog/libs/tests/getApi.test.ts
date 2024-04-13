import { readFileSync, readdirSync } from "fs";
import { Mock, describe, expect, test, vitest } from "vitest";
import {
  getArticleBySlug,
  getArticleSlugs,
  getZennArticleByCategory,
} from "../getApi";
import { ARTICLE, WHICH } from "./constants/unitTestConstants";
import { unitTestUtils } from "./utils/unitTestUtils";

vitest.mock("fs");

describe("getApi", () => {
  describe("getArticleSlugs", () => {
    test("lifeカテゴリの時/articles/_life内ファイルのslugを文字列配列として返す", () => {
      (readdirSync as Mock).mockReturnValue(["test1.md", "test-2.md"]);
      const { getArticlesDirectory } = unitTestUtils;
      const lifeArticlesDirectory = getArticlesDirectory(WHICH.life.dir);
      const lifeSlugs = getArticleSlugs(WHICH.life.name);
      expect(lifeSlugs).toEqual(["test1.md", "test-2.md"]);
      expect(readdirSync).toHaveBeenCalledWith(lifeArticlesDirectory);
    });
    test("devカテゴリの時/articles/_dev内ファイルのslugを文字列配列として返す", () => {
      (readdirSync as Mock).mockReturnValue(["test1.md", "test-2.md"]);
      const { getArticlesDirectory } = unitTestUtils;
      const devArticlesDirectory = getArticlesDirectory(WHICH.dev.dir);
      const devSlugs = getArticleSlugs(WHICH.dev.name);
      expect(devSlugs).toEqual(["test1.md", "test-2.md"]);
      expect(readdirSync).toHaveBeenCalledWith(devArticlesDirectory);
    });
  });

  describe("getArticleBySlug", () => {
    test("slugを受け取り、その記事のデータを返す", () => {
      const { getArticlesDirectory } = unitTestUtils;
      const lifeArticlesDirectory = getArticlesDirectory(WHICH.life.dir);

      const fullPath = `${lifeArticlesDirectory}${ARTICLE.slug}.md`;

      (readdirSync as Mock).mockReturnValue(["test1.md"]);
      (readFileSync as Mock).mockReturnValue(
        ARTICLE.content.replace(/^\n/g, "\n"),
      );
      const lifeArticle = getArticleBySlug(ARTICLE.slug, WHICH.life.name);

      expect(lifeArticle).toEqual({
        slug: "test1",
        content: ARTICLE.content,
      });

      expect(readdirSync).toHaveBeenCalledWith(lifeArticlesDirectory);
      expect(readFileSync).toHaveBeenCalledWith(fullPath, "utf8");
    });
  });

  describe("getZennArticleByCategory", () => {
    test("カテゴリを受け取り、Zenn記事のデータを返し、カテゴリの記事を抽出し、ブログの記事の型に合わせる", async () => {
      const devZennArticle = await getZennArticleByCategory("dev");

      // MEMO: Zennの記事が取得できなかったときはcatchで、undefinedが返る
      expect(devZennArticle).not.toBeUndefined();
    });
  });
});
