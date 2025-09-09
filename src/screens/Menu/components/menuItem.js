/* eslint-disable prettier/prettier */
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import GlobalStyle from '../../../style/globalstyle';

export default function MenuItem(props) {
  return (
    <Pressable
      key={props.item.id}
      style={styles.menuLists}
      onPress={() => props.handleMenu(props.item.name)}>
      <Text style={styles.menuItems}>{props.item.name}</Text>
    </Pressable>
  );
}

export const styles = StyleSheet.create({
  menuLists: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  menuItems: {
    paddingVertical: 5,
    fontSize: 15,
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins400,
  },
});
