import { ComponentStory, ComponentMeta } from '@storybook/react';

import Description from '.';

export default {
  title: 'shared/Atoms/Description',
  component: Description,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
    },
    style: { control: 'object' },
    children: {
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<typeof Description>;

const Template: ComponentStory<typeof Description> = function Template(args) {
  return <Description {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  children: '설명',
};
