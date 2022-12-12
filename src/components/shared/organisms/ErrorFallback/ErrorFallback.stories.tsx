import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AuthError } from 'src/api/core/error';

import ErrorFallback from '.';

export default {
  title: 'shared/Organisms/ErrorFallback',
  component: ErrorFallback,
  argTypes: {
    error: { control: 'object' },
    reset: { control: 'function' },
    otherRenderComponent: { control: 'object' },
    includedStatusCodes: { control: 'array' },
    className: {
      control: {
        type: 'text',
      },
    },
    style: { control: 'object' },
  },
} as ComponentMeta<typeof ErrorFallback>;

const Template: ComponentStory<typeof ErrorFallback> = function Template(args) {
  return <ErrorFallback {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  error: new AuthError(403, '에러 발생'),
  otherRenderComponent: <div>다른 렌더링 컴포넌트</div>,
  includedStatusCodes: [],
};
