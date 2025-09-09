/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Keyboard, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';
import {styles} from './MyProfile.style';
import {connect, useSelector} from 'react-redux';
import { CustomButton, CustomTextInput } from '../../components';
import { authActions } from '../Auth/Auth.action';
import { bindActionCreators } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { dashboardActions } from '../Dashboard/Dashboard.action';

const MyProfileScreen = (props) => {
  const [userData, setUserData] = useState(null);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserDetail();
  }, []);

  useEffect(() => {
    setFName(userData?.contact?.firstName);
    setLName(userData?.contact?.lastName);
    setEmail(userData?.email);
  }, [userData]);

  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //     getUserDetail();
  //   });

  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [props.navigation]);


  const getUserDetail = () => {
    let { actions } = props;
    actions.userProfile(
      {},
      response => {
        console.log('SUCCESS PROFILE:', response);
        setUserData(response?.data);
      },
      error => {
        console.log('ERROR PROFILE', error);
      },
    );
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
      setLoading(true);
      let data = {
        firstName: fName,
        lastName: lName,
        email: email,
      };
      let { actions } = props;
      actions.updateUser(
        data,
        response => {
          console.log('SUCCESS', response);
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Profile Update Successfully.',
            text2: '',
          });
          getUserDetail();
        },
        error => {
          console.log('ERROR', error);
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: error?.message,
            text2: '',
          });
        },
      );
  };

  console.log(userData, 'authState.userProfile?.data');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.screenContainer}>
        <View style={styles.profileAvatar}>
          <Avatar.Icon
            size={80}
            icon="account-outline"
            color="#999"
            style={styles.avatarIcon}
          />
          {/* <IconButton
            icon="camera"
            iconColor={'black'}
            size={20}
            style={styles.editIcon}
            onPress={() => console.log('Pressed')}
          /> */}
        </View>
        <Text style={styles.mainHeading}>Basic Info</Text>
        <View style={styles.inputBox}>
          <Text style={styles.heading}>First Name</Text>
          <CustomTextInput
            placeholder="First Name"
            placeholderTextColor="#808191"
            style={styles.inputStyle}
            onChangeText={setFName}
            value={fName}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.heading}>Last Name</Text>
          <CustomTextInput
            placeholder="Last Name"
            placeholderTextColor="#808191"
            style={styles.inputStyle}
            onChangeText={setLName}
            value={lName}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.heading}>Email</Text>
          <CustomTextInput
            placeholder="Email"
            placeholderTextColor="#808191"
            style={styles.inputStyle}
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.heading}>Mobile: </Text>
          <Text style={styles.headingDetails}>{userData?.contact?.mobile}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.heading}>Relationship Manager: </Text>
          <Text style={styles.headingDetails}>
            {userData?.relationshipManager?.fullName
              ? userData?.relationshipManager?.fullName
              : 'N/A'}
          </Text>
        </View>
        <CustomButton
          style={[styles.buttonStyle, styles.buttonActive]}
          labelStyle={styles.actionTitle}
          title="Submit"
          mode="contained"
          // disabled={loading ? true : false}
          onPress={() => handleSubmit()}
          loading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  // loginDetail: state.auth.loginDetail,
  userProfile: state.auth.userProfile,
});

const ActionCreators = Object.assign(
  {},
  {
    updateUser: authActions.updateUser,
    userProfile: dashboardActions.userProfile,
  },
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen);
