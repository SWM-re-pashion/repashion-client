import { ActionProps, BasicUserInfo } from 'types';
import { updateInfo } from 'utils';

const initialState: BasicUserInfo = {
  gender: '',
  bodyForm: '',
  topSize: [],
  bottomSize: [],
};

function basicInfoReducer(state: BasicUserInfo, action: ActionProps) {
  const { topSize, bottomSize } = state;
  const { type, payload } = action;

  switch (type) {
    case 'GENDER':
      return { ...state, gender: payload };
    case 'BODY_FORM':
      return { ...state, bodyForm: payload };
    case 'TOP_SIZE':
      return {
        ...state,
        topSize: updateInfo<string>(topSize, payload),
      };
    case 'BOTTOM_SIZE':
      return {
        ...state,
        bottomSize: updateInfo<string>(bottomSize, payload),
      };
    default:
      throw new Error();
  }
}

export { initialState, basicInfoReducer };
