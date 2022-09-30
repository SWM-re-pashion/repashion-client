/* eslint-disable no-nested-ternary */
import { memo, useRef } from 'react';

import { DefaultData } from '#types/index';
import classnames from 'classnames';
import useDragScroll from 'hooks/useDragScroll';
import { StyleProps } from 'types/props';

import ButtonSelect from '../../molecules/ButtonSelect';
import InfoArticle from '../../molecules/InfoArticle';
import $ from './style.module.scss';
import { columns } from './util';

type Props<T, U> = {
  type?: T;
  subType?: U;
  isColor?: boolean;
  noCheckColor?: boolean;
  label: string;
  datas: (string | DefaultData)[];
  compareData: string | string[];
  handleFunc?: (value: string, type: T, subType?: U) => void;
  required?: boolean;
  childrenBox?: boolean;
  error?: React.ReactNode;
} & StyleProps;

function InfoBtnBox<T, U>(btnBoxProps: Props<T, U>) {
  const { className, style, isColor, noCheckColor, childrenBox } = btnBoxProps;
  const { error, label, type, subType } = btnBoxProps;
  const { datas, compareData, required, handleFunc } = btnBoxProps;
  const btnBoxRef = useRef<HTMLDivElement>(null);
  useDragScroll(btnBoxRef);

  return (
    <InfoArticle {...{ label, required, childrenBox }}>
      <div
        {...{ style }}
        className={classnames($['btn-box'], columns(datas.length), className)}
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
              className={!isColor && !noCheckColor ? $.btn : $['btn-color']}
              label={validLabel}
              data={validData}
              type={type || undefined}
              subType={subType || undefined}
              isSelected={isSelected}
              onClick={handleFunc}
              color={
                isColor && typeof data === 'object' ? data.code : undefined
              }
              noCheckColor={noCheckColor}
            />
          );
        })}
      </div>
      {error && error}
    </InfoArticle>
  );
}
const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(InfoBtnBox);
