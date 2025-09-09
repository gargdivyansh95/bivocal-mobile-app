/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Pressable, Alert } from 'react-native';
import { View, ScrollView } from 'react-native';
import NavigationBar from './components/navigationBar';
import { MenuItem } from './components';
import { NAVIGATION } from '../../constants';
import { Avatar } from 'react-native-paper';
import { styles } from './Menu.style';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { authActions } from '../Auth/Auth.action';
import { APP_VERSION } from '../../constants/constants';

function Menu(props) {

  const menuData = [
    {
      id: '0',
      name: 'Visits',
    },
    {
      id: '1',
      name: 'My Profile',
    },
    {
      id: '2',
      name: 'Offers',
    },
    {
      id: '3',
      name: 'Relationship Manager',
    },
    {
      id: '4',
      name: 'Help & Support',
    },

  ];

  const dashboardState = useSelector(state => state.dashboard);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    // console.log("UserProfile: ", props.userProfile)
    setUserDetails(dashboardState?.userProfileData?.data);
  }, [dashboardState?.userProfileData?.data]);

  const handleMenu = (title) => {
    if (title === 'Visits') {
      props.navigation.navigate(NAVIGATION.visits);
    } else if (title === 'My Profile') {
      props.navigation.navigate(NAVIGATION.myprofile);
    } else if (title === 'Offers') {
      props.navigation.navigate(NAVIGATION.offers);
    } else if (title === 'Relationship Manager') {
      props.navigation.navigate(NAVIGATION.contactUs);
    } else if (title === 'Help & Support') {
      props.navigation.navigate(NAVIGATION.support);
    } else if (title === 'Refer & Earn') {
      alert('Coming Soon');
    }
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
          props.navigation.closeDrawer()
          let { actions } = props;
          actions.logoutSuccess();
          props.navigation.replace(NAVIGATION.authNav, { to: NAVIGATION.login });
        }
      },
    ]);

  };

  return (
    <SafeAreaView style={styles.menuWrapper}>
      <ScrollView style={styles.menuContainer}>
        <NavigationBar onClose={() => props.navigation.closeDrawer()} />
        <View style={styles.userInfo}>
          <Avatar.Icon size={80} icon="account-outline" color="#30C6EA" />
          <View style={styles.userDetail}>
            {/* <Text style={styles.userName}>{props.userProfile?.data?.user?.fullName}</Text> */}
            <Text style={styles.userName}>{userDetails?.contact?.firstName} {userDetails?.contact?.lastName}</Text>
            <Text style={styles.userEmail}>{userDetails?.contact?.email}</Text>
          </View>
        </View>
        <View>
          {menuData.map((item, index) => (
            <MenuItem
              key={item.id}
              item={item}
              handleMenu={name => handleMenu(name)}
            />
          ))}
        </View>
        <Pressable onPress={() => onSignOut()}>
          <Text style={styles.signOut}>Log Out</Text>
        </Pressable>
      </ScrollView>
      <View style={styles.versionBlock}>
        <Text style={styles.appVersion}>Version: {APP_VERSION}</Text>
      </View>
    </SafeAreaView>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
