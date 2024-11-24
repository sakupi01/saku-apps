import * as v from "valibot";

export const ArticleSchema = v.object({
  slug: v.string(),
  title: v.string(),
  date: v.string(),
  coverImage: v.optional(
    v.object({
      url: v.string(),
      alt: v.string(),
    }),
  ),
  excerpt: v.string(),
  content: v.string(),
  preview: v.optional(v.boolean()),
  beginColor: v.optional(v.string()),
  middleColor: v.optional(v.string()),
  endColor: v.optional(v.string()),
  category: v.union([v.literal("dev"), v.literal("life")]),
  tags: v.array(v.string()),
  status: v.union([v.literal("published"), v.literal("draft")]),
});

const UserSchema = v.object({
  id: v.number(),
  username: v.string(),
  name: v.string(),
  avatar_small_url: v.string(),
});

const PublicationSchema = v.object({
  id: v.number(),
  name: v.string(),
  display_name: v.string(),
  avatar_small_url: v.string(),
  pro: v.boolean(),
  avatar_registered: v.boolean(),
});

export const ZennArticleSchema = v.object({
  id: v.number(),
  post_type: v.string(),
  title: v.string(),
  slug: v.string(),
  comments_count: v.number(),
  liked_count: v.number(),
  body_letters_count: v.number(),
  article_type: v.union([v.literal("tech"), v.literal("idea")]),
  emoji: v.string(),
  is_suspending_private: v.boolean(),
  published_at: v.string(),
  body_updated_at: v.string(),
  source_repo_updated_at: v.nullable(v.string()),
  pinned: v.boolean(),
  path: v.string(),
  user: UserSchema,
  publication: v.nullable(PublicationSchema),
});

export const ZennArticleObjSchema = v.object({
  articles: v.array(ZennArticleSchema),
  next_page: v.null(),
});
