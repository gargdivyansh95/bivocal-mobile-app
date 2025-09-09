import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Keyboard, Pressable } from 'react-native';
import { styles } from './VerifyOTP.style';
import { connect } from 'react-redux';
import { authActions } from './Auth.action';
import { bindActionCreators } from 'redux';
import { CustomButton, CustomTextInput } from '../../components';
import { NAVIGATION } from '../../constants';
import { Snackbar } from 'react-native-paper';
import GlobalStyle from '../../style/globalstyle';

const VerifyOTP = props => {

  const [inputValue, setInputValue] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(props?.route?.params?.data);
  const [snack, setSanck] = useState({ visible: false, message: '', status: 'success' });
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    setSanck({ visible: true, message: 'OTP sent on your number', status: 'success' });
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleConfirm = () => {
    Keyboard.dismiss();
    setLoading(true);
    let { actions } = props;
    let verifyData = `${data}${'/'}${inputValue}${'/'}${'91-'}${props?.route?.params?.mobileNumber}`;
    actions.verifyOTP(
      verifyData,
      response => {
        console.log('SUCCESS', response);
        setSanck({ visible: true, message: 'OTP Verified Successfully', status: 'success' });
        setLoading(false);
        console.log(response?.data?.user?.fullName?.length, 'response?.data')
        if (!response?.data?.user?.fullName || response?.data?.user?.fullName?.length === 0) {
          props.navigation.navigate(NAVIGATION.register);
        } else {
          props.navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.tabHome }]
          })
        }
      },
      error => {
        console.log('ERROR', error);
        setSanck({ visible: true, message: 'OTP Mismatch', status: 'error' });
        setLoading(false);
      },
    );
  };

  const resendOTP = () => {
    Keyboard.dismiss();
    let { actions } = props;
    let resendData = props?.route?.params?.mobileNumber;
    actions.login(
      resendData,
      response => {
        console.log('SUCCESS', response);
        setSanck({ visible: true, message: 'OTP resend on your number', status: 'success' });
        setMinutes(1);
        setSeconds(60);
        setData(response?.data);
      },
      error => {
        console.log('ERROR', error);
        setSanck({ visible: true, message: error.message, status: 'error' });
      },
    );
  };

  const handleEdit = () => {
    props.navigation.goBack();
  };

  const onDismissSnackBar = () => setSanck({ visible: false, message: '' });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <Text style={styles.heading}>OTP Verification</Text>
        <View style={styles.flexItem}>
          <Text style={styles.subHeading}>OTP has been sent to</Text>
          <Text style={styles.number}>
            {props?.route?.params?.mobileNumber}
          </Text>
          <Pressable onPress={() => handleEdit()}>
            <Text style={styles.editText}>edit</Text>
          </Pressable>
        </View>
        <View style={styles.inputBox}>
          <CustomTextInput
            placeholder="Enter 6 Digit OTP"
            placeholderTextColor="#808191"
            style={styles.inputStyle}
            keyboardType="numeric"
            maxLength={6}
            onChangeText={setInputValue}
            value={inputValue}
          />
          <View style={styles.resendOTP}>
            <Pressable onPress={() => resendOTP()} disabled={seconds > 0 || minutes > 0}>
              <Text style={seconds > 0 || minutes > 0 ? styles.resendTextInActive : styles.resendText}>Resend OTP </Text>
            </Pressable>
            {seconds > 0 || minutes > 0 ? (
              <Text style={seconds > 0 || minutes > 0 ? styles.resendTextInActive : styles.resendText}>
                in {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </Text>
            ) : null}
          </View>
        </View>
        <CustomButton
          style={[
            styles.buttonStyle,
            inputValue?.length >= 6
              ? styles.buttonActive
              : styles.buttonInActive,
          ]}
          labelStyle={styles.actionTitle}
          title="Confirm"
          mode="contained"
          disabled={inputValue?.length >= 6 ? false : true || loading ? true : false}
          onPress={() => handleConfirm()}
          loading={loading}
        />
      </View>
      <Snackbar
        visible={snack.visible}
        duration={2000}
        //wrapperStyle={GlobalStyle.snackPosition}
        //style={[GlobalStyle.snackContainer, snack.status === 'success' ? GlobalStyle.snackSuccess : GlobalStyle.snackError]}
        action={{ icon: 'close' }}
        onDismiss={onDismissSnackBar}>
        <Text style={GlobalStyle.snackMessage}>{snack.message}</Text>
      </Snackbar>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  // loginDetail: state.auth.loginDetail,
});

const ActionCreators = Object.assign(
  {},
  {
    login: authActions.login,
    verifyOTP: authActions.verifyOTP,
  },
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOTP);
