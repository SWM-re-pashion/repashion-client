import { useEffect } from 'react';

import { UploadState } from '#types/storeType/upload';
import { UploadUpdateProps } from '#types/upload';
import ErrorMsg from '@atoms/ErrorMsg';
import Span from '@atoms/Span';
import InfoArticle from '@molecules/InfoArticle';
import RadioBtn from '@molecules/RadioBtn';
import TextInput from '@molecules/TextInput';
import classnames from 'classnames';
import { max } from 'src/components/Shop/Organisms/FilterModal/constants';
import useDebounceInput from 'src/hooks/useDebounceInput';
import { useUploadUpdateStore } from 'src/hooks/useUploadUpdateStore';
import { filterMaxPrice } from 'src/utils';

import $ from './style.module.scss';
import { priceValidate } from './validate';

function Price({ isUpdate }: UploadUpdateProps) {
  const useStore = useUploadUpdateStore(isUpdate);
  const price = useStore((states) => states.price);
  const isPriceValid = priceValidate(price);
  const isIncludeDelivery = useStore((states) => states.isIncludeDelivery);
  const onChange = useStore((states) => states.updateUpload);
  const updateValidate = useStore((states) => states.updateValidate);
  const handleInput = useDebounceInput<[number, keyof UploadState, undefined]>(
    onChange,
    200,
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = filterMaxPrice(e.target.value, max);
    e.target.value = num;
    handleInput(+num, 'price', undefined);
  };

  useEffect(() => {
    updateValidate('price', isPriceValid);
  }, [isPriceValid, updateValidate]);

  return (
    <InfoArticle label="판매가격 설정" required>
      <div className={$.box}>
        <TextInput
          controlled={false}
          value={price.toString()}
          placeholder="판매할 가격을 입력해주세요."
          onChange={handleChange}
        />
        <Span className={$.label} fontSize={20}>
          원
        </Span>
      </div>

      <div className={classnames($.box, $.delivery)}>
        <RadioBtn
          isClicked={isIncludeDelivery}
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

export default Price;
