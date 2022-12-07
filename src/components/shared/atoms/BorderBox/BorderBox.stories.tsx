import { ComponentStory, ComponentMeta } from '@storybook/react';

import BorderBox from '.';

export default {
  title: 'shared/Atoms/BorderBox',
  component: BorderBox,
  argTypes: {
    borderRadius: {
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<typeof BorderBox>;

const Template: ComponentStory<typeof BorderBox> = function Template(args) {
  return <BorderBox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  borderRadius: '10px',
  style: {
    width: '100px',
    height: '100px',
    backgroundColor: '#9d6dff',
  },
};
