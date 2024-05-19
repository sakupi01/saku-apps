export interface ZennArticleObj {
  articles: ZennArticle[];
  next_page: null;
}

export interface ZennArticle {
  id: number;
  post_type: string;
  title: string;
  slug: string;
  comments_count: number;
  liked_count: number;
  body_letters_count: number;
  article_type: "tech" | "idea";
  emoji: string;
  is_suspending_private: boolean;
  published_at: Date;
  body_updated_at: Date;
  source_repo_updated_at: Date | null;
  pinned: boolean;
  path: string;
  user: User;
  publication: Publication | null;
}

export interface Publication {
  id: number;
  name: string;
  display_name: string;
  avatar_small_url: string;
  pro: boolean;
  avatar_registered: boolean;
}

export interface User {
  id: number;
  username: string;
  name: string;
  avatar_small_url: string;
}
