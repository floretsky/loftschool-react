import { profileReducer } from './reducer';

describe('Profile Reducer', () => {
  it('postCardRequest', () => {
    let result = profileReducer({}, { type: 'POST_CARD_REQUEST' });
    expect(result.isLoading).toBe(true);
    expect(result.error === '').toBe(true);
  });
  it('postCardSuccess', () => {
    let result = profileReducer({}, { type: 'POST_CARD_SUCCESS' });
    expect(result.isLoading).toBe(false);
    expect(result.hasCard).toBe(true);
    expect(result.error === '').toBe(true);
  });
  it('postCardFailure', () => {
    let result = profileReducer(
      {},
      { type: 'POST_CARD_FAILURE', payload: { success: false, error: 'error' } }
    );
    expect(result.isLoading).toBe(false);
    expect(result.hasCard).toBe(false);
    expect(result.error !== '').toBe(true);
  });
  it('getCardRequest', () => {
    let result = profileReducer({}, { type: 'GET_CARD_REQUEST' });
    expect(result.isLoading).toBe(true);
    expect(result.error === '').toBe(true);
  });
  it('getCardSuccess', () => {
    let result = profileReducer(
      {},
      {
        type: 'GET_CARD_SUCCESS',
        payload: {
          cardNumber: 1234123412341234,
          expiryDate: '09/21',
          cardName: 'Anton Floretsky',
          cvc: '123',
          error: '',
        },
      }
    );
    expect(result.isLoading).toBe(false);
    expect(result.hasCard).toBe(true);
    expect(result.error === '').toBe(true);
    expect(result.cardNumber !== '').toBe(true);
    expect(result.expiryDate !== '').toBe(true);
    expect(result.cardName !== '').toBe(true);
    expect(result.cvc !== '').toBe(true);
  });
  it('getCardFailure', () => {
    let result = profileReducer(
      {},
      { type: 'GET_CARD_FAILURE', payload: { success: false, error: 'error' } }
    );
    expect(result.isLoading).toBe(false);
    expect(result.hasCard).toBe(false);
    expect(result.error !== '').toBe(true);
  });
});
