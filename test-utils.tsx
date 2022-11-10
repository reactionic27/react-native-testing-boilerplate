import React, {PropsWithChildren} from 'react';
import {render} from '@testing-library/react-native';
import type {RenderOptions} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {store as toolkitStore} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';

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

/** Render helper that renders `ui` within `NavigationContainer`. */
export function renderWithNavigation(ui: React.ReactElement) {
  return renderWithProviders(<NavigationContainer>{ui}</NavigationContainer>);
}

export const mockedResult = [
  {
    id: 20,
    name: 'Ants in my Eyes Johnson',
    status: 'unknown',
    species: 'Human',
    type: 'Human with ants in his eyes',
    gender: 'Male',
    origin: {
      name: 'unknown',
      url: '',
    },
    location: {
      name: 'Interdimensional Cable',
      url: 'https://rickandmortyapi.com/api/location/6',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/20.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/8'],
    url: 'https://rickandmortyapi.com/api/character/20',
    created: '2017-11-04T22:34:53.659Z',
  },
];

export const mockedInfo = {
  count: 826,
  pages: 42,
  next: 'https://rickandmortyapi.com/api/character?page=2',
  prev: null,
};
