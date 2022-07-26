import ProfileImg from '@atoms/ProfileImg';

import $ from './style.module.scss';

type Props = {
  profile: {
    profileImg: string;
    nickname: string;
  };
};

export default function Profile({ profile }: Props) {
  const { profileImg, nickname } = profile;

  return (
    <div className={$.profile}>
      <button type="button" className={$['profile-box']}>
        <ProfileImg src={profileImg} alt={nickname} />
        <span className={$.nickname}>{nickname}</span>
      </button>
    </div>
  );
}
