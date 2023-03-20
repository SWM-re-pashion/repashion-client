import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '.';

export default {
  title: 'shared/Atoms/Button',
  component: Button,
  argTypes: {
    handleClick: {
      action: 'handleClick',
    },
    customStyle: {
      control: {
        type: 'object',
      },
    },
    children: {
      control: {
        type: 'object',
      },
    },
    iconBtn: {
      control: {
        type: 'boolean',
      },
    },
    hasErrorMsg: {
      control: {
        type: 'boolean',
      },
    },
    ariaLabel: {
      control: {
        type: 'text',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = function Template(args) {
  return <Button {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  hasErrorMsg: false,
  iconBtn: false,
  children: '버튼 텍스트',
  disabled: false,
  style: {
    padding: '3px 6px',
  },
};
