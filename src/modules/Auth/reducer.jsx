import { initialState } from '../store';
import {
  postLoginRequest,
  postLoginSuccess,
  postLoginFailure,
  postRegisterRequest,
  postRegisterSuccess,
  postRegisterFailure,
  postLogOut,
} from './actions';

export const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case postLoginRequest.toString():
    case postRegisterRequest.toString():
      return { ...state, isLoading: true, error: '' };
    case postLoginSuccess.toString():
    case postRegisterSuccess.toString():
      return {
        ...state,
        isLoading: false,
        isAuthorized: action.payload.success,
        token: action.payload.token,
        error: '',
      };
    case postLoginFailure.toString():
    case postRegisterFailure.toString():
      return {
        ...state,
        isLoading: false,
        isAuthorized: action.payload.success,
        token: '',
        error: action.payload.error,
      };
    case postLogOut.toString():
      return {
        ...state,
        isLoading: false,
        isAuthorized: false,
        token: '',
        error: '',
      };
    default:
      return state;
  }
};
