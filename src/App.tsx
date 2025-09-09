/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { PortalProvider } from '@gorhom/portal';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            {/* <BottomSheetModalProvider>
              <PortalProvider> */}
                {/* <RootNavigator />
                <RemotePushController /> */}
                <View>
        <Text>sbcsbcsbcbchsbchsbchsbchb</Text>
      </View>
                <Toast />
              {/* </PortalProvider>
            </BottomSheetModalProvider> */}
          </PaperProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
