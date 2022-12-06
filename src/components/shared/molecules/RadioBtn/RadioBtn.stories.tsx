import { ComponentStory, ComponentMeta } from '@storybook/react';

import RadioBtn from '.';

export default {
  title: 'shared/Molecules/RadioBtn',
  component: RadioBtn,
  argTypes: {
    isClicked: { control: 'boolean' },
  },
} as ComponentMeta<typeof RadioBtn>;

const Template: ComponentStory<typeof RadioBtn> = function Template(args) {
  return <RadioBtn {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isClicked: true,
};
