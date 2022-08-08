import { memo, useCallback } from 'react';

import { UpdateUpload, UploadState } from '#types/storeType/upload';
import Label from '@atoms/Label';
import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import RadioBtn from '@molecules/RadioBtn';
import classnames from 'classnames';
import { max } from 'components/Shop/Organisms/FilterModal/constants';
import useDebounceInput from 'hooks/useDebounceInput';
import { filterPrice } from 'utils';

import $ from './style.module.scss';

type Props = {
  delivery: boolean;
  onChange: UpdateUpload;
};

function Price(priceProps: Props) {
  const { delivery, onChange } = priceProps;
  const handleInput = useDebounceInput<[string, keyof UploadState, undefined]>(
    onChange,
    200,
  );
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = filterPrice(e.target.value, max).toString();
      e.target.value = num;
      handleInput(num, 'price', undefined);
    },
    [handleInput],
  );

  return (
    <InfoArticle label="판매가격 설정" required>
      <div className={$.box}>
        <TextInput
          controlled={false}
          placeholder="판매할 가격을 입력해주세요."
          handleChange={handleChange}
        />
        <Label className={$.label} fontSize={20}>
          원
        </Label>
      </div>

      <div className={classnames($.box, $.delivery)}>
        <RadioBtn
          isClicked={delivery}
          onTypeClick={onChange}
          type="isIncludeDelivery"
        />
        <Label className={$.label} fontSize={16}>
          배송비 포함
        </Label>
      </div>
    </InfoArticle>
  );
}

export default memo(Price);
