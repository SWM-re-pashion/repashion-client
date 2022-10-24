import { StyleProps } from '#types/props';
import ProfileImg from '@atoms/ProfileImg';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  profile: {
    profileImg: string;
    nickname: string;
  };
} & StyleProps;

export default function Profile({ profile, className, style }: Props) {
  const { profileImg, nickname } = profile;

  return (
    <div {...{ style }} className={classnames($.profile, className)}>
      <button type="button" className={$['profile-box']}>
        <ProfileImg src={profileImg} alt={nickname} />
        <span className={$.nickname}>{nickname}</span>
      </button>
    </div>
  );
}
