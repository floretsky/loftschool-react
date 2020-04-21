import {
  postCardRequest,
  postCardSuccess,
  postCardFailure,
  getCardRequest,
  getCardSuccess,
  getCardFailure,
} from './actions';

export const profileMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case postCardRequest.toString():
      fetch('https://loft-taxi.glitch.me/card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload),
      })
        .then((response) => response.json())
        .then((response) => {
          response.success
            ? store.dispatch(postCardSuccess(response))
            : store.dispatch(postCardFailure(response));
        })
        .catch((error) => {
          store.dispatch(postCardFailure(error));
        });
      break;
    case getCardRequest.toString():
      fetch(`https://loft-taxi.glitch.me/card?token=${action.payload}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((response) => {
          store.dispatch(getCardSuccess(response));
        })
        .catch((error) => {
          store.dispatch(getCardFailure(error));
        });
      break;
    default:
      break;
  }
  return next(action);
};
