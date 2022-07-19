import { memo } from 'react';

import classnames from 'classnames';
import { ColorData, UserInfo } from 'types/info';
import { StyleProps } from 'types/props';

import ButtonSelect from '../../molecules/ButtonSelect';
import InfoArticle from '../../molecules/InfoArticle';
import $ from './style.module.scss';

type Props = {
  isColor?: boolean;
  label: string;
  type?: keyof UserInfo;
  datas: (string | ColorData)[];
  compareData: string | string[];
  handleFunc?: (type: keyof UserInfo, value: string) => void;
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
            !isColor && typeof data === 'string' ? data : data.name;
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
              isSelected={isSelected}
              handleClick={handleFunc}
              color={isColor ? data.code : undefined}
            />
          );
        })}
      </div>
    </InfoArticle>
  );
}

export default memo(InfoBtnBox);
