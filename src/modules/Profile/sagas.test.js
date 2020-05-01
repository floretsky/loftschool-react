import { getCardFlow, postCardFlow } from './sagas';
import { recordSaga } from '../../helpers/testUtils';
import {
  getCardSuccess,
  getCardFailure,
  postCardSuccess,
  postCardFailure,
} from './actions';

import * as api from '../api';

describe('profileSagas', () => {
  describe('postCardSaga', () => {
    it('sends card data properly', async () => {
      api.putCard = jest.fn().mockImplementation(() => ({ success: true }));

      const initialAction = {
        payload: { cardData: 'data', token: 'recQC6BvyP9Xjnwsj' },
      };
      const dispatched = await recordSaga(postCardFlow, initialAction);

      expect(dispatched).toContainEqual(
        postCardSuccess({ cardData: 'data', token: 'recQC6BvyP9Xjnwsj' })
      );

      expect(api.putCard).toHaveBeenCalledWith({
        cardData: 'data',
        token: 'recQC6BvyP9Xjnwsj',
      });
    });

    it('fails card data sending properly', async () => {
      api.putCard = jest.fn().mockImplementation(() => ({
        success: false,
      }));

      const initialAction = {
        payload: { cardData: 'data', token: 'recQC6BvyP9Xjnwsj' },
      };
      const dispatched = await recordSaga(postCardFlow, initialAction);

      expect(dispatched).toContainEqual(postCardFailure({ success: false }));
      expect(api.putCard).toHaveBeenCalledWith({
        cardData: 'data',
        token: 'recQC6BvyP9Xjnwsj',
      });
    });
  });

  describe('getCardSaga', () => {
    it('gets card data properly', async () => {
      api.getCard = jest.fn().mockImplementation(() => ({ cardData: 'data' }));

      const initialAction = { payload: { token: 'recQC6BvyP9Xjnwsj' } };
      const dispatched = await recordSaga(getCardFlow, initialAction);

      expect(dispatched).toContainEqual(getCardSuccess({ cardData: 'data' }));
      expect(api.getCard).toHaveBeenCalledWith({ token: 'recQC6BvyP9Xjnwsj' });
    });

    it('fails while getting card properly', async () => {
      api.getCard = jest.fn().mockImplementation(() => ({ success: false }));

      const initialAction = { payload: { token: 'recQC6BvyP9Xjnwsj' } };
      const dispatched = await recordSaga(getCardFlow, initialAction);

      expect(dispatched).toContainEqual(getCardFailure({ success: false }));
      expect(api.getCard).toHaveBeenCalledWith({
        token: 'recQC6BvyP9Xjnwsj',
      });
    });
  });
});
