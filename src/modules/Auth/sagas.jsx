import { takeLatest, put, call } from 'redux-saga/effects';
import {
  postLoginRequest,
  postLoginSuccess,
  postLoginFailure,
  postRegisterRequest,
  postRegisterSuccess,
  postRegisterFailure,
} from './actions';
import * as api from '../api';

import { getCardRequest } from '../Profile/actions';
import { getAddressListRequest } from '../Route/actions';

export function* authWatcher() {
  yield takeLatest(postLoginRequest, loginFlow);
  yield takeLatest(postRegisterRequest, registerFlow);
}

export function* loginFlow(action) {
  try {
    const result = yield call(api.loginAuth, action.payload);
    if (result.success) {
      yield put(postLoginSuccess(result));
      yield put(getCardRequest(result.token));
      yield put(getAddressListRequest());
    } else {
      yield put(postLoginFailure(result));
    }
  } catch (error) {
    yield put(postLoginFailure(error));
  }
}

export function* registerFlow(action) {
  try {
    const result = yield call(api.registerAuth, action.payload);
    if (result.success) {
      yield put(postRegisterSuccess(result));
      yield put(getAddressListRequest());
    } else {
      yield put(postRegisterFailure(result));
    }
  } catch (error) {
    yield put(postRegisterFailure(error));
  }
}
