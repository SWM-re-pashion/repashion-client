import { Home } from '@atoms/icon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NavigationLink from '.';

export default {
  title: 'shared/Molecules/NavigationLink',
  component: NavigationLink,
  argTypes: {
    label: { control: 'text' },
    route: { control: 'object' },
    isActive: { control: 'boolean' },
    isUpload: { control: 'boolean' },
  },
} as ComponentMeta<typeof NavigationLink>;

const Template: ComponentStory<typeof NavigationLink> = function Template(
  args,
) {
  return <NavigationLink {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  label: '홈',
  route: {
    id: 1,
    icon: Home,
    label: '홈',
    href: '/',
  },
  isActive: true,
  isUpload: false,
};
