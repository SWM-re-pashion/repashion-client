import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextArea from '.';

export default {
  title: 'shared/Atoms/TextArea',
  component: TextArea,
  argTypes: {
    style: { control: 'object' },
    className: { control: 'text' },
    color: { control: 'color' },
    fontSize: { control: 'number' },
    fontWeight: { control: 'number' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = function Template(args) {
  return <TextArea {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  color: '#000',
  fontSize: 16,
  fontWeight: 600,
  placeholder: '텍스트 입력',
  value: '텍스트',
};
