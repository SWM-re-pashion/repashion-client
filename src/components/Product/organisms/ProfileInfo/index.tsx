import Button from '@atoms/Button';
import { Share } from '@atoms/icon';
import Profile from '@molecules/Profile';

import $ from './style.module.scss';
import { getCurrentUrl, sharePage } from './utils';

type Props = {
  title: string;
  userId: number;
  profileImage: string;
  name: string;
};

function ProfileInfo(profileProps: Props) {
  const { title, userId, profileImage, name } = profileProps;
  const currentUrl = getCurrentUrl();
  const handleShare = sharePage({
    title: `re:Fashion | ${title} | 상품 상세 정보`,
    url: currentUrl,
  });

  return (
    <div className={$.profile}>
      <Profile profile={{ userId, profileImage, name }} needDetail />
      <Button iconBtn className={$.share} onClick={handleShare}>
        <Share fill="#e3e1e1" />
      </Button>
    </div>
  );
}

export default ProfileInfo;
