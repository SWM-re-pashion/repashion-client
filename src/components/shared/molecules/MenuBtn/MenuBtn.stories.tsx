import { ComponentStory, ComponentMeta } from '@storybook/react';

import MenuBtn from '.';

export default {
  title: 'shared/Molecules/MenuBtn',
  component: MenuBtn,
  argTypes: {
    name: { control: 'text' },
    value: { control: 'text' },
    onClick: { control: 'function' },
    isSelected: { control: 'boolean' },
  },
} as ComponentMeta<typeof MenuBtn>;

const Template: ComponentStory<typeof MenuBtn> = function Template(args) {
  return <MenuBtn {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  name: '클릭',
  value: 'click',
  isSelected: true,
};
