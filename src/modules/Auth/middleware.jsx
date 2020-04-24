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
      const authUrl = 'https://loft-taxi.glitch.me/auth';
      fetch(authUrl, {
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
      const registerUrl = 'https://loft-taxi.glitch.me/register';
      fetch(registerUrl, {
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
