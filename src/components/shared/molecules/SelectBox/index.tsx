import { memo, useRef } from 'react';

import { DefaultData } from '#types/index';
import { SelectArrow } from '@atoms/icon';
import Span from '@atoms/Span';
import classnames from 'classnames';

import SelectMenuView from './SelectMenu.view';
import $ from './style.module.scss';
import useSelect from './useSelect';
import { getLabelNameByProp } from './utils';

type Props<T, U> = {
  options: (string | DefaultData)[];
  selected: string | number;
  onChange?: (value: string, type: T, subType: U) => void;
  onQueryChange?: (value: string) => void;
  name: string;
  type?: T;
  subType?: U;
  width?: string;
  height?: string;
  isGender?: boolean;
  fontWeight?: number;
  fontSize?: number;
  hasId?: boolean;
  isSameCodeName?: boolean;
};

function SelectBox<T, U>(selectProps: Props<T, U>) {
  const { options, selected, onChange, onQueryChange } = selectProps;
  const { width, height, type, subType, fontWeight, fontSize } = selectProps;
  const { name, isGender, hasId, isSameCodeName } = selectProps;
  const labelRef = useRef<HTMLButtonElement>(null);
  const [isClicked, setIsClicked] = useSelect(labelRef);
  const labelProp = hasId ? 'id' : 'code';
  const labelName = getLabelNameByProp(
    [options, selected],
    labelProp,
    isSameCodeName,
  );

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
    if (type && subType && option && onChange) {
      onChange(option, type, subType);
    } else if (option && onQueryChange) {
      onQueryChange(option);
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
          fontSize={fontSize || 16}
          fontWeight={fontWeight || 400}
          className={classnames($.text, {
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
            const candidateName = isObject ? option.name : option;
            const optionCodeName = isObject ? option.code : option;
            const optionName = isSameCodeName ? optionCodeName : candidateName;
            const optionData = isObject ? option.code : option;
            const hasIdData = isObject ? option.id : option;
            const toBeData = hasId ? hasIdData : optionData;

            const props = {
              height,
              fontSize: `${fontSize}px`,
              isGender,
              optionName,
              isItemSelected: isSelected(optionName),
              isGenderItemSelected: isGenderSelected(optionName),
              handleSelectMenu: (
                e:
                  | React.MouseEvent<HTMLLIElement>
                  | React.KeyboardEvent<HTMLLIElement>,
              ) => handleSelectItem(e, toBeData),
            };

            return <SelectMenuView key={props.optionName} {...props} />;
          })}
        </ul>
      )}
    </div>
  );
}

const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(SelectBox);
