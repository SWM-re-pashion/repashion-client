import { useRouter } from 'next/router';

import { useCallback, useRef } from 'react';

import Button from '@atoms/Button';
import ButtonFooter from '@atoms/ButtonFooter';
import { Close } from '@atoms/icon';
import PageHeader from '@molecules/PageHeader';
import InfoBtnBox from '@organisms/InfoBtnBox';
import Layout from '@templates/Layout';
import { Modal } from '@templates/Modal';
import { useFilterStore } from 'store/useFilterStore';
import { filterPrice } from 'utils';

import PriceInput from '../PriceInput';
import { max, priceProps } from './constants';
import $ from './style.module.scss';
import { filterData } from './utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function FilterModal({ onClose }: { onClose: () => void }) {
  const { query } = useRouter();
  const category = (query.category as string) || 'all';
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

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, idx?: number) => {
      const num = filterPrice(e.target.value, max).toString();
      e.target.value = num;
      if (typeof idx === 'number') priceUpdate(+num, idx);
    },
    [priceUpdate],
  );

  const clear = () => {
    if (clearState) clearState(category);
  };

  return (
    <>
      <PageHeader
        title="필터"
        left={
          <Button onClick={onClose} label="필터 닫기" iconBtn>
            <Close />
          </Button>
        }
      />

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
