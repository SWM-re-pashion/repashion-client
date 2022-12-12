import { ComponentStory, ComponentMeta } from '@storybook/react';

import Footer from '.';

export default {
  title: 'shared/Organisms/Footer',
  component: Footer,
  argTypes: {},
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = function Template() {
  return <Footer />;
};

export const Default = Template.bind({});
Default.args = {};
