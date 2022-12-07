import { Views } from '@atoms/icon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import IconText from '.';

export default {
  title: 'shared/Atoms/IconText',
  component: IconText,
  argTypes: {
    color: { control: 'text' },
    colorText: { control: 'text' },
  },
} as ComponentMeta<typeof IconText>;

const Template: ComponentStory<typeof IconText> = function Template(args) {
  return <IconText {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  Icon: Views,
  color: '#936DFF',
  colorText: '10명',
  children: '이 보았어요',
};
