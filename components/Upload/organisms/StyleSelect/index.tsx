import { memo, useCallback } from 'react';

import { DefaultData } from '#types/index';
import { btnTemplateBox } from '#types/info';
import {
  StyleUpload,
  UpdateUpload,
  UploadState,
} from '#types/storeType/upload';
import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import InfoBtnBox from '@organisms/InfoBtnBox';
import useDebounceInput from 'hooks/useDebounceInput';

import $ from './style.module.scss';

type btnBox = btnTemplateBox<keyof UploadState, keyof StyleUpload> & {
  datas: (string | DefaultData)[];
  subType: keyof StyleUpload;
};

type Props = {
  data: btnBox[];
  state: UploadState['style'];
  onChange: UpdateUpload;
};

function StyleSelect(styleProps: Props) {
  const { data, state, onChange } = styleProps;
  const handleInput = useDebounceInput(onChange, 200);

  const handleChange = useCallback(
    // Todo: 성능 최적화
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.value, 'style', 'material'),
    [onChange],
  );

  return (
    <InfoArticle label="스타일 정보" required>
      {data.map((options) => {
        return (
          <InfoBtnBox
            {...options}
            datas={options.datas}
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
    </InfoArticle>
  );
}

export default memo(StyleSelect);
