import { RefObject } from 'react';

import { FilterUpdate } from '#types/storeType/filter';
import Button from '@atoms/Button';
import { Close } from '@atoms/icon';
import ButtonFooter from '@molecules/ButtonFooter';
import PageHeader from '@molecules/PageHeader';
import InfoBtnBox from '@organisms/InfoBtnBox';
import Modal from '@templates/Modal';
import { btnBox } from 'src/helpers/filter';

import PriceInput from '../PriceInput';
import { PriceProps } from './constants';
import $ from './style.module.scss';

type Props = {
  isOpen: boolean;
  setFilter: () => void;
  onClose: () => void;
  filterDatas: btnBox[];
  priceProp: PriceProps;
  compareData: (options: btnBox) => string[];
  filterUpdate: FilterUpdate;
  clear: () => void;
  inputLeftRef: RefObject<HTMLInputElement>;
  inputRightRef: RefObject<HTMLInputElement>;
  priceUpdate: (value: number, idx: number) => void;
  handlePriceChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    idx?: number,
  ) => void;
};

export default function FilterModalView(viewProps: Props) {
  const { isOpen, onClose, setFilter, filterDatas } = viewProps;
  const { priceProp, compareData, filterUpdate, clear } = viewProps;
  const { inputLeftRef, inputRightRef, handlePriceChange, priceUpdate } =
    viewProps;

  return (
    <Modal id="filter-modal" {...{ isOpen, onClose }}>
      <PageHeader
        title="필터"
        left={
          <Button onClick={setFilter} label="필터 적용하고 닫기" iconBtn>
            <Close />
          </Button>
        }
      />

      <div className={$['filter-modal']} aria-describedby="필터 페이지">
        <div className={$['filter-container']}>
          {filterDatas.map((options) => (
            <InfoBtnBox
              {...options}
              key={options.label}
              compareData={compareData(options)}
              handleFunc={filterUpdate}
            />
          ))}
          <PriceInput
            {...priceProp}
            handleChange={handlePriceChange}
            leftRef={inputLeftRef}
            rightRef={inputRightRef}
            update={priceUpdate}
          />
        </div>

        <ButtonFooter
          background="white"
          LeftBtn={
            <Button className={$.clear} onClick={clear}>
              초기화
            </Button>
          }
          style={{ padding: '0 24px 30px' }}
          onClick={setFilter}
        >
          상품보기
        </ButtonFooter>
      </div>
    </Modal>
  );
}
