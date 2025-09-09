/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '../../constants';
import { Platform } from 'react-native';
import BackIcon from 'react-native-vector-icons/AntDesign';
import { LoginScreen, RegisterScreen, VerifyOTPScreen, Introduction } from '../index';
import { isAppInstalled } from '../../util/helpers';

const Stack = createNativeStackNavigator();
export function AuthNavigator(props) {

  return (
    <Stack.Navigator
      initialRouteName={isAppInstalled() ? NAVIGATION.login : NAVIGATION.intro}
      screenOptions={({ route, navigation }) => ({
        headerTransparent: Platform.OS === 'ios' ? true : false,
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name={NAVIGATION.intro}
        component={Introduction}
        options={({ navigation }) => ({
          headerShown: false,
          title: ""
        })}
      />
      <Stack.Screen
        name={NAVIGATION.login}
        component={LoginScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: props => {

            return (
              !isAppInstalled() &&
              <BackIcon
                name="arrowleft"
                size={28}
                color="#000"
                onPress={() => navigation.goBack()}
              />
            );
          },
          title: ""
        })}
      />
      <Stack.Screen
        name={NAVIGATION.verifyOTP}
        component={VerifyOTPScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: props => {
            return (
              <BackIcon
                name="arrowleft"
                size={28}
                color="#000"
                onPress={() => navigation.goBack()}
              />
            );
          },
          title: ""
        })}
      />
      <Stack.Screen
        name={NAVIGATION.register}
        component={RegisterScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: props => {
            return (
              <BackIcon
                name="arrowleft"
                size={28}
                color="#000"
                onPress={() => navigation.goBack()}
              />
            );
          },
          title: ""
        })}
      />
    </Stack.Navigator>
  );
}
