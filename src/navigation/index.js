/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './DrawerNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from '../screens/Auth/Auth.Navigator';
import { NAVIGATION } from '../constants';
import { isUserLoggedIn } from '../util/helpers';
//import { NotificationNavigator } from '../screens/Notification/Notification.Navigator';

const Stack = createNativeStackNavigator();

export function RootNavigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isUserLoggedIn() ? NAVIGATION.drawerNav : NAVIGATION.authNav}
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
          name={NAVIGATION.drawerNav}
          component={DrawerNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
