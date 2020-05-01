import { fork } from 'redux-saga/effects';

import { authWatcher } from './Auth/sagas';
import { cardWatcher } from './Profile/sagas';
import { routeWatcher } from './Route/sagas';

export function* rootSaga() {
  yield fork(authWatcher);
  yield fork(cardWatcher);
  yield fork(routeWatcher);
}
