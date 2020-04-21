import React from 'react';
import ReactDOM from 'react-dom';
import { Auth } from './Auth';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const store = mockStore({
  auth: { isAuthorized: false },
});

describe('Auth', () => {
  const component = (
    <Provider store={store}>
      <Auth />
    </Provider>
  );

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(component, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
