import React, {PropsWithChildren} from 'react';
import {render} from '@testing-library/react-native';
import type {RenderOptions} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {store as toolkitStore} from './src/redux/store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {}

export function renderWithProviders(
  ui: React.ReactElement,
  {...renderOptions}: ExtendedRenderOptions = {},
) {
  function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={toolkitStore}>
        <PaperProvider>{children}</PaperProvider>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return {toolkitStore, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}
