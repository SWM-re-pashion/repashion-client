import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfileImg from '.';

export default {
  title: 'shared/Atoms/ProfileImg',
  component: ProfileImg,
  argTypes: {
    style: { control: 'object' },
    width: { control: 'number' },
    height: { control: 'number' },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
} as ComponentMeta<typeof ProfileImg>;

const Template: ComponentStory<typeof ProfileImg> = function Template(args) {
  return <ProfileImg {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  width: 50,
  height: 50,
  src: 'https://user-images.githubusercontent.com/62797441/180398288-76213583-0128-429e-bb1c-672a281e56dd.png',
  alt: '이미지',
};
