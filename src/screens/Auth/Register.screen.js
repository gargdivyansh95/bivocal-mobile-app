/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { SafeAreaView, Text, View, Keyboard } from 'react-native';
import { CustomButton, CustomTextInput } from '../../components';
import { NAVIGATION } from '../../constants';
import { connect } from 'react-redux';
import { authActions } from './Auth.action';
import { bindActionCreators } from 'redux';
import { styles } from './Register.style';

const Register = props => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState();

  const regexFName = new RegExp('^[a-zA-Z]+$');
  // const regexEmail = new RegExp(
  //   '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
  // );
  const isValidFName = regexFName.test(fName.trim());
  const isValidLName = regexFName.test(lName.trim());
  // const isValidEmail = regexEmail.test(email);

  const handleSubmit = () => {
    if (!isValidFName && !isValidLName) {
      alert('Name field does not allowed special and numeric characters');
    } else {
      Keyboard.dismiss();
      setLoading(true);
      let userData = {
        firstName: fName.trim(),
        lastName: lName.trim(),
      };
      let { actions } = props;
      actions.updateUser(
        userData,
        response => {
          console.log('SUCCESS', response);
          // setSanck({visible: true, message: 'OTP sent on your number', status: 'success'});
          setLoading(false);
          props.navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.tabHome }]
          })
        },
        error => {
          console.log('ERROR', error);
          // setSanck({visible: true, message: 'OTP sent on your number failed', status: 'error'});
          setLoading(false);
        },
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <Text style={styles.heading}>Please fill your details</Text>
        <Text style={styles.subHeading}>
          for Better Experience & Regular updates
        </Text>
        <View style={styles.inputBox}>
          <CustomTextInput
            placeholder="First Name"
            placeholderTextColor="#808191"
            style={styles.inputStyle}
            onChangeText={setFName}
            value={fName}
          />
        </View>
        <View style={styles.inputBox}>
          <CustomTextInput
            placeholder="Last Name"
            placeholderTextColor="#808191"
            style={styles.inputStyle}
            onChangeText={setLName}
            value={lName}
          />
        </View>
        {/* <View style={styles.inputBox}>
          <CustomTextInput
            placeholder="Email"
            placeholderTextColor="#808191"
            style={styles.inputStyle}
            onChangeText={setEmail}
            value={email}
          />
        </View> */}
        <CustomButton
          style={[
            styles.buttonStyle,
            isValidFName && isValidLName
              ? styles.buttonActive
              : styles.buttonInActive,
          ]}
          labelStyle={styles.actionTitle}
          title="Submit"
          mode="contained"
          disabled={isValidFName && isValidLName ? false : true || loading ? true : false}
          onPress={() => handleSubmit()}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  // loginDetail: state.auth.loginDetail,
});

const ActionCreators = Object.assign(
  {},
  {
    updateUser: authActions.updateUser,
  },
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
