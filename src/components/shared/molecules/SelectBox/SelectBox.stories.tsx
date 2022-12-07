import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelectBox from '.';

export default {
  title: 'shared/Molecules/SelectBox',
  component: SelectBox,
  argTypes: {
    name: { control: 'text' },
    options: { control: 'object' },
    selected: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    isGender: { control: 'boolean' },
    fontWeight: { control: 'number' },
    fontSize: { control: 'number' },
    hasId: { control: 'boolean' },
    isSameCodeName: { control: 'boolean' },
  },
} as ComponentMeta<typeof SelectBox>;

const Template: ComponentStory<typeof SelectBox> = function Template(args) {
  return <SelectBox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  name: '김동용',
  options: ['김동용', '김동용2', '김동용3'],
  selected: '김동용',
  width: '100px',
  height: '30px',
  isGender: false,
  fontWeight: 400,
  fontSize: 14,
  hasId: false,
  isSameCodeName: false,
};
