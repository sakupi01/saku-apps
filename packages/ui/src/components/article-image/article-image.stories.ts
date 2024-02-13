import { Meta, StoryObj } from "@storybook/react";
import { ArticleImage } from "./article-image";

const meta = {
  title: "ArticleImage",
  component: ArticleImage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof ArticleImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
