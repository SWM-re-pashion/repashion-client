import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputLabel from '.';

export default {
  title: 'shared/Atoms/InputLabel',
  component: InputLabel,
  argTypes: {
    htmlFor: { control: 'text' },
    text: { control: 'text' },
  },
} as ComponentMeta<typeof InputLabel>;

const Template: ComponentStory<typeof InputLabel> = function Template(args) {
  return <InputLabel {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  htmlFor: 'input-file',
  text: '이미지',
};
