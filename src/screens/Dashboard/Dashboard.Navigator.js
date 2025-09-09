/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '../../constants';
import { Image, StyleSheet, Text } from 'react-native';
import { Platform } from 'react-native';
import HamburgerIcon from 'react-native-vector-icons/Feather';
import { DashboardScreen, NeedQueryScreen } from '../index';
import BackIcon from 'react-native-vector-icons/AntDesign';
import AppLogo from '../../assets/images/appLogo.png';
import GlobalStyle from '../../style/globalstyle';
// import NotificationDetail from '../Notification/NotificationDetail.screen';
import { IconButton } from 'react-native-paper';
import NotificationDetail from '../VisitList/NotificationDetail.screen';

const Stack = createNativeStackNavigator();
export function DashboardNavigator(props) {

  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerTransparent: Platform.OS === 'ios' ? true : false,
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name={NAVIGATION.dashboard}
        component={DashboardScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: props => {
            return (
              <HamburgerIcon
                name="menu"
                size={28}
                color="#000"
                onPress={(() => navigation.openDrawer())}
              />
            );
          },
          headerTitle: props => {
            return (
              <Image source={AppLogo} style={GlobalStyle.headerLogo} />
            );
          },
        })}
      />
      <Stack.Screen
        name={NAVIGATION.notificationDetail}
        component={NotificationDetail}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: props => {
            return (
              <IconButton
                icon={() => <BackIcon
                  name="arrowleft"
                  size={28}
                  color="#000"

                />}

                size={20}
                onPress={() => navigation.goBack()}
              />
            );
          },
          headerTitle: props => {
            return (
              <Text style={styles.navigatorText}>Visit Details</Text>
            );
          },
        })}
      />
      <Stack.Screen
        name={NAVIGATION.needQuery}
        component={NeedQueryScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: props => {
            return (
              <IconButton
                icon={() => <BackIcon
                  name="arrowleft"
                  size={28}
                  color="#000"

                />}

                size={20}
                onPress={() => navigation.goBack()}
              />
            );
          },
          headerTitle: props => {
            return (
              <Text style={styles.navigatorText}>Refer & Earn</Text>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
}

export const styles = StyleSheet.create({
  navigatorText: {
    color: '#000',
    fontSize: 20,
    fontFamily: GlobalStyle.fontSet.Poppins600,
  },
});
