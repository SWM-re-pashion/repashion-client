import { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputRange from '.';

export default {
  title: 'shared/Molecules/InputRange',
  component: InputRange,
  argTypes: {
    minValue: { control: 'number' },
    maxValue: { control: 'number' },
    step: { control: 'number' },
    left: { control: 'number' },
    right: { control: 'number' },
    update: { control: 'function' },
  },
} as ComponentMeta<typeof InputRange>;

const Template: ComponentStory<typeof InputRange> = function Template(args) {
  const [value, setValue] = useState([0, 100]);
  const update = (input: number, idx: number) => {
    const toBeValue = [...value];
    toBeValue[idx] = input;
    setValue(toBeValue);
  };
  return (
    <InputRange {...args} update={update} left={value[0]} right={value[1]} />
  );
};

export const Default = Template.bind({});
Default.args = {
  minValue: 0,
  maxValue: 100,
  step: 5,
};
