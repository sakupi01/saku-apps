import { readFileSync, readdirSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
  getArticleBySlug,
  getArticleSlugs,
  getZennArticleByCategory,
} from "../getApi";
import { ARTICLE, CATEGORIES } from "./fixtures/constants";
import { unitTestUtils } from "./utils/unitTestUtils";

describe("getApi", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getArticleSlugs", () => {
    const FILES = ["test1.md", "test-2.md"] as const;
    const { getArticlesDirectory, createMockDirent } = unitTestUtils;
    beforeEach(() => {
      vi.mocked(readdirSync).mockReturnValue(createMockDirent(FILES));
    });

    test("lifeカテゴリのとき、/articles/_life内からファイルを返す", () => {
      getArticleSlugs(CATEGORIES.life.name);

      expect(readdirSync).toHaveBeenCalledWith(
        getArticlesDirectory(CATEGORIES.life.dir),
      );
    });
    test("devカテゴリの時/articles/_dev内からファイルを返す", () => {
      getArticleSlugs(CATEGORIES.dev.name);

      expect(readdirSync).toHaveBeenCalledWith(
        getArticlesDirectory(CATEGORIES.dev.dir),
      );
    });
  });

  describe("getArticleBySlug", () => {
    const { getArticlesDirectory } = unitTestUtils;
    beforeEach(() => {
      vi.mocked(readFileSync).mockReturnValue(ARTICLE.data);
    });

    test("slugを受け取り、その記事のデータを返す", () => {
      const lifeArticlesDirectory = getArticlesDirectory(CATEGORIES.life.dir);
      const fullPath = `${lifeArticlesDirectory}${ARTICLE.slug}.md`;
      const lifeArticle = getArticleBySlug(ARTICLE.slug, CATEGORIES.life.name);

      expect(readFileSync).toHaveBeenCalledWith(fullPath, "utf8");
      expect(lifeArticle).toEqual({
        slug: "hoge",
        title: "test1",
        date: "2024-11-28",
        excerpt: "test1",
        content: "## 目次\n\n## はじめに\n",
        category: "dev",
        tags: ["test1"],
        status: "published",
      });
    });
  });

  describe("getZennArticleByCategory", () => {
    test("Zennの記事が取得できた場合はArticle型に変換してデータを返す", async () => {
      const lifeZennArticle = await getZennArticleByCategory("dev");

      expect(lifeZennArticle).toEqual([
        {
          slug: "a-glance-of-react-hooks",
          title: "Reactの状態を理解して適切にHooksを利用する",
          date: "2024-02-02",
          coverImage: {
            url: "https://lh3.googleusercontent.com/a-/AOh14Gj4KNw5uLzMvqRcvyDSrJAPIQCXAcTLblGzFYG5qA=s96-c",
            alt: "saku",
          },
          excerpt:
            "Zennで執筆した「Reactの状態を理解して適切にHooksを利用する」に関する記事です",
          content: "",
          preview: false,
          beginColor: "from-sky-200",
          middleColor: "via-blue-200",
          endColor: "to-violet-300",
          category: "dev",
          tags: ["zenn"],
          status: "published",
        },
      ]);
    });
  });
});
