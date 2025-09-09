/* eslint-disable prettier/prettier */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import CloseIcon from 'react-native-vector-icons/AntDesign';

export default function NavigationBar(props) {
  return (
    // <Pressable style={styles.closeMenu} onPress={() => props.onClose()}>
    //   <CloseIcon name="close" size={20} color="#000" />

    // </Pressable>
    <View style={styles.closeMenu}>
      <IconButton

        icon="close"
        //iconColor={MD3Colors.error50}
        size={20}
        onPress={() => props.onClose()}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  closeMenu: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
