import { initialState } from '../store';
import {
  getRouteRequest,
  getRouteSuccess,
  getRouteFailure,
  getAddressListRequest,
  getAddressListSuccess,
  getAddressListFailure,
  clearRoute,
} from './actions';

export const routeReducer = (state = initialState.route, action) => {
  switch (action.type) {
    case getRouteRequest.toString():
    case getAddressListRequest.toString():
      return { ...state, isLoading: true };
    case getRouteSuccess.toString():
      return {
        ...state,
        isOrdered: true,
        coords: action.payload,
        error: '',
        isLoading: false,
      };
    case getRouteFailure.toString():
      return {
        ...state,
        isOrdered: false,
        coords: [],
        error: action.payload,
        isLoading: false,
      };
    case getAddressListSuccess.toString():
      return { ...state, ...action.payload, error: '' };
    case getAddressListFailure.toString():
      return { ...state, error: action.payload };
    case clearRoute.toString():
      return { ...state, isOrdered: false, coords: [] };
    default:
      return state;
  }
};
