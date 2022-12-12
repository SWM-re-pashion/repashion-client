import { ComponentStory, ComponentMeta } from '@storybook/react';

import RadioSelect from '.';

export default {
  title: 'shared/Molecules/RadioSelect',
  component: RadioSelect,
  argTypes: {
    name: { control: 'text' },
    selectedValue: { control: 'text' },
    isClicked: { control: 'boolean' },
    isBorder: { control: 'boolean' },
  },
} as ComponentMeta<typeof RadioSelect>;

const Template: ComponentStory<typeof RadioSelect> = function Template(args) {
  return <RadioSelect {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  name: '김동용',
  selectedValue: '김동용',
  isClicked: true,
  isBorder: true,
};
