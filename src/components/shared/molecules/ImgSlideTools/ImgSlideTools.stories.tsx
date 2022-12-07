import { ComponentStory, ComponentMeta } from '@storybook/react';

import ImgSlideTools from '.';

export default {
  title: 'shared/Molecules/ImgSlideTools',
  component: ImgSlideTools,
  argTypes: {
    options: { control: 'object' },
  },
} as ComponentMeta<typeof ImgSlideTools>;

const Template: ComponentStory<typeof ImgSlideTools> = function Template(args) {
  return <ImgSlideTools {...args} />;
};

export const Default = Template.bind({});
Default.args = {
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
