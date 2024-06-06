import { CALENDAR } from "@/components/fixture/calendar";
import type { Meta, StoryObj } from "@storybook/react";
import { Heatmap } from "./heatmap";

const meta = {
  title: "Github Heatmap",
  component: Heatmap,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof Heatmap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: CALENDAR,
  },
};
