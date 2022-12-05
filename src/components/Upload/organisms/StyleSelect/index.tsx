import { memo, useCallback } from 'react';

import { DefaultData } from '#types/index';
import { btnTemplateBox } from '#types/info';
import {
  StyleUpload,
  UpdateUpload,
  UploadState,
} from '#types/storeType/upload';
import ErrorMsg from '@atoms/ErrorMsg';
import InfoArticle from '@molecules/InfoArticle';
import TextInput from '@molecules/TextInput';
import InfoBtnBox from '@organisms/InfoBtnBox';
import useDebounceInput from 'src/hooks/useDebounceInput';

import $ from './style.module.scss';

type btnBox = btnTemplateBox<keyof UploadState, keyof StyleUpload> & {
  datas: (string | DefaultData)[];
  subType: keyof StyleUpload;
};

type Props = {
  data: btnBox[];
  state: UploadState['style'];
  onChange: UpdateUpload;
  isStyleValid: boolean;
};

function StyleSelect(styleProps: Props) {
  const { data, state, onChange, isStyleValid } = styleProps;
  const handleInput = useDebounceInput(onChange, 200);

  const handleChange = useCallback(
    // Todo: 성능 최적화
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.value, 'style', 'material'),
    [onChange],
  );

  return (
    <InfoArticle
      label="스타일 정보"
      required
      description="이미지를 올리면 스타일 정보를 자동으로 채워줘요."
    >
      {data.map((options) => {
        return (
          <InfoBtnBox
            {...options}
            key={options.label}
            compareData={state[options.subType]}
            handleFunc={onChange}
          />
        );
      })}
      <InfoArticle label="소재" childrenBox>
        <TextInput
          className={$.material}
          controlled // 성능 최적화
          value={state.material}
          placeholder="코튼 등"
          onChange={handleChange}
        />
      </InfoArticle>
      <ErrorMsg
        isValid={isStyleValid}
        msg="스타일 태그, 컬러, 소재를 선택해주세요."
      />
    </InfoArticle>
  );
}

export default memo(StyleSelect);
