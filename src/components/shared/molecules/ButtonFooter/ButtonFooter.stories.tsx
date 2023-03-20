import { ComponentStory, ComponentMeta } from '@storybook/react';

import ButtonFooter from '.';

export default {
  title: 'shared/Molecules/ButtonFooter',
  component: ButtonFooter,
  argTypes: {
    btnColor: {
      control: {
        type: 'text',
      },
    },
    background: {
      control: {
        type: 'text',
      },
    },
    LeftBtn: {
      control: {
        type: 'object',
      },
    },
    msg: {
      control: {
        type: 'text',
      },
    },
    children: {
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
} as ComponentMeta<typeof ButtonFooter>;

const Template: ComponentStory<typeof ButtonFooter> = function Template(args) {
  return <ButtonFooter {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  btnColor: '#9d6dff',
  background: '#fff',
  msg: '오류 메시지',
  children: '다음',
  disabled: false,
};
