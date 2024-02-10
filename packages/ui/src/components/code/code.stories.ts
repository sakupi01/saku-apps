import { Meta, StoryObj } from '@storybook/react'
import { Code } from './code';

const meta = {
  title: "Code",
  component: Code,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
  },
} satisfies Meta<typeof Code>;


export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: null,
  },
};