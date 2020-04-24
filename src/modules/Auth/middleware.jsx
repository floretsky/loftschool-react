import { baseUrl } from '../../const/index';

import {
  postLoginRequest,
  postLoginSuccess,
  postLoginFailure,
  postRegisterRequest,
  postRegisterSuccess,
  postRegisterFailure,
} from './actions';

export const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case postLoginRequest.toString():
      fetch(`${baseUrl}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            store.dispatch(postLoginSuccess(response));
          } else {
            store.dispatch(postLoginFailure(response));
          }
        })
        .catch((error) => {
          store.dispatch(postLoginFailure(error));
        });
      break;
    case postRegisterRequest.toString():
      fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(action);
          if (response.success) {
            store.dispatch(postRegisterSuccess(response));
          } else {
            store.dispatch(postRegisterFailure(response));
          }
        })
        .catch((error) => {
          store.dispatch(postRegisterFailure(error));
        });
      break;
    default:
      break;
  }
  return next(action);
};
