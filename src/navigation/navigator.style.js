/* eslint-disable prettier/prettier */
import {Platform, StyleSheet} from 'react-native';
import GlobalStyle from '../style/globalstyle';

export const styles = StyleSheet.create({
  navigatorText: {
    color: '#1B2C50',
    fontSize: Platform.OS === 'ios' ? 22 : 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 5,
    fontFamily: GlobalStyle.fontSet.Poppins600,
  },
});
