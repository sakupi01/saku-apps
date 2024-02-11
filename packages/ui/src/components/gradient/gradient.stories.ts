import { Meta, StoryObj } from "@storybook/react";
import { Gradient } from "./gradient";

const meta = {
  title: "Gradient",
  component: Gradient,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof Gradient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
