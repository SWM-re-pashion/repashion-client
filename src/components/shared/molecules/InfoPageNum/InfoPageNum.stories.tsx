import { ComponentStory, ComponentMeta } from '@storybook/react';

import InfoPageNum from '.';

export default {
  title: 'shared/Molecules/InfoPageNum',
  component: InfoPageNum,
  argTypes: {
    style: { control: 'object' },
    className: { control: 'text' },
    children: { control: 'object' },
  },
} as ComponentMeta<typeof InfoPageNum>;

const Template: ComponentStory<typeof InfoPageNum> = function Template(args) {
  return <InfoPageNum {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  children: '1/3',
};
