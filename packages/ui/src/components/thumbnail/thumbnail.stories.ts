import { Meta, StoryObj } from "@storybook/react";
import { Thumbnail } from "./thumbnail";

const meta = {
  title: "Thumbnail",
  component: Thumbnail,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "title",
    date: new Date().toISOString().split("T")[0],
    excerpt: "excerpt",
    beginColor: "#FEAC5E",
    middleColor: "#C779D0",
    endColor: "#4BC0C8",
    tags: ["tag1", "tag2"],
  },
};
