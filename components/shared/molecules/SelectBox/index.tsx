import { memo, useRef } from 'react';

import { DefaultData } from '#types/index';
import { Check, SelectArrow } from '@atoms/icon';
import Span from '@atoms/Span';
import classnames from 'classnames';

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
  height?: string;
  isGender?: boolean;
};

function SelectBox<T, U>(selectProps: Props<T, U>) {
  const { options, selected, onChange, isGender } = selectProps;
  const { name, width, height, type, subType } = selectProps;
  const labelRef = useRef<HTMLButtonElement>(null);
  const [isClicked, setIsClicked] = useSelect(labelRef);
  const labelName = getLabelName(options, selected);

  const isGenderSelected = (optionName: string) =>
    isGender && labelName === optionName;
  const isSelected = (optionName: string) =>
    !isGender && labelName === optionName;

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
        [$['gender-box']]: isGender,
      })}
      style={{ ...{ width, height } }}
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
        <Span
          className={classnames({
            [$['gender-text']]: isGender,
          })}
        >
          {labelName || '선택'}
        </Span>
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
          style={{ top: height ? `calc(${height} + 6px)` : '56px' }}
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
                style={{ ...{ height } }}
                className={classnames($['select-item'], {
                  [$['select-item-clicked']]: isSelected(optionName),
                  [$['select-hover']]: !isGender,
                  [$['gender-item-clicked']]: isGenderSelected(optionName),
                  [$['gender-hover']]: isGender,
                })}
                onClick={(e) => handleSelectItem(e, optionData)}
                onKeyPress={(e) => handleSelectItem(e, optionData)}
              >
                {optionName}
                {isGenderSelected(optionName) && (
                  <Check className={$['check-icon']} />
                )}
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
