import { ComponentStory, ComponentMeta } from '@storybook/react';

import Required from '.';

export default {
  title: 'shared/Atoms/Required',
  component: Required,
  argTypes: {
    style: { control: 'object' },
    className: { control: 'text' },
  },
} as ComponentMeta<typeof Required>;

const Template: ComponentStory<typeof Required> = function Template(args) {
  return <Required {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
