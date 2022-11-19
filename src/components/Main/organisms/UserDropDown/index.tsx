import { useRouter } from 'next/router';

import { SelectArrow } from '@atoms/icon';
import ProfileImg from '@atoms/ProfileImg';
import Span from '@atoms/Span';
import { IMAGE_BLUR_DATA_URL } from '@constants/img';
import DropDown from '@molecules/DropDown';
import { logoutUtil } from 'src/api/login';
import { useMyInfo } from 'src/hooks/api/profile';

import $ from './style.module.scss';

const initialProfile = {
  name: '',
  profileImage: IMAGE_BLUR_DATA_URL,
  totalCount: '',
};

function UserDropDown() {
  const router = useRouter();
  const { data } = useMyInfo();
  const { profileImage, name } = data?.data || initialProfile;
  const profileImgView = (
    <ProfileImg src={profileImage} alt={name} width={28} height={28} />
  );
  const profileView = (
    <div className={$.profile}>
      {profileImgView}
      <Span fontSize={14} className={$.name}>
        {name}
      </Span>
    </div>
  );

  const options = [
    profileView,
    { name: '마이페이지', onClick: () => router.push('/mypage') },
    {
      name: '계정 정보 수정',
      onClick: () => router.push('/mypage/setting/user'),
    },
    { name: '로그아웃', onClick: () => logoutUtil() },
  ];

  return (
    <DropDown options={options} name="my-menu" top="40px" right="0">
      <div className={$['profile-container']}>
        {profileImgView}
        <SelectArrow className={$.arrow} stroke="#fff" />
      </div>
    </DropDown>
  );
}

export default UserDropDown;
