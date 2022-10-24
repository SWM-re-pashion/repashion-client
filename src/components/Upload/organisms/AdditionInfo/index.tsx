import { memo, useCallback } from 'react';

import {
  AdditionalInfo,
  UpdateUpload,
  UploadState,
} from '#types/storeType/upload';
import TextArea from '@atoms/TextArea';
import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import useDebounceInput from 'src/hooks/useDebounceInput';

import $ from './style.module.scss';

type Props = {
  data: {
    placeholder: string;
    label: string;
    type: keyof UploadState;
    subType: keyof AdditionalInfo;
  }[];
  opinionPlaceholder: string;
  opinionState: UploadState['opinion'];
  additionState: UploadState['additionalInfo'];
  onChange: UpdateUpload;
};

function AdditionInfo(additionProps: Props) {
  const { data: datas, opinionPlaceholder, onChange } = additionProps;
  const { additionState, opinionState } = additionProps;
  const handleInput = useDebounceInput(onChange, 200);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      subType?: keyof AdditionalInfo,
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
              value={additionState[subType]}
              {...{ label, placeholder, subType }}
              onChange={handleChange}
            />
          );
        })}
      </InfoArticle>
      <InfoArticle label="판매자의 한마디">
        <TextArea
          className={$.textarea}
          color="#e3e1e1"
          placeholder={opinionPlaceholder}
          value={opinionState}
          onChange={handleOpinionChange}
        />
      </InfoArticle>
    </>
  );
}

export default memo(AdditionInfo);
