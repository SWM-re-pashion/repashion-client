import { memo } from 'react';

import { StyleProps } from '#types/props';
import Button from '@atoms/Button';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  name: string;
  value?: string;
  onClick: (value?: string) => void;
  isSelected: boolean;
} & StyleProps;

function MenuBtn(menuProps: Props) {
  const { onClick, name, value, isSelected, className } = menuProps;

  return (
    <Button
      {...{ onClick, value }}
      key={name}
      label={`${name} 선택 버튼`}
      background={isSelected ? '#936DFF' : 'transparent'}
      color={isSelected ? '#fff' : '#000'}
      borderRadius="8px"
      className={classnames($.btn, className)}
    >
      {name}
    </Button>
  );
}

export default memo(MenuBtn);
