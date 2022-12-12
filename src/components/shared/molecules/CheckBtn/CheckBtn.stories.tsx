import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckBtn from '.';

export default {
  title: 'shared/Molecules/CheckBtn',
  component: CheckBtn,
  argTypes: {
    isChecked: { control: 'boolean' },
  },
} as ComponentMeta<typeof CheckBtn>;

const Template: ComponentStory<typeof CheckBtn> = function Template(args) {
  return <CheckBtn {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isChecked: true,
};
