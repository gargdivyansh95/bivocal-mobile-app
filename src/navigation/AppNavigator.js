/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TAB_HOME from '../assets/images/tabHome.png';
import TAB_INVENTORY from '../assets/images/tabInventory.png';
import TAB_VISITS from '../assets/images/tabInventory.png';
import TAB_SETTINGS from '../assets/images/tabSettings.png';
import GlobalStyle from '../style/globalstyle';
import { TabNavigatorIcons } from '../components';
import { NAVIGATION } from '../constants';
import { DashboardNavigator } from '../screens/Dashboard/Dashboard.Navigator';
import { VisitListNavigator } from '../screens/VisitList/VisitList.Navigator';
import { SettingsNavigator } from '../screens/Settings/Settings.Navigator';
import { InventoryNavigator } from '../screens/Inventory/Inventory.Navigator';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 75,
          borderTopWidth: 0.6,
          paddingTop: 5,
          elevation: 2,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 1,
        },
        tabBarShowLabel: true,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color }) => {
          var iconName;
          if (route.name === NAVIGATION.tabHome) {
            iconName = TAB_HOME;
          } else if (route.name === NAVIGATION.tabInventory) {
            iconName = TAB_INVENTORY;
          } else if (route.name === NAVIGATION.tabVisits) {
            iconName = TAB_VISITS;
          } else if (route.name === NAVIGATION.tabSettings) {
            iconName = TAB_SETTINGS;
          }
          return (
            <TabNavigatorIcons tintColor={{ tintColor: color }} source={iconName} />
          );
        },
        tabBarActiveTintColor: '#2668E0',
        tabBarInactiveTintColor: '#000000',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: GlobalStyle.fontSet.Poppins500,
          marginBottom: 10,
        },
      })}>
      <Tab.Screen
        name={NAVIGATION.tabHome}
        component={DashboardNavigator}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name={NAVIGATION.tabInventory}
        component={InventoryNavigator}
        options={{
          title: 'Inventory',
        }}
      />
      <Tab.Screen
        name={NAVIGATION.tabVisits}
        component={VisitListNavigator}
        options={{
          title: 'Visits',
        }}
      />
      <Tab.Screen
        name={NAVIGATION.tabSettings}
        component={SettingsNavigator}
        options={{
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}
