import React, { useEffect, useState } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { APP_VERSION } from '../../constants/constants';
import { styles } from './Settings.style';
import { NAVIGATION } from '../../constants';
import { Avatar } from 'react-native-paper';
import { connect, useSelector } from 'react-redux';
import { authActions } from '../Auth/Auth.action';
import { bindActionCreators } from '@reduxjs/toolkit';

const ActionCards = ({ title, onPress }) => {
    return (
        <Pressable style={styles.cardItem} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
};

const Settings = (props) => {

    const dashboardState = useSelector(state => state.dashboard);
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        setUserDetails(dashboardState?.userProfileData?.data);
    }, [dashboardState?.userProfileData?.data]);

    const handleProfile = () => {
        props.navigation.navigate(NAVIGATION.myprofile);
    };

    const handleOffers = () => {
        props.navigation.navigate(NAVIGATION.offers);
    };

    const handleRelationshipManager = () => {
        props.navigation.navigate(NAVIGATION.contactUs);
    };

    const handleHelpSupport = () => {
        props.navigation.navigate(NAVIGATION.support);
    };

    const onSignOut = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    let { actions } = props;
                    actions.logoutSuccess();
                    props.navigation.replace(NAVIGATION.authNav, { to: NAVIGATION.login });
                },
            },
        ]);

    };

    return (
        <SafeAreaView style={[styles.container]}>
            <ScrollView style={[styles.scrollContainer]}>
                <View style={styles.screenContainer}>
                    <View style={styles.userInfo}>
                        <Avatar.Icon size={80} icon="account-outline" color="#30C6EA" />
                        <Text style={styles.userName}>{userDetails?.contact?.firstName} {userDetails?.contact?.lastName}</Text>
                        <Text style={styles.userEmail}>{userDetails?.contact?.email}</Text>
                    </View>
                    <ActionCards title="My Profile" onPress={handleProfile} />
                    <ActionCards title="Offers" onPress={handleOffers} />
                    <ActionCards title="Relationship Manager" onPress={handleRelationshipManager} />
                    <ActionCards title="Help & Support" onPress={handleHelpSupport} />
                    <ActionCards title="Logout" onPress={onSignOut} />
                </View>
                <Text style={styles.versionText}>VERSION: {APP_VERSION}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const mapStateToProps = state => ({
  userProfile: state.auth.userProfile,
});

const ActionCreators = Object.assign(
  {},
  {
    logoutSuccess: authActions.logoutSuccess,
  },
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
