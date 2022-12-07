import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputFile from '.';

export default {
  title: 'shared/Atoms/InputFile',
  component: InputFile,
  argTypes: {
    id: { control: 'text' },
    accept: { control: 'text' },
    isMultiple: { control: 'boolean' },
    none: { control: 'boolean' },
  },
} as ComponentMeta<typeof InputFile>;

const Template: ComponentStory<typeof InputFile> = function Template(args) {
  return <InputFile {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'input-file',
  accept: 'image/*',
  isMultiple: true,
};
