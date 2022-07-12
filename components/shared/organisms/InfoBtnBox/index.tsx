import { memo } from 'react';

import classnames from 'classnames';
import { StyleProps } from 'types/props';

import ButtonSelect from '../../molecules/ButtonSelect';
import InfoArticle from '../../molecules/InfoArticle';
import $ from './style.module.scss';

type Props = {
  isColor?: boolean;
  label: string;
  type?: string;
  datas: (string | [string, string])[];
  compareData: string | string[];
  handleFunc: (type: string, value: string) => void;
  required?: boolean;
} & StyleProps;

function InfoBtnBox({
  className,
  style,
  isColor,
  label,
  type,
  datas,
  compareData,
  required,
  handleFunc,
}: Props) {
  return (
    <InfoArticle label={label} required={required}>
      <div
        {...{ style }}
        className={classnames(
          !isColor ? $['btn-box'] : $['btn-box-color'],
          className,
        )}
      >
        {datas.map((data) => {
          const validData =
            !isColor && typeof data === 'string' ? data : data[0];

          return (
            <ButtonSelect
              key={validData}
              className={$.btn}
              label={validData}
              type={type || undefined}
              isSelected={
                typeof compareData === 'string'
                  ? compareData === data
                  : compareData.includes(validData)
              }
              handleClick={handleFunc}
              color={isColor ? data[1] : undefined}
            />
          );
        })}
      </div>
    </InfoArticle>
  );
}

export default memo(InfoBtnBox);
