import { ComponentStory, ComponentMeta } from '@storybook/react';

import Loading from '.';

export default {
  title: 'shared/Atoms/Loading',
  component: Loading,
  argTypes: {},
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = function Template(args) {
  return <Loading {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
