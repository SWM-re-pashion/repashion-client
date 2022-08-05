import { useCallback } from 'react';

import { DefaultData } from '#types/index';
import { btnTemplateBox } from '#types/info';
import { StyleUpload, UploadState } from '#types/storeType/upload';
import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import InfoBtnBox from '@organisms/InfoBtnBox';
import useDebounceInput from 'hooks/useDebounceInput';
import { useUploadStore } from 'store/useUploadStore';

import $ from './style.module.scss';

type btnBox = btnTemplateBox<keyof UploadState, keyof StyleUpload> & {
  datas: (string | DefaultData)[];
  subType: keyof StyleUpload;
};

type Props = {
  data: btnBox[];
};

function StyleSelect(styleProps: Props) {
  const { data } = styleProps;
  const states = useUploadStore((state) => state.style);
  const updateUpload = useUploadStore((state) => state.updateUpload);
  const handleInput = useDebounceInput<
    [keyof UploadState, string, keyof StyleUpload]
  >(updateUpload, 200);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleInput('style', e.target.value, 'material'),
    [handleInput],
  );

  return (
    <InfoArticle label="스타일 정보" required>
      {data.map((options) => {
        return (
          <InfoBtnBox
            {...options}
            datas={options.datas}
            key={options.label}
            compareData={states[options.subType]}
            handleFunc={updateUpload}
          />
        );
      })}
      <InfoArticle label="소재" childrenBox>
        <TextInput
          className={$.material}
          controlled={false}
          placeholder="코튼 등"
          handleChange={handleChange}
        />
      </InfoArticle>
    </InfoArticle>
  );
}

export default StyleSelect;
