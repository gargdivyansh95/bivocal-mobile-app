/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import RemotePushController from './services/RemotePushController';
import { RootNavigator } from './navigation';
import VersionFind from './util/VersionFind';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';

const App = () => {

  useEffect(() => {
    // VersionFind();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <BottomSheetModalProvider>
              <PortalProvider>
                <RootNavigator />
                <RemotePushController />
                <Toast />
              </PortalProvider>
            </BottomSheetModalProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
