import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function TabNavigatorIcons(props) {
  return (
    <Image style={[styles.iconImage, props.tintColor]} source={props.source} />
  );
}
export const styles = StyleSheet.create({
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
