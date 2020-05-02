import { createAction } from 'redux-actions';

export const getRouteRequest = createAction('GET_ROUTE_REQUEST');
export const getRouteSuccess = createAction('GET_ROUTE_SUCCESS');
export const getRouteFailure = createAction('GET_ROUTE_FAILURE');

export const getAddressListRequest = createAction('GET_ADDRESS_LIST_REQUEST');
export const getAddressListSuccess = createAction('GET_ADDRESS_LIST_SUCCESS');
export const getAddressListFailure = createAction('GET_ADDRESS_LIST_FAILURE');

export const clearRoute = createAction('CLEAR_ROUTE');
