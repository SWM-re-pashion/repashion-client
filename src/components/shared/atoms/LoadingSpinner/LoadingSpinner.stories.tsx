import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoadingSpinner from '.';

export default {
  title: 'shared/Atoms/LoadingSpinner',
  component: LoadingSpinner,
  argTypes: {
    width: { control: 'number' },
    borderWidth: { control: 'number' },
    color: { control: 'color' },
  },
} as ComponentMeta<typeof LoadingSpinner>;

const Template: ComponentStory<typeof LoadingSpinner> = function Template(
  args,
) {
  return <LoadingSpinner {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  width: 50,
  borderWidth: 5,
  color: '#936dff',
};
