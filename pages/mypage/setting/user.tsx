import React, { ReactElement, useCallback, useRef, useState } from 'react';

import BackBtn from '@atoms/BackBtn';
import ButtonFooter from '@atoms/ButtonFooter';
import Span from '@atoms/Span';
import TextInput from '@atoms/TextInput';
import { seoData } from '@constants/seo';
import InfoArticle from '@molecules/InfoArticle';
import Layout from '@templates/Layout';
import PageTemplate from '@templates/PageTemplate';
import ProfileImgUpload from 'components/MyPage/organisms/ProfileImgUpload';
import { useDebounceInput } from 'hooks';

function UserPage() {
  // TODO: 닉네임 중복체크
  const inputRef = useRef<HTMLInputElement>(null);
  const [nickname, setNickName] = useState('');
  const email = 'appleapple123@gmail.com';
  const [img, setImg] = useState(
    'https://user-images.githubusercontent.com/62797441/180398288-76213583-0128-429e-bb1c-672a281e56dd.png',
  );
  const debounceInput = useDebounceInput(setNickName, 300);

  const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceInput(e.target.value);
  };

  const onUploadClick = useCallback(() => {
    if (inputRef.current) inputRef.current.click();
  }, []);

  const handleUpload = (e: React.ChangeEvent) => {
    const formData = new FormData();
    if (e.type === 'change' && 'files' in e.target) {
      const {
        target: { files },
      } = e;
      if (files) {
        const filesArr: File[] = Array.from(files);
        if (filesArr.length > 1) {
          filesArr.splice(1);
        } // TODO: 이미지 1개 제한, 팝업 메시지
        formData.append('files', filesArr[0]);
      }
    }
  };

  return (
    <PageTemplate
      metaTitle="re:Fashion | 마이 페이지 | 설정 | 계정 설정"
      metaUrl={`${seoData.url}/mypage/setting/acount`}
      title="계정 설정"
      left={<BackBtn color="#000" />}
      isNeedFooter={false}
      paddingTop="88px"
      sidePadding="24px"
    >
      <ProfileImgUpload
        {...{
          img,
          inputRef,
          onUploadClick,
          handleUpload,
        }}
      />

      <InfoArticle label="닉네임" style={{ marginTop: '47px' }}>
        <TextInput
          controlled={false}
          placeholder="닉네임을 입력해주세요."
          onChange={handleNickName}
          value={nickname}
        />
      </InfoArticle>

      <InfoArticle label="이메일">
        <Span fontWeight={400}>{email}</Span>
      </InfoArticle>

      <ButtonFooter>완료</ButtonFooter>
    </PageTemplate>
  );
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default UserPage;
