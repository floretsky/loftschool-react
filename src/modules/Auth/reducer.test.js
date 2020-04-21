import { authReducer } from './reducer';

describe('Auth Reducer', () => {
  it('postLoginRequest', () => {
    let result = authReducer({}, { type: 'POST_LOGIN_REQUEST' });
    expect(result.isLoading).toBe(true);
    expect(result.error === '').toBe(true);
  });
  it('postRegisterRequest', () => {
    let result = authReducer({}, { type: 'POST_REGISTER_REQUEST' });
    expect(result.isLoading).toBe(true);
    expect(result.error === '').toBe(true);
  });
  it('postLoginSuccess', () => {
    let result = authReducer(
      {},
      { type: 'POST_LOGIN_SUCCESS', payload: { success: true, token: '123' } }
    );
    expect(result.isLoading).toBe(false);
    expect(result.isAuthorized).toBe(true);
    expect(result.token !== '').toBe(true);
    expect(result.error === '').toBe(true);
  });
  it('postRegisterSuccess', () => {
    let result = authReducer(
      {},
      {
        type: 'POST_REGISTER_SUCCESS',
        payload: { success: true, token: '123' },
      }
    );
    expect(result.isLoading).toBe(false);
    expect(result.isAuthorized).toBe(true);
    expect(result.token !== '').toBe(true);
    expect(result.error === '').toBe(true);
  });
  it('postLoginFailure', () => {
    let result = authReducer(
      {},
      {
        type: 'POST_LOGIN_FAILURE',
        payload: { success: false, error: 'error' },
      }
    );
    expect(result.isLoading).toBe(false);
    expect(result.isAuthorized).toBe(false);
    expect(result.error !== '').toBe(true);
  });
  it('postRegisterFailure', () => {
    let result = authReducer(
      {},
      {
        type: 'POST_REGISTER_FAILURE',
        payload: { success: false, error: 'error' },
      }
    );
    expect(result.isLoading).toBe(false);
    expect(result.isAuthorized).toBe(false);
    expect(result.error !== '').toBe(true);
  });
  it('postLogOut', () => {
    let result = authReducer({}, { type: 'POST_LOGOUT' });
    expect(result.isLoading).toBe(false);
    expect(result.isAuthorized).toBe(false);
    expect(result.error === '').toBe(true);
  });
});
