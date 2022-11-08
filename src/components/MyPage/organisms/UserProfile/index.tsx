import { memo } from 'react';

import { StyleProps } from '#types/props';
import Span from '@atoms/Span';
import Profile from '@molecules/Profile';
import { useMyInfo } from 'src/hooks/api/profile';

import $ from './style.module.scss';

type Props = {
  totalCount: number;
} & StyleProps;

const initialProfile = {
  name: '',
  profileImage: '',
  totalCount: '',
};

function UserProfile(headerProps: Props) {
  const { totalCount } = headerProps;
  const { data } = useMyInfo();
  const profile = data?.data || initialProfile;

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
        <Span fontSize={20}>{totalCount}회</Span>
      </div>
    </div>
  );
}

export default memo(UserProfile);
