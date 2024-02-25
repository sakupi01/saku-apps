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
    intent: "primary",
    size: "medium",
  },
};

export const Secondary: Story = {
  args: {
    intent: "secondary",
    size: "medium",
  },
};

export const Subtle: Story = {
  args: {
    intent: "subtle",
    size: "medium",
  },
};

export const Ghost: Story = {
  args: {
    intent: "ghost",
    size: "medium",
  },
};

export const SquareIcon: Story = {
  args: {
    intent: "square-icon",
    size: "square",
    children: "🌟",
  },
};

export const RoundIcon: Story = {
  args: {
    intent: "round-icon",
    size: "square",
    children: "🌟",
  },
};
