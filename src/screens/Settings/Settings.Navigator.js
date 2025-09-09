/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '../../constants';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Platform } from 'react-native';
import { ContactUsScreen, MyProfileScreen, OffersScreen, SettingsScreen, SupportScreen } from '../index';
import BackIcon from 'react-native-vector-icons/Entypo';
import AppLogo from '../../assets/images/appLogo.png';
import GlobalStyle from '../../style/globalstyle';
import { IconButton } from 'react-native-paper';
import NotificationDetail from '../VisitList/NotificationDetail.screen';

const Stack = createNativeStackNavigator();
export function SettingsNavigator(props) {

    return (
        <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
                headerTransparent: Platform.OS === 'ios' ? true : false,
                headerTitleAlign: 'center',
                headerBackVisible: false,
                headerShadowVisible: false,
            })}>
            <Stack.Screen
                name={NAVIGATION.settings}
                component={SettingsScreen}
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
                name={NAVIGATION.myprofile}
                component={MyProfileScreen}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                    headerLeft: props => {
                        return (
                            <View style={styles.backIcon}>
                                <IconButton style={{backgroundColor: '#f7f7f7'}}
                                    icon={() => <BackIcon
                                        name="chevron-thin-left"
                                        size={18}
                                        color="#000"

                                    />}
                                    size={24}
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
            <Stack.Screen
                name={NAVIGATION.offers}
                component={OffersScreen}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                    headerLeft: props => {
                        return (
                            <View style={styles.backIcon}>
                                <IconButton style={{backgroundColor: '#f7f7f7'}}
                                    icon={() => <BackIcon
                                        name="chevron-thin-left"
                                        size={18}
                                        color="#000"

                                    />}
                                    size={24}
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
            <Stack.Screen
                name={NAVIGATION.contactUs}
                component={ContactUsScreen}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                    headerLeft: props => {
                        return (
                            <View style={styles.backIcon}>
                                <IconButton style={{backgroundColor: '#f7f7f7'}}
                                    icon={() => <BackIcon
                                        name="chevron-thin-left"
                                        size={18}
                                        color="#000"

                                    />}
                                    size={24}
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
            <Stack.Screen
                name={NAVIGATION.support}
                component={SupportScreen}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                    headerLeft: props => {
                        return (
                            <View style={styles.backIcon}>
                                <IconButton style={{backgroundColor: '#f7f7f7'}}
                                    icon={() => <BackIcon
                                        name="chevron-thin-left"
                                        size={18}
                                        color="#000"

                                    />}
                                    size={24}
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
