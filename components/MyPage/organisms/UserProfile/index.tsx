import { memo } from 'react';

import Span from '@atoms/Span';
import Profile from '@molecules/Profile';
import { StyleProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  profile: {
    profileImg: string;
    nickname: string;
  };
  totalDealNum: number;
} & StyleProps;

function UserProfile(headerProps: Props) {
  const { profile, totalDealNum } = headerProps;
  return (
    <div className={$['profile-container']}>
      <div className={$['profile-info']}>
        <Span>프로필 정보</Span>
        <Profile {...{ profile }} className={$.profile} />
      </div>
      <div className={$['total-deal']}>
        <Span fontSize={14} fontWeight={400}>
          총 거래수
        </Span>
        <Span fontSize={20}>{totalDealNum}회</Span>
      </div>
    </div>
  );
}

export default memo(UserProfile);
