import { useCallback, useEffect } from 'react';

import { UploadUpdateProps } from '#types/upload';
import ErrorMsg from '@atoms/ErrorMsg';
import InfoArticle from '@molecules/InfoArticle';
import TextInput from '@molecules/TextInput';
import useDebounceInput from 'src/hooks/useDebounceInput';
import { useUploadUpdateStore } from 'src/hooks/useUploadUpdateStore';

import $ from './style.module.scss';
import { contactValidate } from './validate';

type Props = UploadUpdateProps;

function Contact({ isUpdate }: Props) {
  const useStore = useUploadUpdateStore(isUpdate);
  const state = useStore((states) => states.contact);
  const onChange = useStore((states) => states.updateUpload);
  const updateValidate = useStore((states) => states.updateValidate);
  const isContactValid = contactValidate(state);
  const handleInput = useDebounceInput(onChange, 200);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleInput(e.target.value, 'contact'),
    [handleInput],
  );

  useEffect(() => {
    updateValidate('contact', isContactValid);
  }, [isContactValid, updateValidate]);

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

export default Contact;
