import { Meta, StoryObj } from "@storybook/react";
import { CtfRt } from "./ctf-rt";

const meta = {
  title: "CtfRt",
  component: CtfRt,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof CtfRt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
