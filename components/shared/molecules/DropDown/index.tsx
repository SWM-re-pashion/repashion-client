import { memo, useRef } from 'react';

import { DefaultData } from '#types/index';
import { StyleProps } from '#types/props';
import Span from '@atoms/Span';
import useSelect from '@molecules/SelectBox/useSelect';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  options: (string | DefaultData)[];
  children: React.ReactNode;
  name: string;
  onClick?: (value: string) => void;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  fontWeight?: number;
  fontSize?: number;
} & StyleProps;

function DropDown(selectProps: Props) {
  const { options, onClick, children, className } = selectProps;
  const { name, fontWeight, fontSize, top, right, bottom, left } = selectProps;
  const labelRef = useRef<HTMLButtonElement>(null);
  const [isClicked, setIsClicked] = useSelect(labelRef);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    setIsClicked((clicked) => !clicked);
  };

  const handleDropdownItem = (option?: string) => {
    if (option && onClick) {
      onClick(option);
    }
    setIsClicked(false);
  };

  return (
    <div className={classnames(className, $['dropdown-btn'])}>
      <button
        {...{ className }}
        id={`${name}-select-box`}
        ref={labelRef}
        type="button"
        aria-haspopup="true"
        aria-expanded="true"
        aria-controls={`${name}-dropdown-list`}
        onClick={handleMouseDown}
      >
        {children}
      </button>

      {isClicked && (
        <ul
          id={`${name}-dropdown-list`}
          aria-labelledby={`${name}-select-box`}
          role="menu"
          tabIndex={0}
          className={$['dropdown-menulist']}
          style={{ top, right, bottom, left }}
        >
          {options.map((option) => {
            const isObject = typeof option === 'object';
            const optionName = isObject ? option.name : option;
            const optionData = isObject ? option.code : option;

            return (
              <li
                tabIndex={0}
                role="menuitem"
                key={optionName}
                className={classnames(
                  $['dropdown-menu'],
                  $['dropdown-menu-hover'],
                )}
                onClick={() => {
                  handleDropdownItem(optionData);
                }}
                onKeyPress={() => handleDropdownItem(optionData)}
              >
                <Span fontSize={fontSize || 12} {...{ fontWeight }}>
                  {optionName}
                </Span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default memo(DropDown);
