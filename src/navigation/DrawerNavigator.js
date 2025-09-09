/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ContactUsScreen, DashboardScreen, MenuScreen, MyProfileScreen, OffersScreen, SupportScreen } from '../screens';
import { VisitListNavigator } from '../screens/VisitList/VisitList.Navigator';
import { NAVIGATION } from '../constants';
import BackIcon from 'react-native-vector-icons/AntDesign';
import { AuthNavigator } from '../screens/Auth/Auth.Navigator';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import GlobalStyle from '../style/globalstyle';
import { IconButton } from 'react-native-paper';
import { DashboardNavigator } from '../screens/Dashboard/Dashboard.Navigator';

const Drawer = createDrawerNavigator();

export function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="DashboardNavigator"
      drawerContent={props => <MenuScreen {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: false,
        drawerPosition: 'left',
        title: '',
        // drawerStyle: { width: '70%' },
        headerShadowVisible: false,
        drawerStyle: {

          width: Dimensions.get('screen').width - 80,
        },
      })}>
      <Drawer.Screen name="DashboardNavigator" component={DashboardNavigator} />

      <Drawer.Screen
        name={NAVIGATION.visits}
        component={VisitListNavigator}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitleAlign: 'center',
          headerBackVisible: false,

        })}
      />

      <Drawer.Screen
        name={NAVIGATION.myprofile}
        component={MyProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => {
            return (
              <View style={styles.backIcon}>
                {/* <IconButton
                  icon={() => <BackIcon
                    name="arrowleft"
                    size={28}
                    color="#000"

                  />}

                  size={20}
                  onPress={() => navigation.goBack()}
                /> */}
                <IconButton
                  icon={() => <BackIcon
                    name="arrowleft"
                    size={28}
                    color="#000"

                  />}

                  size={20}
                  onPress={() => navigation.goBack()}
                />
              </View>
            );
          },
          headerTitle: props => {
            return (
              <Text style={styles.navigatorText}>My Profile</Text>
            );
          },
        })}
      />
      <Drawer.Screen
        name={NAVIGATION.offers}
        component={OffersScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => {
            return (
              <View style={styles.backIcon}>
                <IconButton
                  icon={() => <BackIcon
                    name="arrowleft"
                    size={28}
                    color="#000"

                  />}

                  size={20}
                  onPress={() => navigation.goBack()}
                />
              </View>
            );
          },
          headerTitle: props => {
            return (
              <Text style={styles.navigatorText}>Offers</Text>
            );
          },
        })}
      />
      <Drawer.Screen
        name={NAVIGATION.contactUs}
        component={ContactUsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => {
            return (
              <View style={styles.backIcon}>
                <IconButton
                  icon={() => <BackIcon
                    name="arrowleft"
                    size={28}
                    color="#000"

                  />}

                  size={20}
                  onPress={() => navigation.goBack()}
                />
              </View>
            );
          },
          headerTitle: props => {
            return (
              <Text style={styles.navigatorText}>Relationship Manager</Text>
            );
          },
        })}
      />
      <Drawer.Screen
        name={NAVIGATION.support}
        component={SupportScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => {
            return (
              <View style={styles.backIcon}>
                <IconButton
                  icon={() => <BackIcon
                    name="arrowleft"
                    size={28}
                    color="#000"

                  />}

                  size={20}
                  onPress={() => navigation.goBack()}
                />
              </View>
            );
          },
          headerTitle: props => {
            return (
              <Text style={styles.navigatorText}>Support</Text>
            );
          },
        })}
      />
    </Drawer.Navigator>
  );
}

export const styles = StyleSheet.create({
  navigatorText: {
    color: '#000',
    fontSize: 18,
    fontFamily: GlobalStyle.fontSet.Poppins600,
  },
  backIcon: { marginLeft: 15, },
});
