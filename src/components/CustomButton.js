import React from 'react';
import {Button} from 'react-native-paper';

export default function CustomButton(props) {
  return (
    <Button
      mode={props.mode}
      icon={props.icon}
      contentStyle={props.contentStyle}
      style={props.style}
      loading={props.loading}
      labelStyle={props.labelStyle}
      disabled={props.disabled}
      onPress={props.onPress}>
      {props.title}
    </Button>
  );
}
