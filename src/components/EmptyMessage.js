/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import GlobalStyle from '../style/globalstyle';

export default function EmptyMessage(props) {
  return (
    <View style={styles.emptyBox}>
      <Icon
        name={props.iconName}
        size={26}
        color="#808191"
      />
      <Text style={styles.emptyTitle}>{props.title}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  emptyBox: {
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: GlobalStyle.fontSet.Poppins500,
    color: '#808191',
    marginTop: 10,
  },
});
