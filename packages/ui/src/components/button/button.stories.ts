import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    appName: "app",
  },
};
