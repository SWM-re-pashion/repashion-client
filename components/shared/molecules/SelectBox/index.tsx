import { memo, useRef } from 'react';

import { DefaultData, QueryChange } from '#types/index';
import { Check, SelectArrow } from '@atoms/icon';
import Span from '@atoms/Span';
import classnames from 'classnames';

import $ from './style.module.scss';
import useSelect from './useSelect';
import { getLabelNameByProp } from './utils';

type Props<T, U> = {
  options: (string | DefaultData)[];
  selected: string | number;
  onChange?: (value: string, type: T, subType: U) => void;
  onQueryChange?: QueryChange;
  name: string;
  type?: T;
  subType?: U;
  width?: string;
  height?: string;
  isGender?: boolean;
  fontWeight?: number;
  fontSize?: number;
  hasId?: boolean;
};

function SelectBox<T, U>(selectProps: Props<T, U>) {
  const { options, selected, onChange, onQueryChange, isGender, hasId } =
    selectProps;
  const { name, width, height, type, subType, fontWeight, fontSize } =
    selectProps;
  const labelRef = useRef<HTMLButtonElement>(null);
  const [isClicked, setIsClicked] = useSelect(labelRef);
  const labelProp = hasId ? 'id' : 'code';
  const labelName = getLabelNameByProp(options, selected, labelProp);
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
      if (option && onChange) {
        onChange(option, type, subType);
      }
    }
    if (option && onQueryChange) onQueryChange(name, option);
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
          fontSize={fontSize || 16}
          fontWeight={fontWeight || 400}
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
            const isObject = typeof option === 'object';
            const optionName = isObject ? option.name : option;
            const optionData = isObject ? option.code : option;
            const hasIdData = isObject ? option.id : option;
            const toBeData = hasId ? hasIdData : optionData;

            return (
              <li
                tabIndex={0}
                role="menuitem"
                key={optionName}
                style={{ ...{ height } }}
                className={classnames($['select-item'], {
                  [$['select-item-gender']]: isGender,
                  [$['select-item-clicked']]: isSelected(optionName),
                  [$['select-hover']]: !isGender,
                  [$['gender-item-clicked']]: isGenderSelected(optionName),
                  [$['gender-hover']]: isGender,
                })}
                onClick={(e) => handleSelectItem(e, toBeData)}
                onKeyPress={(e) => handleSelectItem(e, toBeData)}
              >
                <span style={{ fontSize }}>{optionName}</span>

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
