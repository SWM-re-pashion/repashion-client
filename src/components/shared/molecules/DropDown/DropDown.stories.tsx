import Span from '@atoms/Span';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DropDown from '.';

export default {
  title: 'shared/Molecules/DropDown',
  component: DropDown,
  argTypes: {
    style: { control: 'object' },
    className: { control: 'text' },
    name: { control: 'text' },
    options: { control: 'object' },
    children: { control: 'object' },
    fontSize: { control: 'number' },
    fontWeight: { control: 'text' },
  },
} as ComponentMeta<typeof DropDown>;

const Template: ComponentStory<typeof DropDown> = function Template(args) {
  return <DropDown {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  children: <Span>클릭</Span>,
  name: 'dropdown',
  options: [
    { name: '마이페이지' },
    {
      name: '계정 정보 수정',
    },
    {
      name: '로그아웃',
    },
  ],
};
