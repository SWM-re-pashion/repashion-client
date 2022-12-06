import { ComponentStory, ComponentMeta } from '@storybook/react';

import InfoBtnBox from '.';

export default {
  title: 'shared/Organisms/InfoBtnBox',
  component: InfoBtnBox,
  argTypes: {
    style: { control: 'object' },
    className: { control: 'text' },
    isColor: { control: 'boolean' },
    noCheckColor: { control: 'boolean' },
    childrenBox: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
    datas: { control: 'array' },
    compareData: { control: 'text' },
    required: { control: 'boolean' },
  },
} as ComponentMeta<typeof InfoBtnBox>;

const Template: ComponentStory<typeof InfoBtnBox> = function Template(args) {
  return <InfoBtnBox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isColor: false,
  noCheckColor: false,
  childrenBox: false,
  label: '라벨',
  datas: ['데이터1', '데이터2', '데이터3'],
  compareData: '데이터2',
  required: true,
};
