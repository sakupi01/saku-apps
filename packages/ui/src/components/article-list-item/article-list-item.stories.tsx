import { Meta, StoryObj } from "@storybook/react";
import { ArticleListItem } from "./article-list-item";

const meta = {
  title: "ArticleListItem",
  component: ArticleListItem,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="w-full max-w-[800px] h-full flex flex-col justify-center items-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const TAGS = ["tag1", "tag2"] as const;

const tagWithId = TAGS?.map((tag) => {
  const id = Math.random().toString(32).substring(2);
  return {
    id: id,
    name: tag,
  };
});

export const Default: Story = {
  args: {
    title: "title",
    excerpt: "excerptexcerptexcerptexcerptexcerptexcerptexcerptexcerptexcerpt",
    date: new Date().toISOString().split("T")[0] ?? "",
    colors: "from-[#FEAC5E] via-[#C779D0] to-[#4BC0C8]",
    tags: tagWithId,
    slug: "slug",
  },
};
