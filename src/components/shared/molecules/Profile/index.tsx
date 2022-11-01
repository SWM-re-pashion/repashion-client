import { useRouter } from 'next/router';

import { StyleProps } from '#types/props';
import ProfileImg from '@atoms/ProfileImg';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  profile: {
    userId?: number;
    profileImg: string;
    nickname: string;
  };
  needDetail?: boolean;
} & StyleProps;

export default function Profile(profileProps: Props) {
  const { needDetail, profile, className, style } = profileProps;
  const router = useRouter();
  const { userId, profileImg, nickname } = profile;

  const handleProfileClick = () => {
    if (needDetail && userId) router.push(`/profile/${userId}`);
  };

  return (
    <div {...{ style }} className={classnames($.profile, className)}>
      <button
        type="button"
        className={$['profile-box']}
        onClick={handleProfileClick}
      >
        <ProfileImg src={profileImg} alt={nickname} />
        <span className={$.nickname}>{nickname}</span>
      </button>
    </div>
  );
}
