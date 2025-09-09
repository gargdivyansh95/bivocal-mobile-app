import React from 'react';
import { TextInput } from 'react-native';

export default function CustomTextInput(props) {
  return (
    <TextInput
      label={props.label}
      value={props.value}
      onChangeText={props.onChangeText}
      disabled={props.disabled}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}
      keyboardType={props.keyboardType}
      maxLength={props.maxLength}
      style={props.style}
      readOnly={props.readOnly}
      autoComplete="sms-otp" // android
      textContentType="oneTimeCode" // ios
    />
  );
}
