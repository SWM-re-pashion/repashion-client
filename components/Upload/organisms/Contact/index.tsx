import { memo, useCallback } from 'react';

import { UpdateUpload, UploadState } from '#types/storeType/upload';
import ErrorMsg from '@atoms/ErrorMsg';
import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import useDebounceInput from 'hooks/useDebounceInput';

import $ from './style.module.scss';

type Props = {
  state: UploadState['contact'];
  onChange: UpdateUpload;
  isContactValid: boolean;
};

function Contact(contactProps: Props) {
  const { state, onChange, isContactValid } = contactProps;

  const handleInput = useDebounceInput(onChange, 200);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleInput(e.target.value, 'contact'),
    [handleInput],
  );

  return (
    <InfoArticle
      label="연락 방법"
      description="연락 방법을 적어주세요. 채팅 기능 구현중이에요..!"
      required
      className={$['basic-info']}
    >
      <TextInput
        className={$.title}
        controlled={false}
        value={state}
        placeholder="오픈채팅방 주소, 전화번호, 카톡 아이디 등"
        onChange={handleChange}
      />

      <ErrorMsg
        isValid={isContactValid}
        msg="오픈채팅방 주소, 전화번호, 카톡 아이디 등 연락 방법을 적어주세요."
      />
    </InfoArticle>
  );
}

export default memo(Contact);
