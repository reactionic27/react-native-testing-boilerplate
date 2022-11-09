import * as React from 'react';
import AppNavigator from '../src/navigations/Navigator';
import {renderWithProviders} from '../test-utils';

test('renders App correctly', async () => {
  const container = renderWithProviders(<AppNavigator />);
  expect(container).toMatchSnapshot();
});
