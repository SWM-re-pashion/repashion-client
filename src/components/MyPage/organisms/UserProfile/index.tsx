import { memo } from 'react';

import Span from '@atoms/Span';
import { IMAGE_BLUR_DATA_URL } from '@constants/img';
import Profile from '@molecules/Profile';
import { useMyInfo, useUserInfo } from 'src/hooks/api/profile';

import $ from './style.module.scss';

type Props = {
  userId?: string;
};

const initialProfile = {
  name: '',
  profileImage: IMAGE_BLUR_DATA_URL,
  totalCount: '',
};

export function useGetUserInfo(userId?: string) {
  return userId ? useUserInfo : useMyInfo;
}

function UserProfile({ userId }: Props) {
  const useInfo = useGetUserInfo(userId);
  const { data } = useInfo(userId || '');
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
        <Span fontSize={20}>{profile.totalCount}회</Span>
      </div>
    </div>
  );
}

export default memo(UserProfile);
