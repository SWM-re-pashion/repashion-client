import { ComponentStory, ComponentMeta } from '@storybook/react';

import Description from '.';

export default {
  title: 'shared/Atoms/Description',
  component: Description,
  argTypes: {
    description: {
      control: {
        type: 'text',
      },
    },
    className: {
      control: {
        type: 'text',
      },
    },
    style: {
      control: {
        type: 'object',
      },
    },
    fontSize: {
      control: {
        type: 'number',
      },
    },
    fontWeight: {
      control: {
        type: 'number',
      },
    },
    hasPreWrap: {
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof Description>;

const Template: ComponentStory<typeof Description> = function Template(args) {
  return <Description {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  fontSize: 14,
  fontWeight: 500,
  hasPreWrap: true,
  description: '설명\n입니다.',
};
