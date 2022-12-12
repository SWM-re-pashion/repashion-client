import { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextInput from '.';

export default {
  title: 'shared/Molecules/TextInput',
  component: TextInput,
  argTypes: {
    style: { control: 'object' },
    className: { control: 'text' },
    controlled: { control: 'boolean' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    postLabel: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = function Template(args) {
  const [value, setValue] = useState('178');
  return (
    <TextInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  controlled: true,
  placeholder: '키를 입력해주세요.',
  label: '키',
  postLabel: 'cm',
};
