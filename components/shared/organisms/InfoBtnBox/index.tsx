import { memo, useRef } from 'react';

import classnames from 'classnames';
import useDragScroll from 'hooks/useDragScroll';
import { ColorData } from 'types/info';
import { StyleProps } from 'types/props';

import ButtonSelect from '../../molecules/ButtonSelect';
import InfoArticle from '../../molecules/InfoArticle';
import $ from './style.module.scss';

type Props<T, U> = {
  type?: T;
  subType?: U;
  isColor?: boolean;
  noCheckColor?: boolean;
  label: string;
  datas: (string | ColorData)[];
  compareData: string | string[];
  handleFunc?: (type: T, value: string, subType?: U) => void;
  required?: boolean;
} & StyleProps;

function InfoBtnBox<T, U>(btnBoxProps: Props<T, U>) {
  const { className, style, isColor, noCheckColor } = btnBoxProps;
  const { label, type, datas, subType, compareData, required, handleFunc } =
    btnBoxProps;
  const btnBoxRef = useRef<HTMLDivElement>(null);
  useDragScroll(btnBoxRef);

  return (
    <InfoArticle label={label} required={required}>
      <div
        {...{ style }}
        className={classnames(
          !isColor && !noCheckColor ? $['btn-box'] : $['btn-box-color'],
          { [$['btn-box-color-no-check']]: noCheckColor },
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
            <ButtonSelect
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
              noCheckColor={noCheckColor}
            />
          );
        })}
      </div>
    </InfoArticle>
  );
}
const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(InfoBtnBox);
