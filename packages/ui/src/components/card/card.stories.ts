import { Meta, StoryObj } from "@storybook/react";
import { Card } from "./card";

const meta = {
  title: "Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Card",
    children: null,
    href: "https://example.com",
  },
};
