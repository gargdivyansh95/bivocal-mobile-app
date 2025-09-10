/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '../../constants';
import { Image, StyleSheet, Text } from 'react-native';
import { Platform } from 'react-native';
import HamburgerIcon from 'react-native-vector-icons/Feather';
import { DashboardScreen, InventoryScreen, NeedQueryScreen } from '../index';
import BackIcon from 'react-native-vector-icons/Entypo';
import AppLogo from '../../assets/images/appLogo.png';
import GlobalStyle from '../../style/globalstyle';
import { IconButton } from 'react-native-paper';

const Stack = createNativeStackNavigator();
export function InventoryNavigator(props) {

    return (
        <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
                headerTransparent: Platform.OS === 'ios' ? true : false,
                headerTitleAlign: 'center',
                headerBackVisible: false,
                headerShadowVisible: false,
            })}>
            <Stack.Screen
                name={NAVIGATION.inventory}
                component={InventoryScreen}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerLeft: props => {
                        return (
                            <Text />
                        );
                    },
                    headerTitle: props => {
                        return (
                            <Image source={AppLogo} style={GlobalStyle.headerLogo} />
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
        fontSize: 16,
        fontFamily: GlobalStyle.fontSet.Poppins600,
    },
});
