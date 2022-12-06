import { ComponentStory, ComponentMeta } from '@storybook/react';

import Profile from '.';

export default {
  title: 'shared/Molecules/Profile',
  component: Profile,
  argTypes: {
    profile: { control: 'object' },
    needDetail: { control: 'boolean' },
    style: { control: 'object' },
    className: { control: 'text' },
  },
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = function Template(args) {
  return <Profile {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  profile: {
    userId: 1,
    profileImage:
      'https://user-images.githubusercontent.com/62797441/180398288-76213583-0128-429e-bb1c-672a281e56dd.png',
    name: '김동용',
  },
  needDetail: false,
};
