import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from '../screens/Auth/Auth.Navigator';
import { isUserLoggedIn } from '../util/helpers';
import AppNavigator from './AppNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '../constants';

const Stack = createNativeStackNavigator();

export function RootNavigator(props) {
  return (
    <NavigationContainer>
      {/* {
        isUserLoggedIn() ? (
          <AppNavigator />
        ) : (
          <AuthNavigator />
        )
      } */}
      <Stack.Navigator
        initialRouteName={isUserLoggedIn() ? NAVIGATION.appNav : NAVIGATION.authNav}
        screenOptions={({ route, navigation }) => ({
          borderBottomWidth: 1,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerShown: false,
        })}>

        <Stack.Screen
          name={NAVIGATION.authNav}
          component={AuthNavigator}
        />
        <Stack.Screen
          name={NAVIGATION.appNav}
          component={AppNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
