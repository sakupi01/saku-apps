import { bench, describe, expect, Mock, test, vitest } from "vitest";
import { getArticleSlugs } from "../getApi";
import { readdirSync } from "fs";

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
});
