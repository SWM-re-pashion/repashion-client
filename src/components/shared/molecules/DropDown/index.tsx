import React, { memo, useRef } from 'react';

import { DefaultData } from '#types/index';
import { StyleProps } from '#types/props';
import Span from '@atoms/Span';
import useSelect from '@molecules/SelectBox/useSelect';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  options: (string | Partial<DefaultData> | JSX.Element)[];
  children: React.ReactNode;
  name: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  fontWeight?: number;
  fontSize?: number;
} & StyleProps;

const isReactComponent = (
  option: Props['options'][0],
): option is JSX.Element => {
  return typeof option === 'object' && !('name' in option);
};

function DropDown(selectProps: Props) {
  const { options, children, className } = selectProps;
  const { name, fontWeight, fontSize, top, right, bottom, left } = selectProps;
  const labelRef = useRef<HTMLButtonElement>(null);
  const [isClicked, setIsClicked] = useSelect(labelRef);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    setIsClicked((clicked) => !clicked);
  };

  const handleDropdownItem = (onClick?: () => void) => {
    if (onClick) onClick();
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
          {options.map((option, idx) => {
            if (isReactComponent(option))
              return React.cloneElement(option, {
                // eslint-disable-next-line react/no-array-index-key
                key: `component-menu-${idx}`,
              });

            const isObject = typeof option === 'object';
            const optionName = isObject ? option.name : option;
            const optionClick = isObject ? option.onClick : undefined;

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
                  handleDropdownItem(optionClick);
                }}
                onKeyPress={() => handleDropdownItem(optionClick)}
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
