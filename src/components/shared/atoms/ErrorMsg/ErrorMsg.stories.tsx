import { ComponentStory, ComponentMeta } from '@storybook/react';

import ErrorMsg from '.';

export default {
  title: 'shared/Atoms/ErrorMsg',
  component: ErrorMsg,
  argTypes: {
    isValid: { control: 'boolean' },
    msg: { control: 'text' },
  },
} as ComponentMeta<typeof ErrorMsg>;

const Template: ComponentStory<typeof ErrorMsg> = function Template(args) {
  return <ErrorMsg {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isValid: false,
  msg: '에러 메시지',
};
