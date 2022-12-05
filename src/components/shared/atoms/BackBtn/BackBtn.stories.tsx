import { ComponentStory, ComponentMeta } from '@storybook/react';

import BackBtn from '.';

export default {
  title: 'shared/Atoms/BackBtn',
  component: BackBtn,
  argTypes: {
    style: { control: 'object' },
    className: { control: 'text' },
    color: { control: 'color' },
    url: { control: 'text' },
    onClick: { action: 'onClick' },
  },
} as ComponentMeta<typeof BackBtn>;

const Template: ComponentStory<typeof BackBtn> = function Template(args) {
  return <BackBtn {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  color: '#000',
};
