import type * as v from "valibot";
import type {
  ArticleSchema,
  ZennArticleObjSchema,
  ZennArticleSchema,
} from "./schema";

export type ArticleSchemaType = v.InferOutput<typeof ArticleSchema>;

export type ZennArticleObjType = v.InferOutput<typeof ZennArticleObjSchema>;

export type ZennArticleType = v.InferOutput<typeof ZennArticleSchema>;
