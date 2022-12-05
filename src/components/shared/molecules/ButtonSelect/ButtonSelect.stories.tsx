import { ComponentStory, ComponentMeta } from '@storybook/react';

import ButtonSelect from '.';

export default {
  title: 'shared/Molecules/ButtonSelect',
  component: ButtonSelect,
  argTypes: {
    style: { control: 'object' },
    className: { control: 'text' },
    label: { control: 'text' },
    data: { control: 'text' },
    isSelected: { control: 'boolean' },
    color: { control: 'color' },
    noCheckColor: { control: 'boolean' },
  },
} as ComponentMeta<typeof ButtonSelect>;

const Template: ComponentStory<typeof ButtonSelect> = function Template(args) {
  return <ButtonSelect {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Black',
  data: 'button',
  isSelected: false,
  color: '#000',
  noCheckColor: false,
};
