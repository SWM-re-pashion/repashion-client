import { DefaultData } from '#types/index';
import { btnTemplateBox } from '#types/info';
import { StyleUpload, UploadState } from '#types/storeType/upload';
import { UploadUpdateProps } from '#types/upload';
import ErrorMsg from '@atoms/ErrorMsg';
import InfoArticle from '@molecules/InfoArticle';
import TextInput from '@molecules/TextInput';
import InfoBtnBox from '@organisms/InfoBtnBox';
import useUploadFormValidate from 'src/hooks/useUploadFormValidate';
import { useUploadUpdateStore } from 'src/hooks/useUploadUpdateStore';

import $ from './style.module.scss';
import { styleValidate } from './validate';

type btnBox = btnTemplateBox<keyof UploadState, keyof StyleUpload> & {
  datas: (string | DefaultData)[];
  subType: keyof StyleUpload;
};

type Props = {
  data: btnBox[];
} & UploadUpdateProps;

function StyleSelect(styleProps: Props) {
  const { isUpdate, data } = styleProps;
  const useStore = useUploadUpdateStore(isUpdate);
  const state = useStore((states) => states.style);
  const isStyleValid = styleValidate(state);
  const onChange = useStore((states) => states.updateUpload);
  useUploadFormValidate({ isUpdate, isValid: isStyleValid, type: 'style' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value, 'style', 'material');

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
          controlled
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

export default StyleSelect;
