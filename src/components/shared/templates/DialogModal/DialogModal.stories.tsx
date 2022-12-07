import { ClipBoard } from '@atoms/icon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DialogModal from '.';

export default {
  title: 'shared/Templates/DialogModal',
  component: DialogModal,
  argTypes: {
    id: { control: 'text' },
    isOpen: { control: 'boolean' },
    isVerticalBtn: { control: 'boolean' },
    title: { control: 'text' },
    content: { control: 'text' },
    emphasisContent: { control: 'text' },
    emphasisIcon: { control: 'object' },
    clickText: { control: 'text' },
    cancelText: { control: 'text' },
  },
} as ComponentMeta<typeof DialogModal>;

const Template: ComponentStory<typeof DialogModal> = function Template(args) {
  return <DialogModal {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'dialog-modal',
  isOpen: true,
  isVerticalBtn: false,
  title: '타이틀',
  content: '내용',
  emphasisContent: '강조 내용',
  emphasisIcon: <ClipBoard stroke="#e3e1e1" />,
  clickText: '확인',
  cancelText: '취소',
};
