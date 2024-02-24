import { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./divider";

const meta = {
  title: "Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
