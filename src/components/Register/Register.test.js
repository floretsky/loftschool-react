import React from 'react';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import Register from './Register';

const mockStore = configureMockStore();
const store = mockStore({
  auth: { isAuthorized: false },
});

describe('Register', () => {
  it('renders without crashing', () => {
    const { queryByText } = render(<Register store={store} />);
    expect(queryByText('Already have an account?')).toBeTruthy();
  });
});
