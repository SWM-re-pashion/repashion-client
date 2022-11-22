import Button from '@atoms/Button';
import { Share } from '@atoms/icon';
import Profile from '@molecules/Profile';

import $ from './style.module.scss';

type Props = {
  userId: number;
  profileImage: string;
  name: string;
};

function ProfileInfo(profileProps: Props) {
  const { userId, profileImage, name } = profileProps;

  return (
    <div className={$.profile}>
      <Profile profile={{ userId, profileImage, name }} needDetail />
      <Button iconBtn className={$.share}>
        <Share fill="#e3e1e1" />
      </Button>
    </div>
  );
}

export default ProfileInfo;
