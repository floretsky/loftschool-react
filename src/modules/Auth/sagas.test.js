import { loginFlow, registerFlow } from './sagas';
import { recordSaga } from '../../helpers/testUtils';
import {
  postLoginSuccess,
  postLoginFailure,
  postRegisterFailure,
  postRegisterSuccess,
} from './actions';
import { getCardRequest } from '../Profile/actions';
import { getAddressListRequest } from '../Route/actions';

import * as api from '../api';

describe('authSagas', () => {
  describe('loginSaga', () => {
    it('logins user properly', async () => {
      api.loginAuth = jest.fn().mockImplementation(() => ({ success: true }));
      const initialAction = {
        payload: { email: 'test@test.test', password: 'test' },
      };
      const dispatched = await recordSaga(loginFlow, initialAction);

      expect(dispatched).toContainEqual(postLoginSuccess({ success: true }));
      expect(dispatched).toContainEqual(getCardRequest());
      expect(dispatched).toContainEqual(getAddressListRequest());
      expect(api.loginAuth).toHaveBeenCalledWith({
        email: 'test@test.test',
        password: 'test',
      });
    });

    it('fails login properly', async () => {
      api.loginAuth = jest.fn().mockImplementation(() => 'error');
      const initialAction = {
        payload: { email: 'test@test.test', password: 'test' },
      };
      const dispatched = await recordSaga(loginFlow, initialAction);

      expect(dispatched).toContainEqual(postLoginFailure('error'));
      expect(api.loginAuth).toHaveBeenCalledWith({
        email: 'test@test.test',
        password: 'test',
      });
    });
  });

  describe('registerSaga', () => {
    it('registers user properly', async () => {
      api.registerAuth = jest
        .fn()
        .mockImplementation(() => ({ success: true }));
      const initialAction = {
        payload: {
          name: 'name',
          surname: 'surname',
          email: 'test@test.test',
          password: 'test',
        },
      };
      const dispatched = await recordSaga(registerFlow, initialAction);

      expect(dispatched).toContainEqual(postRegisterSuccess({ success: true }));
      expect(dispatched).toContainEqual(getAddressListRequest());
      expect(api.registerAuth).toHaveBeenCalledWith({
        name: 'name',
        surname: 'surname',
        email: 'test@test.test',
        password: 'test',
      });
    });

    it('fails register properly', async () => {
      api.registerAuth = jest.fn().mockImplementation(() => 'error');
      const initialAction = {
        payload: {
          email: 'test@test.test',
          password: 'test',
        },
      };
      const dispatched = await recordSaga(registerFlow, initialAction);

      expect(dispatched).toContainEqual(postRegisterFailure('error'));
      expect(api.registerAuth).toHaveBeenCalledWith({
        email: 'test@test.test',
        password: 'test',
      });
    });
  });
});
