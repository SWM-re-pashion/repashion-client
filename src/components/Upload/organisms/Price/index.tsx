import { memo, useCallback } from 'react';

import { UpdateUpload, UploadState } from '#types/storeType/upload';
import ErrorMsg from '@atoms/ErrorMsg';
import Span from '@atoms/Span';
import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import RadioBtn from '@molecules/RadioBtn';
import classnames from 'classnames';
import { max } from 'src/components/Shop/Organisms/FilterModal/constants';
import useDebounceInput from 'src/hooks/useDebounceInput';
import { filterMaxPrice } from 'src/utils';

import $ from './style.module.scss';

type Props = {
  state: UploadState['price'];
  delivery: boolean;
  onChange: UpdateUpload;
  isPriceValid: boolean;
};

function Price(priceProps: Props) {
  const { delivery, onChange, state, isPriceValid } = priceProps;

  const handleInput = useDebounceInput<[number, keyof UploadState, undefined]>(
    onChange,
    200,
  );
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = filterMaxPrice(e.target.value, max);
      e.target.value = num;
      handleInput(+num, 'price', undefined);
    },
    [handleInput],
  );

  return (
    <InfoArticle label="판매가격 설정" required>
      <div className={$.box}>
        <TextInput
          controlled={false}
          value={state.toString()}
          placeholder="판매할 가격을 입력해주세요."
          onChange={handleChange}
        />
        <Span className={$.label} fontSize={20}>
          원
        </Span>
      </div>

      <div className={classnames($.box, $.delivery)}>
        <RadioBtn
          isClicked={delivery}
          onTypeClick={onChange}
          type="isIncludeDelivery"
        />
        <Span className={$.label} fontSize={16}>
          배송비 포함
        </Span>
      </div>
      <ErrorMsg
        isValid={isPriceValid}
        msg="판매 가격과 배송비 포함 여부를 알려주세요."
      />
    </InfoArticle>
  );
}

export default memo(Price);
