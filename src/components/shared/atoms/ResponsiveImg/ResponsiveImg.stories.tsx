import { ComponentStory, ComponentMeta } from '@storybook/react';

import ResponsiveImg from '.';

export default {
  title: 'shared/Atoms/ResponsiveImg',
  component: ResponsiveImg,
  argTypes: {
    style: { control: 'object' },
    className: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
} as ComponentMeta<typeof ResponsiveImg>;

const Template: ComponentStory<typeof ResponsiveImg> = function Template(args) {
  return <ResponsiveImg {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  width: 50,
  height: 50,
  src: 'https://user-images.githubusercontent.com/62797441/180398288-76213583-0128-429e-bb1c-672a281e56dd.png',
  alt: '이미지',
};
