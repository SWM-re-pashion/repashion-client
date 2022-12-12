import { Kakao } from '@atoms/icon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SocialLoginBtn from '.';

export default {
  title: 'shared/Molecules/SocialLoginBtn',
  component: SocialLoginBtn,
  argTypes: {
    Logo: { control: 'object' },
    text: { control: 'text' },
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    borderRadius: { control: 'text' },
    hasBtnPadding: { control: 'boolean' },
    fontWeight: { control: 'number' },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
} as ComponentMeta<typeof SocialLoginBtn>;

const Template: ComponentStory<typeof SocialLoginBtn> = function Template(
  args,
) {
  return <SocialLoginBtn {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  Logo: <Kakao />,
  text: 'Kakao로 로그인',
  backgroundColor: '#fee500',
  borderRadius: '12px',
  hasBtnPadding: true,
};
