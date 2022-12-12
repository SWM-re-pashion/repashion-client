import { ComponentStory, ComponentMeta } from '@storybook/react';

import NotFound from '.';

export default {
  title: 'shared/Templates/NotFound',
  component: NotFound,
  argTypes: {
    title: { control: 'text' },
    img: { control: 'text' },
    alt: { control: 'text' },
  },
} as ComponentMeta<typeof NotFound>;

const Template: ComponentStory<typeof NotFound> = function Template(args) {
  return <NotFound {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
