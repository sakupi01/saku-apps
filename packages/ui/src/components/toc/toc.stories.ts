import { Meta, StoryObj } from "@storybook/react";
import { Toc } from "./toc";

const meta = {
  title: "Toc",
  component: Toc,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof Toc>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
