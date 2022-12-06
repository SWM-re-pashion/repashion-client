import { ComponentStory, ComponentMeta } from '@storybook/react';

import InfoHeader from '.';

export default {
  title: 'shared/Molecules/InfoHeader',
  component: InfoHeader,
  argTypes: {
    style: { control: 'object' },
    className: { control: 'text' },
    children: { control: 'object' },
    isStrongFontFamily: { control: 'boolean' },
  },
} as ComponentMeta<typeof InfoHeader>;

const Template: ComponentStory<typeof InfoHeader> = function Template(args) {
  return <InfoHeader {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isStrongFontFamily: false,
  children: (
    <>
      <InfoHeader.TitleBox title="basic" marginLeft="5px" isHeader required />
      <InfoHeader.Description
        hasPreWrap
        description={
          '성별, 키, 체형 및 사이즈를 알려주세요.\n사이즈는 복수 선택도 가능해요.'
        }
      />
    </>
  ),
};
