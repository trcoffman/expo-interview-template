import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { RadioItem, RadioGroup as XRadioGroup } from './Radio';

const meta = {
  title: 'Radio/Group',
  component: XRadioGroup,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof XRadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RadioGroup: Story = {
  render: (args) => (
    <XRadioGroup {...args}>
      <RadioItem value="yes">Yes</RadioItem>
      <RadioItem value="no">No</RadioItem>
    </XRadioGroup>
  ),
  args: { horizontal: false },
};
