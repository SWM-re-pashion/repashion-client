import { DefaultData } from '#types/index';

export const getLabelNameByProp = (
  [options, selected]: [(string | DefaultData)[], string | number],
  prop?: keyof DefaultData,
  isSameCodeName?: boolean,
) => {
  let labelName = '선택';
  options.forEach((option) => {
    if (typeof option !== 'string' && prop) {
      const isSameLabel = option[prop]?.toString() === selected;
      if (isSameLabel && isSameCodeName) labelName = option.code;
      else if (isSameLabel) labelName = option.name;
    }
    if (option === selected) labelName = option;
  });
  return labelName;
};
