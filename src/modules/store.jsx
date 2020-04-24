import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import throttle from 'lodash/throttle';

import { saveState, loadState } from '../services/LocalStorage';

import { authReducer as auth } from './Auth/reducer';
import { profileReducer as profile } from './Profile/reducer';

import { authMiddleware } from './Auth/middleware';
import { profileMiddleware } from './Profile/middleware';

export let initialState;

if (typeof loadState() !== 'undefined') {
  initialState = loadState().globalState;
} else {
  initialState = {
    auth: {
      isLoading: false,
      isAuthorized: false,
      error: '',
      token: '',
    },

    profile: {
      isLoading: false,
      hasCard: false,
      cardNumber: '',
      expiryDate: '',
      cardName: '',
      cvc: '',
    },
  };
}

const reducers = combineReducers({
  auth,
  profile,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(authMiddleware),
    applyMiddleware(profileMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (noop) => noop
  )
);

store.subscribe(
  throttle(() => {
    saveState({
      globalState: store.getState(),
    });
  }, 1000)
);

export default store;
