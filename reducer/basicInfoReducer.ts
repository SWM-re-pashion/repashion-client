import { BasicUserInfo } from 'types';

type ActionProps = {
  type: string;
  payload: string;
};

const initialState: BasicUserInfo = {
  gender: '',
  bodyForm: '',
  topSize: [],
  bottomSize: [],
};

const updateSizeInfo = (size: string[], value: string) =>
  size.find((x) => x === value) === undefined
    ? [...size, value]
    : size.filter((x) => x !== value);

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
        topSize: updateSizeInfo(topSize, payload),
      };
    case 'BOTTOM_SIZE':
      return {
        ...state,
        bottomSize: updateSizeInfo(bottomSize, payload),
      };
    default:
      throw new Error();
  }
}

export { initialState, basicInfoReducer };
