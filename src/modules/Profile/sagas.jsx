import { takeLatest, put, call } from 'redux-saga/effects';
import {
  postCardRequest,
  postCardSuccess,
  postCardFailure,
  getCardRequest,
  getCardSuccess,
  getCardFailure,
} from './actions';
import * as api from '../api';

export function* cardWatcher() {
  yield takeLatest(postCardRequest, postCardFlow);
  yield takeLatest(getCardRequest, getCardFlow);
}

export function* postCardFlow(action) {
  try {
    const result = yield call(api.putCard, action.payload);
    if (result.success === true) {
      yield put(postCardSuccess(action.payload));
    } else {
      yield put(postCardFailure(result));
    }
  } catch (error) {
    yield put(postCardFailure(error));
  }
}

export function* getCardFlow(action) {
  try {
    const result = yield call(api.getCard, action.payload);
    if (result.success !== false) {
      yield put(getCardSuccess(result));
    } else {
      yield put(getCardFailure(result));
    }
  } catch (error) {
    yield put(getCardFailure(error));
  }
}
