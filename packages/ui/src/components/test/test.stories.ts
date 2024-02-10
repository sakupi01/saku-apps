import { Meta, StoryObj } from '@storybook/react'
import { Test } from './test';

const meta = {
  title: "Test",
  component: Test,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
  },
} satisfies Meta<typeof Test>;


export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
};