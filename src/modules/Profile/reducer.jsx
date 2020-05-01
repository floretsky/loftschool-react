import { initialState } from '../store';
import {
  postCardRequest,
  postCardSuccess,
  postCardFailure,
  getCardRequest,
  getCardSuccess,
  getCardFailure,
  clearCard,
} from './actions';

export const profileReducer = (state = initialState.profile, action) => {
  switch (action.type) {
    case getCardRequest.toString():
    case postCardRequest.toString():
      return { ...state, isLoading: true, error: '' };
    case getCardSuccess.toString():
    case postCardSuccess.toString():
      return {
        ...state,
        isLoading: false,
        hasCard: true,
        cardNumber: action.payload ? action.payload.cardNumber : '',
        expiryDate: action.payload ? action.payload.expiryDate : '',
        cardName: action.payload ? action.payload.cardName : '',
        cvc: action.payload ? action.payload.cvc : '',
        error: '',
      };
    case getCardFailure.toString():
    case postCardFailure.toString():
      return {
        ...state,
        isLoading: false,
        hasCard: false,
        error: action.payload.error,
      };
    case clearCard.toString():
      return {
        isLoading: false,
        hasCard: false,
        error: '',
      };
    default:
      return state;
  }
};
