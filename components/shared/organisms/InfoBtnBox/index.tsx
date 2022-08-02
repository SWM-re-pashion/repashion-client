/* eslint-disable no-nested-ternary */
import { memo, useRef } from 'react';

import { DefaultData } from '#types/index';
import classnames from 'classnames';
import useDragScroll from 'hooks/useDragScroll';
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
  datas: (string | DefaultData)[];
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
          const validLabel: string =
            typeof data === 'object' ? data.name : data;
          const validData: string =
            typeof data === 'object' ? (isColor ? data.name : data.code) : data;

          const isSelected =
            typeof compareData === 'string'
              ? compareData === validData
              : compareData.includes(validData);

          return (
            <ButtonSelect
              key={validData}
              className={$.btn}
              label={validLabel}
              data={validData}
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
