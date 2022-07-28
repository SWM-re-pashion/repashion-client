import { memo, useRef } from 'react';

import classnames from 'classnames';
import useDragScroll from 'hooks/useDragScroll';
import { ColorData, ClothesCategory } from 'types/info';
import { StyleProps } from 'types/props';

import ButtonSelect from '../../molecules/ButtonSelect';
import InfoArticle from '../../molecules/InfoArticle';
import $ from './style.module.scss';

type Props<T> = {
  type?: T;
  isColor?: boolean;
  label: string;
  subType?: keyof ClothesCategory;
  datas: (string | ColorData)[];
  compareData: string | string[];
  handleFunc?: (type: T, value: string) => void;
  required?: boolean;
} & StyleProps;

function InfoBtnBox<T>({
  className,
  style,
  isColor,
  label,
  type,
  datas,
  subType,
  compareData,
  required,
  handleFunc,
}: Props<T>) {
  const btnBoxRef = useRef<HTMLDivElement>(null);
  useDragScroll(btnBoxRef);

  return (
    <InfoArticle label={label} required={required}>
      <div
        {...{ style }}
        className={classnames(
          !isColor ? $['btn-box'] : $['btn-box-color'],
          className,
        )}
        ref={btnBoxRef}
      >
        {datas.map((data) => {
          const validData: string | keyof ColorData =
            typeof data === 'object' ? data.name : data;
          const isSelected =
            typeof compareData === 'string'
              ? compareData === data
              : compareData.includes(validData);

          return (
            <ButtonSelect<T>
              key={validData}
              className={$.btn}
              label={validData}
              type={type || undefined}
              subType={subType || undefined}
              isSelected={isSelected}
              handleClick={handleFunc}
              color={
                isColor && typeof data === 'object' ? data.code : undefined
              }
            />
          );
        })}
      </div>
    </InfoArticle>
  );
}
const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(InfoBtnBox);
