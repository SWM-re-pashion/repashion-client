import { memo, useCallback } from 'react';

import { DefaultData } from '#types/index';
import { Measure, UpdateUpload, UploadState } from '#types/storeType/upload';
import InfoArticle from '@molecules/InfoArticle';
import TextInput from '@molecules/TextInput';
import { filterHeight } from 'src/utils/filterValue';

import $ from './style.module.scss';

type Props = {
  data: DefaultData[];
  state: UploadState['measure'];
  onChange: UpdateUpload;
};

function MeasureInfo(priceProps: Props) {
  const { data, state, onChange } = priceProps;
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, subType?: keyof Measure) => {
      const value = filterHeight(e.target.value);
      e.target.value = value;
      onChange(+value, 'measure', subType);
    },
    [onChange],
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
            controlled
            value={state[code]?.toString()}
            placeholder="수치 입력"
            onChange={handleChange}
            className={$['measure-element']}
          />
        );
      })}
    </InfoArticle>
  );
}

export default memo(MeasureInfo);
