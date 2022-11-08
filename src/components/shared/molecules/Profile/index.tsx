import { useRouter } from 'next/router';

import { StyleProps } from '#types/props';
import ProfileImg from '@atoms/ProfileImg';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  profile: {
    userId?: number;
    profileImage: string;
    name: string;
  };
  needDetail?: boolean;
} & StyleProps;

export default function Profile(profileProps: Props) {
  const { needDetail, profile, className, style } = profileProps;
  const router = useRouter();
  const { userId, profileImage, name } = profile;

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
        <ProfileImg src={profileImage} alt={name} width={44} height={44} />
        <span className={$.nickname}>{name}</span>
      </button>
    </div>
  );
}
