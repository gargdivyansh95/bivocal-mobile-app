/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, SafeAreaView, Platform, Pressable, Image, Keyboard } from 'react-native';
import { styles } from './NeedQuery.style';
import { CustomButton, CustomTextInput } from '../../components';
import BackIcon from 'react-native-vector-icons/AntDesign';
import { FullWindowOverlay } from 'react-native-screens';
// import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { IconButton } from 'react-native-paper';
import ArrowDownIcon from '../../assets/images/ArrowDown.png';
import { ECustomerType } from '../../constants/enum';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { needQueryActions } from './NeedQuery.action';

const NeedQuery = (props) => {

  const [customerType, setCustomerType] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  // const bottomSheetRef = useRef(undefined);
  // const snapPoints = useMemo(() => ['50%'], []);

  //   const regexFName = new RegExp('^[a-zA-Z]+$');
  // const regexEmail = new RegExp(
  //   '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
  // );

  // const isValidFName = regexFName.test(fName);
  // const isValidLName = regexFName.test(lName);
  // const isValidEmail = regexEmail.test(email);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  // const renderBackdrop = useCallback(
  //   props => (
  //     <BottomSheetBackdrop
  //       pressBehavior={'close'}
  //       disappearsOnIndex={-1}
  //       appearsOnIndex={0}
  //       {...props}
  //     />
  //   ),
  //   []
  // );

  const handleType = (item) => {
    const currentValue = ECustomerType.find((val) => val.id === item.id);
    setCustomerType(currentValue);
    // bottomSheetRef.current.close();
  };

  const handleSubmit = () => {
    if (!fName) {
        Toast.show({
          type: 'error',
          text1: 'First Name is Required',
          text2: '',
        });
        return false;
    }
    if (!lName) {
        Toast.show({
          type: 'error',
          text1: 'Last Name is Required',
          text2: '',
        });
        return false;
    }
    if (!email) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Valid Email',
          text2: '',
        });
        return false;
    }
    if (!mobile || mobile.length < 10) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter a valid 10-digit Mobile Number',
          text2: '',
        });
        return false;
    }
    if (!customerType) {
        Toast.show({
          type: 'error',
          text1: 'Please Select Customer Type',
          text2: '',
        });
        return false;
    }
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
//   console.log(email, fName, lName, mobile, 'customerType');

  const containerComponent = useCallback((props) => <FullWindowOverlay>{props.children}</FullWindowOverlay>, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <Text style={styles.heading}>Please fill your details</Text>
        <Text style={styles.subHeading}>
          for Better Experience & Regular updates
        </Text>
        {/* <Pressable onPress={() => bottomSheetRef.current?.present()} style={[styles.selectContainer]} > */}
        <Pressable style={[styles.selectContainer]} >
            <Text style={customerType ? styles.pickerButtonTextSelected : styles.pickerButtonText}>{customerType ? customerType.label : 'Select Customer Type'}</Text>
            <Image source={ArrowDownIcon} style={styles.icon} />
        </Pressable>
        <View style={styles.inputBox}>
          <CustomTextInput
            placeholder="First Name"
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
            placeholder="Mobile"
            placeholderTextColor="#808191"
            style={styles.inputStyle}
            onChangeText={setMobile}
            value={mobile ?? ''}
            keyboardType="number-pad"
          />
        </View>
        <CustomButton
          style={[styles.buttonStyle, fName && lName && email && mobile && customerType ? styles.buttonActive : styles.buttonInActive]}
          labelStyle={styles.actionTitle}
          title="Submit"
          mode="contained"
          disabled={fName && lName && email && mobile && customerType ? false : true || loading ? true : false}
          onPress={() => handleSubmit()}
          loading={loading}
        />
      </View>
      {/* <BottomSheetModal
        containerComponent={Platform.OS === 'ios' ? containerComponent : undefined}
        ref={bottomSheetRef}
        index={0}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.sheetHeader}>
            <IconButton
                icon={() => <BackIcon
                name="arrowleft"
                size={28}
                color="#000"
            />}
                size={20}
                onPress={() => bottomSheetRef.current.close()}
              />
            <Text style={styles.sheetTitle}>Select Customer Type</Text>
          </View>
          <BottomSheetFlatList
            data={ECustomerType}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable style={styles.option} onPress={() => handleType(item)}>
                <Text style={styles.optionText}>{item.label}</Text>
              </Pressable>
            )}
          />
        </View>
      </BottomSheetModal> */}
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
