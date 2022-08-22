import { memo, useRef } from 'react';

import classnames from 'classnames';

import { DefaultData } from '#types/index';
import { SelectArrow } from '@atoms/icon';

import $ from './style.module.scss';
import useSelect from './useSelect';
import { getLabelName } from './utils';

type Props<T, U> = {
  options: (string | DefaultData)[];
  selected: string | number;
  onChange: (value: string, type: T, subType: U) => void;
  name: string;
  type?: T;
  subType?: U;
  width?: string;
};

function SelectBox<T, U>(selectProps: Props<T, U>) {
  const { options, selected, onChange } = selectProps;
  const { name, width, type, subType } = selectProps;
  const labelRef = useRef<HTMLButtonElement>(null);
  const [isClicked, setIsClicked] = useSelect(labelRef);
  const labelName = getLabelName(options, selected);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    setIsClicked((clicked) => !clicked);
  };

  const handleSelectItem = (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
    option?: string,
  ) => {
    if (type && subType) {
      if (option) {
        onChange(option, type, subType);
      }
    }
    setIsClicked(false);
  };

  return (
    <div
      className={classnames($['select-box'], {
        [$['select-box-clicked']]: isClicked,
      })}
      style={{ ...{ width } }}
    >
      <button
        id={`${name}-select-box`}
        ref={labelRef}
        type="button"
        aria-haspopup="true"
        aria-expanded="true"
        aria-controls={`${name}-select-list`}
        onClick={handleMouseDown}
      >
        {labelName || '선택'}
        <SelectArrow
          className={classnames($.arrow, {
            [$['arrow-clicked']]: isClicked,
          })}
        />
      </button>

      {isClicked && (
        <ul
          id={`${name}-select-list`}
          aria-labelledby={`${name}-select-box`}
          role="menu"
          tabIndex={0}
          className={classnames($['select-wrapper'], {
            [$['select-wrapper-clicked']]: isClicked,
          })}
        >
          {options.map((option) => {
            const optionName =
              typeof option === 'object' ? option.name : option;
            const optionData =
              typeof option === 'object' ? option.code : option;

            return (
              <li
                tabIndex={0}
                role="menuitem"
                key={optionName}
                className={classnames($['select-item'], {
                  [$['select-item-clicked']]: labelName === optionName,
                })}
                onClick={(e) => handleSelectItem(e, optionData)}
                onKeyPress={(e) => handleSelectItem(e, optionData)}
              >
                {optionName}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(SelectBox);
