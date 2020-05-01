import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import throttle from 'lodash/throttle';
import createSagaMiddleware from 'redux-saga';

import { saveState, loadState } from '../services/LocalStorage';

import { authReducer as auth } from './Auth/reducer';
import { profileReducer as profile } from './Profile/reducer';
import { routeReducer as route } from './Route/reducer';

import { rootSaga } from './rootSaga';

export const initialState = loadState()
  ? loadState().globalState
  : {
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

      route: {
        addresses: [],
        coords: [],
        isOrdered: false,
      },
    };

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  auth,
  profile,
  route,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(sagaMiddleware),
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

sagaMiddleware.run(rootSaga);

export default store;
