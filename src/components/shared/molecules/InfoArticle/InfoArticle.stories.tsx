import Span from '@atoms/Span';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InfoArticle from '.';

export default {
  title: 'shared/Molecules/InfoArticle',
  component: InfoArticle,
  argTypes: {
    style: { control: 'object' },
    className: { control: 'text' },
    children: { control: 'object' },
    name: { control: 'text' },
    label: { control: 'text' },
    childrenBox: { control: 'boolean' },
    required: { control: 'boolean' },
    description: { control: 'text' },
  },
} as ComponentMeta<typeof InfoArticle>;

const Template: ComponentStory<typeof InfoArticle> = function Template(args) {
  return <InfoArticle {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  label: '이름',
  childrenBox: false,
  required: true,
  description: '이름을 입력해주세요.',
  children: <Span fontWeight={500}>bruney</Span>,
};
