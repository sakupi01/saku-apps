import { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./markdown-typography";

const meta = {
  title: "Markdown Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
