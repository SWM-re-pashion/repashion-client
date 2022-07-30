import { useRouter } from 'next/router';

import { useCallback, useRef } from 'react';

import Button from '@atoms/Button';
import ButtonFooter from '@atoms/ButtonFooter';
import InfoBtnBox from '@organisms/InfoBtnBox';
import Layout from '@templates/Layout';
import { Modal } from '@templates/Modal';
import FilterHeader from 'components/Shop/molecules/FilterHeader';
import { useFilterStore } from 'store/useFilterStore';
import { filterData } from 'utils';

import PriceInput from '../PriceInput';
import { max, priceProps } from './constants';
import $ from './style.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function FilterModal({ onClose }: { onClose: () => void }) {
  const states = useFilterStore((state) => state);
  const filterUpdate = useFilterStore(
    useCallback((stat) => stat.filterUpdate, []),
  );
  const clearState = useFilterStore(useCallback((stat) => stat.clear, []));
  const priceUpdate = useFilterStore(
    useCallback((stat) => stat.priceUpdate, []),
  );
  const inputLeftRef = useRef<HTMLInputElement>(null);
  const inputRightRef = useRef<HTMLInputElement>(null);
  const { query } = useRouter();
  const category = decodeURI(decodeURIComponent(query.category as string));

  const clear = () => {
    if (clearState) clearState();
  };

  const priceChangeCallback = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx?: number,
  ) => {
    const { value } = e.target;
    const filteredValue = value.replace(/[^0-9]/g, '');
    e.target.value = filteredValue;

    if (+filteredValue > max) {
      if (filteredValue.substring(0, 7) === `${max}`) {
        e.target.value = `${max}`;
      } else e.target.value = filteredValue.substring(0, 6);
    }
    if (typeof idx === 'number') {
      priceUpdate(+e.target.value, idx);
    }
  };
  const handlePriceChange = useCallback(priceChangeCallback, []);

  return (
    <>
      <FilterHeader onClose={onClose} />

      <div className={$['filter-container']}>
        {filterData(category).map((options) => {
          const compareData: string[] =
            options.type !== 'styles' && options.subType
              ? states[options.type][options.subType]
              : (states[options.type] as string[]); // Todo: 타입 단언 제거

          return (
            <InfoBtnBox
              {...options}
              key={options.label}
              compareData={compareData}
              handleFunc={filterUpdate}
            />
          );
        })}

        <PriceInput
          {...priceProps(states.price)}
          handleChange={handlePriceChange}
          leftRef={inputLeftRef}
          rightRef={inputRightRef}
          update={priceUpdate}
        />
      </div>

      <ButtonFooter
        LeftBtn={
          <Button className={$.clear} onClick={clear}>
            초기화
          </Button>
        }
        style={{ padding: '0 24px 30px' }}
      >
        설정완료
      </ButtonFooter>
    </>
  );
}

export default function FilterModalWrapper({ isOpen, onClose }: Props) {
  return (
    <Modal id="filter-modal" open={isOpen}>
      <div className={$['filter-modal']} aria-describedby="필터 페이지">
        <Layout noPadding decreaseHeight={80}>
          <FilterModal onClose={onClose} />
        </Layout>
      </div>
    </Modal>
  );
}
