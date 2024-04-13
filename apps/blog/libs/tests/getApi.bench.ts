import { readdirSync, readFileSync } from "fs";
import { Mock, bench, describe, expect, test, vitest } from "vitest";
import { getArticleBySlug, getArticleSlugs } from "../getApi";
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
});
