import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSelector } from "./theme-selector";

const meta = {
  title: "Github ThemeSelector",
  component: ThemeSelector,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof ThemeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
