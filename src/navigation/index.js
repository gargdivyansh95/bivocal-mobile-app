import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from '../screens/Auth/Auth.Navigator';
import { isUserLoggedIn } from '../util/helpers';
import AppNavigator from './AppNavigator';

export function RootNavigator(props) {
  return (
    <NavigationContainer>
      {
        isUserLoggedIn() ? (
          <AppNavigator />
        ) : (
          <AuthNavigator />
        )
      }
    </NavigationContainer>
  );
}
