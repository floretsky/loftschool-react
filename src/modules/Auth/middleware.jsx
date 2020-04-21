import {
  postLoginRequest,
  postLoginSuccess,
  postLoginFailure,
  postRegisterRequest,
  postRegisterSuccess,
  postRegisterFailure,
} from './actions';
import { setItems, removeItems } from '../../services/LocalStorage';

export const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case postLoginRequest.toString():
      fetch('https://loft-taxi.glitch.me/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            store.dispatch(postLoginSuccess(response));
            setItems('user', {
              email: action.payload.email,
              password: action.payload.password,
              token: response.token,
            });
          } else {
            store.dispatch(postLoginFailure(response));
            removeItems('user');
          }
        })
        .catch((error) => {
          store.dispatch(postLoginFailure(error));
          removeItems('user');
        });
      break;
    case postRegisterRequest.toString():
      fetch('https://loft-taxi.glitch.me/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(action);
          if (response.success) {
            store.dispatch(postRegisterSuccess(response));
            setItems('user', {
              email: action.payload.email,
              password: action.payload.password,
              name: action.payload.name,
              surname: action.payload.surname,
              token: response.token,
            });
          } else {
            store.dispatch(postRegisterFailure(response));
            removeItems('user');
          }
        })
        .catch((error) => {
          store.dispatch(postRegisterFailure(error));
          removeItems('user');
        });
      break;
    default:
      break;
  }
  return next(action);
};
