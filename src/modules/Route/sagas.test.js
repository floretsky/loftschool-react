import { routeFlow, addressListFlow } from './sagas';
import { recordSaga } from '../../helpers/testUtils';
import {
  getRouteSuccess,
  getRouteFailure,
  getAddressListSuccess,
  getAddressListFailure,
} from './actions';

import * as api from '../api';

describe('routeSagas', () => {
  describe('routeSaga', () => {
    it('gets route properly', async () => {
      api.getRoute = jest.fn().mockImplementation(() => ({ route: 'route' }));

      const initialAction = {
        payload: { from: 'routeFrom', to: 'routeTo' },
      };

      const dispatched = await recordSaga(routeFlow, initialAction);

      expect(dispatched).toContainEqual(getRouteSuccess({ route: 'route' }));
      expect(api.getRoute).toHaveBeenCalledWith({
        from: 'routeFrom',
        to: 'routeTo',
      });
    });

    it('fails to get route properly', async () => {
      api.getRoute = jest.fn().mockImplementation(() => {
        throw new Error('server error');
      });

      const initialAction = {
        payload: { from: 'routeFrom', to: 'routeTo' },
      };

      const dispatched = await recordSaga(routeFlow, initialAction);

      expect(dispatched).toContainEqual(
        getRouteFailure(new Error('server error'))
      );

      expect(api.getRoute).toHaveBeenCalledWith({
        from: 'routeFrom',
        to: 'routeTo',
      });
    });
  });
  describe('addressListSaga', () => {
    it('gets addresses list properly', async () => {
      api.getAddressList = jest
        .fn()
        .mockImplementation(() => ({ addresses: 'addresses' }));

      const dispatched = await recordSaga(addressListFlow);

      expect(dispatched).toContainEqual(
        getAddressListSuccess({ addresses: 'addresses' })
      );

      expect(api.getAddressList).toHaveBeenCalled();
    });

    it('fails to get addresses list properly', async () => {
      api.getAddressList = jest.fn().mockImplementation(() => {
        throw new Error('server error');
      });

      const dispatched = await recordSaga(addressListFlow);

      expect(dispatched).toContainEqual(
        getAddressListFailure(new Error('server error'))
      );

      expect(api.getAddressList).toHaveBeenCalled();
    });
  });
});
