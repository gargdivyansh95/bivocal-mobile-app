import React, { useState, useEffect } from 'react';
import { Keyboard, Linking, SafeAreaView, Text, View } from 'react-native';
import { CustomButton, CustomTextInput } from '../../components';
import { NAVIGATION } from '../../constants';
import { styles } from './Login.style';
import { connect } from 'react-redux';
import { authActions } from './Auth.action';
import { bindActionCreators } from 'redux';
import { Checkbox, Snackbar } from 'react-native-paper';
import GlobalStyle from '../../style/globalstyle';
import Toast from 'react-native-toast-message';

const Login = props => {
  const [inputValue, setInputValue] = useState();
  const [loading, setLoading] = useState(false);
  const [snack, setSanck] = useState({ visible: false, message: '', status: null });

  const sendOTP = () => {
    Keyboard.dismiss();
    setLoading(true);
    let { actions } = props;
    actions.login(
      inputValue,
      response => {
        console.log('SUCCESS', response);
        setLoading(false);
        props.navigation.navigate(NAVIGATION.verifyOTP, { data: response.data, mobileNumber: inputValue });
      },
      error => {
        console.log('ERROR', error);
        // setSanck({ visible: true, message: error?.data ? error.data : 'Something went wrong.', status: 'error' });
        Toast.show({
          type: 'error',
          text1: error?.data ? error.data : 'Something went wrong.',
          text2: '',
        });
        setLoading(false);
      },
    );
  };

  const onDismissSnackBar = () => setSanck({ visible: false, message: '' });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <Text style={styles.heading}>Login or Register</Text>
        <Text style={styles.subHeading}>
          for Better Experience & Regular updates
        </Text>
        <View style={styles.inputBox}>
          <CustomTextInput
            placeholder="Mobile Number"
            placeholderTextColor="#808191"
            style={styles.inputStyle}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={setInputValue}
            value={inputValue}
          />
        </View>
        <CustomButton
          style={[
            styles.buttonStyle,
            inputValue?.length >= 10
              ? styles.buttonActive
              : styles.buttonInActive,
          ]}
          labelStyle={styles.actionTitle}
          title="Send OTP"
          mode="contained"
          disabled={inputValue?.length >= 10 ? false : true || loading ? true : false}
          onPress={() => sendOTP()}
          loading={loading}
        />

        <View style={{
          flexDirection: 'row',
          marginTop: 20,
        }}>
          {/* <Checkbox.Item
            mode="android"
            label="Comment"
            //status={flagComment ? 'checked' : 'unchecked'}
            style={{ flexDirection: 'row-reverse' }}
            onPress={() => { }}
          //onPress={() => setFlagComment(!flagComment)}
          /> */}
          < Text style={styles.subHeading}>{`By continuing I agree with the `}
            <Text style={{ textDecorationLine: 'underline', color: '#2668E0' }} onPress={() => Linking.openURL('https://bivocalbirds.com/privacy-policy')}>Privacy Policy</Text>
            <Text>,</Text>
            <Text style={{ textDecorationLine: 'underline', color: '#2668E0' }} onPress={() => Linking.openURL('https://bivocalbirds.com/terms-and-conditions')}>Terms & Conditions</Text>
          </Text>
        </View>
      </View >

      <Snackbar
        visible={snack.visible}
        duration={3000}
        //wrapperStyle={GlobalStyle.snackPosition}
        //style={[GlobalStyle.snackContainer, snack.status === 'success' ? GlobalStyle.snackSuccess : GlobalStyle.snackError]}
        action={{ icon: 'close' }}
        onDismiss={onDismissSnackBar}>
        <Text style={GlobalStyle.snackMessage}>{snack.message}</Text>
      </Snackbar>
    </SafeAreaView >
  );
};

const mapStateToProps = state => ({
  // loginDetail: state.auth.loginDetail,
});

const ActionCreators = Object.assign(
  {},
  {
    login: authActions.login,

  },
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
