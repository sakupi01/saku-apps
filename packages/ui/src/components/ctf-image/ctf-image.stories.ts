import { Meta, StoryObj } from "@storybook/react";
import { CtfImage } from "./ctf-image";

const meta = {
  title: "CtfImage",
  component: CtfImage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof CtfImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
