import { ComponentStory, ComponentMeta } from '@storybook/react';

import Span from '.';

export default {
  title: 'shared/Atoms/Span',
  component: Span,
  argTypes: {
    style: { control: 'object' },
    className: { control: 'text' },
    color: { control: 'color' },
    fontSize: { control: 'number' },
    fontWeight: { control: 'number' },
    isStrongFontFamily: { control: 'boolean' },
    children: { control: 'text' },
  },
} as ComponentMeta<typeof Span>;

const Template: ComponentStory<typeof Span> = function Template(args) {
  return <Span {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  color: '#936dff',
  fontSize: 16,
  fontWeight: 600,
  isStrongFontFamily: false,
  children: '텍스트',
};
