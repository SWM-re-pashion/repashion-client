import { ComponentStory, ComponentMeta } from '@storybook/react';

import Title from '.';

export default {
  title: 'shared/Atoms/Title',
  component: Title,
  argTypes: {
    style: { control: 'object' },
    className: { control: 'text' },
    children: { control: 'text' },
  },
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = function Template(args) {
  return <Title {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  children: '타이틀',
};
