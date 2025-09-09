/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '../../constants';
import { Image, StyleSheet, Text } from 'react-native';
import { Platform } from 'react-native';
import BackIcon from 'react-native-vector-icons/AntDesign';
import { VisitListScreen, FilterScreen } from '../index';
import AppLogo from '../../assets/images/appLogo.png';
import GlobalStyle from '../../style/globalstyle';
import VisitDetails from './VisitDetails.Screen';
import { IconButton } from 'react-native-paper';
// import NotificationDetail from './NotificationDetail.screen';

const Stack = createNativeStackNavigator();
export function VisitListNavigator(props) {

  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerTransparent: Platform.OS === 'ios' ? true : false,
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name={NAVIGATION.visitList}
        component={VisitListScreen}
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
              <Image source={AppLogo} style={GlobalStyle.headerLogo} />
            );
          },
        })}
      />
      <Stack.Screen
        name={NAVIGATION.filter}
        component={FilterScreen}
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
              <Text style={styles.navigatorText}>Filters</Text>
            );
          },
        })}
      />
      <Stack.Screen
        name={NAVIGATION.visitDetail}
        component={VisitDetails}
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

      {/* <Stack.Screen
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
      /> */}
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
