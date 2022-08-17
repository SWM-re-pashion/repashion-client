import { useRef } from 'react';

import { DefaultData } from '#types/index';
import { SelectArrow } from '@atoms/icon';
import classnames from 'classnames';

import $ from './style.module.scss';
import useSelect from './useSelect';

type Props<T, U> = {
  options: (string | DefaultData)[];
  selected: string;
  onChange: (value: string, type: T, subType: U) => void;
  name: string;
  type?: T;
  subType?: U;
  width?: string;
};

function SelectBox<T, U>(selectProps: Props<T, U>) {
  const { options, selected, onChange } = selectProps;
  const { name, width, type, subType } = selectProps;
  const labelRef = useRef<HTMLLabelElement>(null);
  const [isClicked, setIsClicked] = useSelect(labelRef);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    setIsClicked((clicked) => !clicked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!e.code) return;
    if (e.code === 'Enter' || e.code === 'Space') {
      setIsClicked((clicked) => !clicked);
    }
  };

  const handleSelectItem = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.MouseEvent<HTMLLIElement>
      | React.KeyboardEvent<HTMLLIElement>,
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
      <label
        role="button"
        tabIndex={0}
        ref={labelRef}
        htmlFor={`${name}-select`}
        aria-label={name}
        onClick={handleMouseDown}
        onKeyPress={handleKeyDown}
      >
        <select
          id={`${name}-select`}
          value={selected}
          onChange={handleSelectItem}
        >
          {selected &&
            options.map((option) => {
              const optionName =
                typeof option === 'object' ? option.name : option;
              const optionCode =
                typeof option === 'object' ? option.code : option;
              return (
                <option key={optionName} value={optionCode}>
                  {optionName}
                </option>
              );
            })}
          {!selected && (
            <option key="선택" value="선택">
              선택
            </option>
          )}
        </select>

        <SelectArrow
          className={classnames($.arrow, {
            [$['arrow-clicked']]: isClicked,
          })}
        />
      </label>

      {isClicked && (
        <ul
          role="menu"
          tabIndex={0}
          className={classnames($['select-wrapper'], {
            [$['select-wrapper-clicked']]: isClicked,
          })}
        >
          {options.map((option) => {
            const optionName =
              typeof option === 'object' ? option.name : option;
            const optionCode =
              typeof option === 'object' ? option.code : option;

            return (
              <li
                tabIndex={0}
                role="menuitem"
                key={optionName}
                className={$['select-item']}
                onClick={(e) => handleSelectItem(e, optionCode)}
                onKeyPress={(e) => handleSelectItem(e, optionCode)}
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

export default SelectBox;
