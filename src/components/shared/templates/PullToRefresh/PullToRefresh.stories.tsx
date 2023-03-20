import Loading from '@atoms/Loading';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PullToRefresh from '.';

export default {
  title: 'shared/Templates/PullToRefresh',
  component: PullToRefresh,
  argTypes: {
    isPullable: { control: 'boolean' },
    canFetchMore: { control: 'boolean' },
    refreshingContent: { control: 'object' },
    children: { control: 'object' },
    pullDownThreshold: { control: 'number' },
    maxPullDownDistance: { control: 'number' },
    onRefresh: { action: 'onRefresh' },
  },
} as ComponentMeta<typeof PullToRefresh>;

const Template: ComponentStory<typeof PullToRefresh> = function Template(args) {
  return <PullToRefresh {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  refreshingContent: <Loading />,
  pullDownThreshold: 100,
  maxPullDownDistance: 200,
  children: (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b3ff85',
        height: '200px',
      }}
    >
      모바일에서 아래로 당겨보세요.
    </div>
  ),
  // eslint-disable-next-line no-promise-executor-return
  onRefresh: () => new Promise((r) => setTimeout(r, 1000)),
};
