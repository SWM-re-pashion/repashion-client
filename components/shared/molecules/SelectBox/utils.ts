import { DefaultData } from '#types/index';

export const getLabelNameByProp = (
  options: (string | DefaultData)[],
  selected: string | number,
  prop?: keyof DefaultData,
) => {
  let labelName = '선택';
  options.forEach((option) => {
    if (typeof option !== 'string' && prop) {
      if (option[prop]?.toString() === selected) labelName = option.name;
    }
    if (option === selected) labelName = option;
  });
  return labelName;
};
