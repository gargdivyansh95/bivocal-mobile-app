/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '../../constants';
import { Image, StyleSheet, Text } from 'react-native';
import { Platform } from 'react-native';
import { AddInventoryScreen, InventoryScreen } from '../index';
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
            <Stack.Screen
                name={NAVIGATION.addInventory}
                component={AddInventoryScreen}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerLeft: props => {
                        return (
                            <IconButton style={{ backgroundColor: '#f7f7f7' }}
                                icon={() => <BackIcon
                                    name="chevron-thin-left"
                                    size={18}
                                    color="#000"
                                />}
                                size={24}
                                onPress={() => navigation.goBack()}
                            />
                        );
                    },
                    headerTitle: props => {
                        return (
                            <Text style={styles.navigatorText}>Add New Inventory</Text>
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
