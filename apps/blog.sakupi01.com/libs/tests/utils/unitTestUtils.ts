import type { Dirent } from "node:fs";
import { join } from "node:path";

const getArticlesDirectory = (dirName: "_life" | "_dev") => {
  return join(process.cwd(), `../../articles/${dirName}/`);
};

const createMockDirent = (slugs: readonly string[]): Dirent[] => {
  return slugs.map((slug) => {
    return {
      name: slug,
      parentPath: "",
      fullPath: "",
      path: "",
      isDirectory: () => false,
      isFile: () => true,
      isBlockDevice: () => false,
      isCharacterDevice: () => false,
      isFIFO: () => false,
      isSocket: () => false,
      isSymbolicLink: () => false,
    };
  });
};

export const unitTestUtils = {
  getArticlesDirectory: getArticlesDirectory,
  createMockDirent: createMockDirent,
};
