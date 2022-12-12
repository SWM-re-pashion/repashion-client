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
    sizes: { control: 'text' },
  },
} as ComponentMeta<typeof ResponsiveImg>;

const Template: ComponentStory<typeof ResponsiveImg> = function Template(args) {
  return <ResponsiveImg {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  width: 150,
  height: 150,
  sizes: '150px',
  src: 'https://user-images.githubusercontent.com/62797441/180398288-76213583-0128-429e-bb1c-672a281e56dd.png',
  alt: '이미지',
  style: {
    width: '150px',
    height: '150px',
  },
};
