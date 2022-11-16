import { Check } from '@atoms/icon';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  isGender?: boolean;
  isItemSelected: boolean;
  isGenderItemSelected?: boolean;
  optionName: string;
  height?: string;
  fontSize?: string;
  handleSelectMenu: (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => void;
};

function SelectMenuView(viewProps: Props) {
  const { height, fontSize, isGender, isGenderItemSelected } = viewProps;
  const { isItemSelected, optionName, handleSelectMenu } = viewProps;

  return (
    <li
      tabIndex={0}
      role="menuitem"
      style={{ ...{ height } }}
      className={classnames($['select-item'], {
        [$['select-item-gender']]: isGender,
        [$['select-item-clicked']]: isItemSelected,
        [$['select-hover']]: !isGender,
        [$['gender-item-clicked']]: isGenderItemSelected,
        [$['gender-hover']]: isGender,
      })}
      onClick={handleSelectMenu}
      onKeyPress={handleSelectMenu}
    >
      <span style={{ fontSize }}>{optionName}</span>

      {isGenderItemSelected && <Check className={$['check-icon']} />}
    </li>
  );
}
export default SelectMenuView;
