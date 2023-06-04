import { useCallback } from 'react';

import { Measure } from '#types/storeType/upload';
import { UploadTemplateWithCategory } from '#types/upload';
import InfoArticle from '@molecules/InfoArticle';
import TextInput from '@molecules/TextInput';
import { getMainCategory } from 'src/api/category';
import { useDidMountEffect } from 'src/hooks';
import { useUploadUpdateStore } from 'src/hooks/useUploadUpdateStore';
import { getMeasureElement } from 'src/utils';
import { filterHeight } from 'src/utils/filterValue';

import $ from './style.module.scss';

function MeasureInfo(priceProps: UploadTemplateWithCategory) {
  const { isUpdate, categoryData } = priceProps;
  const useStore = useUploadUpdateStore(isUpdate);
  const category = useStore((states) => states.basicInfo.category);
  const initMeasure = useStore((states) => states.initMeasure);
  const onChange = useStore((states) => states.updateUpload);

  const state = useStore((states) => states.measure);
  const mainCategory = getMainCategory(categoryData, category);
  const { measureData, measureState } = getMeasureElement(mainCategory);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, subType?: keyof Measure) => {
      const value = filterHeight(e.target.value);
      e.target.value = value;
      onChange(+value, 'measure', subType);
    },
    [onChange],
  );

  useDidMountEffect(() => {
    initMeasure(measureState);
    onChange(mainCategory, 'measureType');
  }, [mainCategory]); // NOTE: restrictMode로 인해 실행됨.

  return (
    <InfoArticle label="실측 사이즈">
      {measureData.map(({ name, code }) => {
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

export default MeasureInfo;
