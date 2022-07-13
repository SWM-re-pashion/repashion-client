import { ActionProps, ColorUserInfo } from 'types';
import { updateInfo } from 'utils';

const initialState: ColorUserInfo = {
  topColor: [],
  bottomColor: [],
};

function colorInfoReducer(state: ColorUserInfo, action: ActionProps) {
  const { topColor, bottomColor } = state;
  const { type, payload } = action;

  switch (type) {
    case 'TOP_COLOR':
      return {
        ...state,
        topColor: updateInfo<string>(topColor, payload),
      };
    case 'BOTTOM_COLOR':
      return {
        ...state,
        bottomColor: updateInfo<string>(bottomColor, payload),
      };
    default:
      throw new Error();
  }
}

export { initialState, colorInfoReducer };
