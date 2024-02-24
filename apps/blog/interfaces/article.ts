export type Article = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
  beginColor: string;
  middleColor: string;
  endColor: string;
};
