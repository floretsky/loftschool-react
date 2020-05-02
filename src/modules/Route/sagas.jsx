import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getRouteRequest,
  getRouteSuccess,
  getRouteFailure,
  getAddressListRequest,
  getAddressListSuccess,
  getAddressListFailure,
} from './actions';
import * as api from '../api';

export function* routeWatcher() {
  yield takeLatest(getRouteRequest, routeFlow);
  yield takeLatest(getAddressListRequest, addressListFlow);
}

export function* routeFlow(action) {
  try {
    const result = yield call(api.getRoute, action.payload);
    if (result) {
      yield put(getRouteSuccess(result));
    } else {
      yield put(getRouteFailure(result));
    }
  } catch (error) {
    yield put(getRouteFailure(error));
  }
}

export function* addressListFlow(action) {
  try {
    const result = yield call(api.getAddressList);
    if (result) {
      yield put(getAddressListSuccess(result));
    } else {
      yield put(getAddressListFailure(result));
    }
  } catch (error) {
    yield put(getAddressListFailure(error));
  }
}
