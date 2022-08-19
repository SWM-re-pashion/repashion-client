import { memo, useCallback } from 'react';

import { UpdateUpload, UploadState } from '#types/storeType/upload';
import TextArea from '@atoms/TextArea';
import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import useDebounceInput from 'hooks/useDebounceInput';

import $ from './style.module.scss';

type Props = {
  data: {
    placeholder: string;
    label: string;
    type: string;
    subType: string;
  }[];
  opinionPlaceholder: string;
  state: [UploadState['additionalInfo'], UploadState['opinion']];
  onChange: UpdateUpload;
};

function AdditionalInfo(additionProps: Props) {
  const { data: datas, opinionPlaceholder, state, onChange } = additionProps;
  const [additionalInfo, opinion] = state;
  const handleInput = useDebounceInput(onChange, 200);

  const handleChange = useCallback(
    // Todo: 리팩토링
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      subType?: string | number,
    ) => handleInput(e.target.value, 'additionalInfo', subType),
    [handleInput],
  );

  const handleOpinionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleInput(e.target.value, 'opinion'),
    [handleInput],
  );

  return (
    <>
      <InfoArticle label="구매시기와 구매처">
        {datas.map(({ label, placeholder, subType }) => {
          return (
            <TextInput
              key={label}
              className={$.addition}
              controlled={false}
              value={additionalInfo[subType]}
              {...{ label, placeholder, subType }}
              onChange={handleChange}
            />
          );
        })}
      </InfoArticle>
      <InfoArticle label="추가 설명">
        <TextArea
          className={$.textarea}
          color="#e3e1e1"
          placeholder={opinionPlaceholder}
          value={opinion}
          onChange={handleOpinionChange}
        />
      </InfoArticle>
    </>
  );
}

export default memo(AdditionalInfo);
