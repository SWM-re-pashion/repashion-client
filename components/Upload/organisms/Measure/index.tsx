import { memo, useCallback } from 'react';

import { DefaultData } from '#types/index';
import { UpdateUpload, UploadState } from '#types/storeType/upload';
import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import useDebounceInput from 'hooks/useDebounceInput';
import { filterHeight } from 'utils/filterValue';

import $ from './style.module.scss';

type Props = {
  data: DefaultData[];
  state: UploadState['measure'];
  onChange: UpdateUpload;
};

function Measure(priceProps: Props) {
  const { data, state, onChange } = priceProps;
  const handleInput = useDebounceInput(onChange, 200);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, subType?: string | number) => {
      // Todo 제네릭화
      const value = filterHeight(e.target.value);
      e.target.value = value;
      handleInput(+value, 'measure', subType);
    },
    [handleInput],
  );

  return (
    <InfoArticle label="실측 사이즈">
      {data.map(({ name, code }) => {
        return (
          <TextInput
            key={name}
            label={name}
            subType={code}
            postLabel="cm"
            controlled={false}
            value={state[code].toString()}
            placeholder="수치 입력"
            onChange={handleChange}
            className={$['measure-element']}
          />
        );
      })}
    </InfoArticle>
  );
}

export default memo(Measure);
