export type Article = {
  slug: string;
  title: string;
  date: string;
  coverImage: {
    url: string;
    alt: string;
  };
  excerpt: string;
  content: string;
  preview?: boolean;
  beginColor?: string;
  middleColor?: string;
  endColor?: string;
  category: "dev" | "life";
  tags?: string[];
};
