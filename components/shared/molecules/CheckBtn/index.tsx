import Button from '@atoms/Button';
import { Check } from '@atoms/icon';

import $ from './style.module.scss';

type Props = {
  isChecked: boolean;
};

function CheckBtn({ isChecked }: Props) {
  return (
    <Button
      iconBtn
      className={$['check-box']}
      background={isChecked ? '#936DFF' : 'transparent'}
    >
      {isChecked && <Check className={$['check-icon']} />}
    </Button>
  );
}

export default CheckBtn;
