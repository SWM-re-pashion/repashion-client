import BackBtn from '@atoms/BackBtn';
import { Setting } from '@atoms/icon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PageHeader from '.';

export default {
  title: 'shared/Molecules/PageHeader',
  component: PageHeader,
  argTypes: {
    title: { control: 'text' },
    left: { control: 'object' },
    right: { control: 'object' },
  },
} as ComponentMeta<typeof PageHeader>;

const Template: ComponentStory<typeof PageHeader> = function Template(args) {
  return <PageHeader {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: '홈',
  left: <BackBtn color="#000" />,
  right: <Setting />,
};
