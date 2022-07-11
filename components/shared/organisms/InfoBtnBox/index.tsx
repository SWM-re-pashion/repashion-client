import classnames from 'classnames';
import { StyleProps } from 'types/props';

import ButtonSelect from '../../molecules/ButtonSelect';
import InfoArticle from '../../molecules/InfoArticle';
import $ from './style.module.scss';

type Props = {
  label: string;
  datas: string[];
  compareData: string | string[];
  handleFunc: (value: string) => void;
} & StyleProps;

function InfoBtnBox({
  className,
  style,
  label,
  datas,
  compareData,
  handleFunc,
}: Props) {
  return (
    <InfoArticle label={label}>
      <div {...{ style }} className={classnames($['btn-box'], className)}>
        {datas.map((data) => (
          <ButtonSelect
            key={data}
            className={$.btn}
            label={data}
            isSelected={
              typeof compareData === 'string'
                ? compareData === data
                : compareData.includes(data)
            }
            handleClick={handleFunc}
          />
        ))}
      </div>
    </InfoArticle>
  );
}

export default InfoBtnBox;
