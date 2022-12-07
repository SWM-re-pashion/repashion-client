import { ComponentStory, ComponentMeta } from '@storybook/react';

import ImgBox from '.';

export default {
  title: 'shared/Molecules/ImgBox',
  component: ImgBox,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    isNeedClick: { control: 'boolean' },
    isSelected: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
} as ComponentMeta<typeof ImgBox>;

const Template: ComponentStory<typeof ImgBox> = function Template(args) {
  return <ImgBox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  src: 'https://user-images.githubusercontent.com/62797441/180398288-76213583-0128-429e-bb1c-672a281e56dd.png',
  alt: '이미지',
  isNeedClick: true,
  isSelected: true,
  isLoading: false,
};
