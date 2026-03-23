import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TokenDemo } from './TokenDemo'

const meta: Meta<typeof TokenDemo> = {
  title: 'Foundation/TokenDemo',
  component: TokenDemo,
}
export default meta

type Story = StoryObj<typeof TokenDemo>
export const Default: Story = {}
