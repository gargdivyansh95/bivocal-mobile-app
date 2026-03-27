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
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PaperProvider>
                <PortalProvider>
                  <BottomSheetModalProvider>
                    <RootNavigator />
                    <RemotePushController />
                  </BottomSheetModalProvider>
                  <Toast />
                </PortalProvider>
              </PaperProvider>
            </PersistGate>
          </Provider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>

  );
};

export default App;
