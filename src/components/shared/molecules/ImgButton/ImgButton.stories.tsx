import { ComponentStory, ComponentMeta } from '@storybook/react';

import ImgButton from '.';

export default {
  title: 'shared/Molecules/ImgButton',
  component: ImgButton,
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
} as ComponentMeta<typeof ImgButton>;

const Template: ComponentStory<typeof ImgButton> = function Template(args) {
  return <ImgButton {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  width: 100,
  height: 100,
  src: 'https://user-images.githubusercontent.com/62797441/180398288-76213583-0128-429e-bb1c-672a281e56dd.png',
  alt: '이미지',
};
