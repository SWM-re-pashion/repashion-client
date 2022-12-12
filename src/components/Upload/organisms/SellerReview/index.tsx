import { memo, useCallback } from 'react';

import { DefaultData } from '#types/index';
import { UpdateUpload, UploadState } from '#types/storeType/upload';
import ErrorMsg from '@atoms/ErrorMsg';
import Span from '@atoms/Span';
import InfoArticle from '@molecules/InfoArticle';
import SelectBox from '@molecules/SelectBox';
import TextInput from '@molecules/TextInput';
import useDebounceInput from 'src/hooks/useDebounceInput';
import { filterHeight } from 'src/utils/filterValue';

import { reviewProps } from './constants';
import $ from './style.module.scss';

type Props = {
  data: {
    condition: DefaultData[];
    pollution: DefaultData[];
    fit: DefaultData[];
    bodyShapes: DefaultData[];
    length: DefaultData[];
  };
  state: UploadState['sellerNote'];
  onChange: UpdateUpload;
  isSellerValid: boolean;
};

function SellerReview(priceProps: Props) {
  const { data, state, onChange, isSellerValid } = priceProps;
  const { condition, pollution, fit, bodyShapes, length } = data;
  const optionsData = [condition, pollution, length, fit];
  const handleInput = useDebounceInput(onChange, 200);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = filterHeight(e.target.value);
      e.target.value = value;
      handleInput(+value, 'sellerNote', 'height');
    },
    [handleInput],
  );

  return (
    <InfoArticle label="쉽게 작성하는 후기" required>
      {reviewProps.map(({ label1, label2, label3, ...rest }, idx) => {
        return (
          <div key={label1 || label2 || label3} className={$['select-wrapper']}>
            {label1 && (
              <Span fontWeight={400} className={$.label}>
                {label1}
              </Span>
            )}

            {rest.hasHeight && (
              <TextInput
                postLabel="cm"
                controlled={false}
                value={state.height.toString()}
                placeholder="키 입력"
                onChange={handleChange}
              />
            )}

            {rest.hasBodyShape && (
              <SelectBox
                name="체형 선택"
                type="sellerNote"
                subType="bodyShape"
                options={bodyShapes}
                selected={state.bodyShape}
                onChange={onChange}
              />
            )}

            {label2 && (
              <Span fontWeight={400} className={$.label}>
                {label2}
              </Span>
            )}

            <SelectBox
              {...rest}
              options={optionsData[idx]}
              selected={state[rest.subType]}
              onChange={onChange}
            />

            {label3 && (
              <Span fontWeight={400} className={$.label}>
                {label3}
              </Span>
            )}
          </div>
        );
      })}

      <ErrorMsg isValid={isSellerValid} msg="상품 후기를 선택해주세요." />
    </InfoArticle>
  );
}

export default memo(SellerReview);
