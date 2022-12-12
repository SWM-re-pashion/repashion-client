import { ComponentStory, ComponentMeta } from '@storybook/react';

import ImgSlide from '.';

export default {
  title: 'shared/Organisms/ImgSlide',
  component: ImgSlide,
  argTypes: {
    imgList: { control: 'array' },
    isSoldOut: { control: 'boolean' },
  },
} as ComponentMeta<typeof ImgSlide>;

const Template: ComponentStory<typeof ImgSlide> = function Template(args) {
  return <ImgSlide {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  imgList: [
    'https://user-images.githubusercontent.com/62797441/180398288-76213583-0128-429e-bb1c-672a281e56dd.png',
    'https://user-images.githubusercontent.com/62797441/180398288-76213583-0128-429e-bb1c-672a281e56dd.png',
    'https://user-images.githubusercontent.com/62797441/180398288-76213583-0128-429e-bb1c-672a281e56dd.png',
  ],
  isSoldOut: true,
};
