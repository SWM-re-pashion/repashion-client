import { memo, useRef } from 'react';

import { DefaultData } from '#types/index';

import SelectBoxView from './SelectBox.view';
import SelectMenuView from './SelectMenu.view';
import useSelect from './useSelect';
import { getLabelNameByProp } from './utils';

type Props<T, U> = {
  name: string;
  options: (string | DefaultData)[];
  selected: string | number;
  type?: T;
  subType?: U;
  width?: string;
  height?: string;
  isGender?: boolean;
  fontWeight?: number;
  fontSize?: number;
  hasId?: boolean;
  isSameCodeName?: boolean;
  onChange?: (value: string, type: T, subType: U) => void;
  onQueryChange?: (value: string) => void;
};

function SelectBox<T, U>(selectProps: Props<T, U>) {
  const { options, selected, onChange, onQueryChange } = selectProps;
  const { width, height, type, subType, fontWeight, fontSize } = selectProps;
  const { name, isGender, hasId, isSameCodeName: isSame } = selectProps;
  const ref = useRef<HTMLButtonElement>(null);
  const [isClicked, setIsClicked] = useSelect(ref);
  const labelProp = hasId ? 'id' : 'code';
  const labelName = getLabelNameByProp([options, selected], labelProp, isSame);

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

  const handleSelectItem = (option?: string) => {
    if (type && subType && option && onChange) {
      onChange(option, type, subType);
    } else if (option && onQueryChange) {
      onQueryChange(option);
    }
    setIsClicked(false);
  };

  const viewProps = {
    name,
    isClicked,
    isGender,
    labelName,
    width,
    height,
    fontSize,
    fontWeight,
    handleMouseDown,
    ref,
  };

  return (
    <SelectBoxView {...viewProps}>
      {options.map((option) => {
        const isObject = typeof option === 'object';
        const candidateName = isObject ? option.name : option;
        const optionCodeName = isObject ? option.code : option;
        const optionName = isSame ? optionCodeName : candidateName;
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
          handleSelectMenu: () => handleSelectItem(toBeData),
        };

        return <SelectMenuView key={props.optionName} {...props} />;
      })}
    </SelectBoxView>
  );
}

const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(SelectBox);
