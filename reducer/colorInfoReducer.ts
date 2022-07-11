import { ColorUserInfo } from 'types';

type ActionProps = {
  type: string;
  payload: string;
};

const initialState: ColorUserInfo = {
  topColor: [],
  bottomColor: [],
};

const updateSizeInfo = (size: string[], value: string) =>
  size.find((x) => x === value) === undefined
    ? [...size, value]
    : size.filter((x) => x !== value);

function colorInfoReducer(state: ColorUserInfo, action: ActionProps) {
  const { topColor, bottomColor } = state;
  const { type, payload } = action;

  switch (type) {
    case 'TOP_COLOR':
      return {
        ...state,
        topColor: updateSizeInfo(topColor, payload),
      };
    case 'BOTTOM_COLOR':
      return {
        ...state,
        bottomColor: updateSizeInfo(bottomColor, payload),
      };
    default:
      throw new Error();
  }
}

export { initialState, colorInfoReducer };
