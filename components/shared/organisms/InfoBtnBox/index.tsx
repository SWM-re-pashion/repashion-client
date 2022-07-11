import classnames from 'classnames';
import { StyleProps } from 'types/props';

import ButtonSelect from '../../molecules/ButtonSelect';
import InfoArticle from '../../molecules/InfoArticle';
import $ from './style.module.scss';

type Props = {
  isColor?: boolean;
  label: string;
  datas: (string | [string, string])[];
  compareData: string | string[];
  handleFunc: (value: string) => void;
} & StyleProps;

function InfoBtnBox({
  className,
  style,
  isColor,
  label,
  datas,
  compareData,
  handleFunc,
}: Props) {
  return (
    <InfoArticle label={label}>
      <div
        {...{ style }}
        className={classnames(
          !isColor ? $['btn-box'] : $['btn-box-color'],
          className,
        )}
      >
        {datas.map((data) => (
          <ButtonSelect
            key={!isColor && typeof data === 'string' ? data : data[0]}
            className={$.btn}
            label={!isColor && typeof data === 'string' ? data : data[0]}
            isSelected={
              typeof compareData === 'string'
                ? compareData === data
                : compareData.includes(
                    !isColor && typeof data === 'string' ? data : data[0],
                  )
            }
            handleClick={handleFunc}
            color={isColor ? data[1] : undefined}
          />
        ))}
      </div>
    </InfoArticle>
  );
}

export default InfoBtnBox;
