import * as React from 'react';
import App from '../src/App';
import {render} from '@testing-library/react-native';

test('renders App correctly', async () => {
  render(<App />);
});
