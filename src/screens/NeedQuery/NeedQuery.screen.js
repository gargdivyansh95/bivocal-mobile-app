/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Keyboard } from 'react-native';
import { styles } from './NeedQuery.style';
import { CustomButton, CustomTextInput } from '../../components';
import { ECustomerType } from '../../constants/enum';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { needQueryActions } from './NeedQuery.action';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isValidEmail, isValidIndianMobile, isValidName } from '../../util/helpers';

const NeedQuery = (props) => {

  const [customerType, setCustomerType] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const handleType = (item) => {
    const currentValue = ECustomerType.find((val) => val.id === item.id);
    setCustomerType(currentValue);
  };

  const handleSubmit = () => {
    if (!isFormValid) {
      Toast.show({
        type: 'error',
        text1: 'Please enter required fileds',
        text2: '',
      });
      return false;
    }
    // if (!isValidName(fName)) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'First Name is Required',
    //     text2: '',
    //   });
    //   return false;
    // }
    // if (!isValidName(lName)) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Last Name is Required',
    //     text2: '',
    //   });
    //   return false;
    // }
    // if (!isValidEmail(email)) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Please Enter Valid Email',
    //     text2: '',
    //   });
    //   return false;
    // }
    // if (!isValidIndianMobile(mobile)) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Please Enter a valid 10-digit Mobile Number',
    //     text2: '',
    //   });
    //   return false;
    // }
    // if (!customerType) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Please Select Customer Type',
    //     text2: '',
    //   });
    //   return false;
    // }
    let payload = {
      availableFromProp: null,
      callStatus: 2,
      email: email,
      firstName: fName,
      label: 1,
      lastName: lName,
      mobile: mobile,
      propertyStatus: 0,
      source: 14,
      type: customerType.type,
    };
    Keyboard.dismiss();
    setLoading(true);
    let { actions } = props;
    actions.needQuery(
      payload,
      response => {
        console.log('SUCCESS', response);
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Query submitted successfully.',
          text2: '',
        });
        setFName('');
        setLName('');
        setEmail('');
        setMobile('');
        setCustomerType('');
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

  const isFormValid =
    isValidName(fName) &&
    (!lName || isValidName(lName)) &&
    (!email || isValidEmail(email)) &&
    isValidIndianMobile(mobile) &&
    !!customerType;

  console.log("isFormValid: ", isFormValid);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.scrollContainer]}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.screenContainer}>
          <Text style={styles.heading}>Please fill your details</Text>
          <Text style={styles.subHeading}>
            for Better Experience & Regular updates
          </Text>
          <Dropdown
            style={styles.selectContainer}
            data={ECustomerType}
            labelField="label"
            valueField="type"
            placeholder="Select Customer Type*"
            value={customerType?.type}
            onChange={item => handleType(item)}
            itemTextStyle={styles.itemTextStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
          />
          <View style={styles.inputBox}>
            <CustomTextInput
              placeholder="First Name*"
              placeholderTextColor="#808191"
              style={styles.inputStyle}
              onChangeText={setFName}
              value={fName ?? ''}
            />
          </View>
          <View style={styles.inputBox}>
            <CustomTextInput
              placeholder="Last Name"
              placeholderTextColor="#808191"
              style={styles.inputStyle}
              onChangeText={setLName}
              value={lName ?? ''}
            />
          </View>
          <View style={styles.inputBox}>
            <CustomTextInput
              placeholder="Email"
              placeholderTextColor="#808191"
              style={styles.inputStyle}
              onChangeText={setEmail}
              value={email ?? ''}
              keyboardType="email"
            />
          </View>
          <View style={styles.inputBox}>
            <CustomTextInput
              placeholder="Mobile*"
              placeholderTextColor="#808191"
              maxLength={1044444}
              style={styles.inputStyle}
              onChangeText={setMobile}
              value={mobile ?? ''}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            style={[styles.buttonStyle, isFormValid ? styles.buttonActive : styles.buttonInActive]}
            labelStyle={styles.actionTitle}
            title="Submit"
            mode="contained"
            disabled={isFormValid ? false : true}
            onPress={() => handleSubmit()}
            loading={loading}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  // userProfile: state.auth.userProfile,
});

const ActionCreators = Object.assign(
  {},
  {
    needQuery: needQueryActions.needQuery,
  },
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NeedQuery);
