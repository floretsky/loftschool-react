import { createAction } from 'redux-actions';

export const postLoginRequest = createAction('POST_LOGIN_REQUEST');
export const postLoginSuccess = createAction('POST_LOGIN_SUCCESS');
export const postLoginFailure = createAction('POST_LOGIN_FAILURE');

export const postRegisterRequest = createAction('POST_REGISTER_REQUEST');
export const postRegisterSuccess = createAction('POST_REGISTER_SUCCESS');
export const postRegisterFailure = createAction('POST_REGISTER_FAILURE');

export const postLogOut = createAction('POST_LOGOUT');
