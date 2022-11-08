import React from 'react';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';

import {persistor, store} from './redux/store';
import AppNavigator from './navigations/Navigator';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <PaperProvider>
            <AppNavigator />
          </PaperProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
