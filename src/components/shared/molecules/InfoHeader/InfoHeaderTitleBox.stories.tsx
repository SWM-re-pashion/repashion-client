import { ComponentStory, ComponentMeta } from '@storybook/react';

import TitleBox from './TitleBox';

export default {
  title: 'shared/Molecules/InfoHeaderTitleBox',
  component: TitleBox,
  argTypes: {
    style: { control: 'object' },
    className: { control: 'text' },
    title: { control: 'text' },
    marginLeft: { control: 'text' },
    isHeader: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} as ComponentMeta<typeof TitleBox>;

const Template: ComponentStory<typeof TitleBox> = function Template(args) {
  return <TitleBox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: '타이틀',
  marginLeft: '5px',
  isHeader: false,
  required: true,
};
