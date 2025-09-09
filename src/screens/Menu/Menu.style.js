/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  menuWrapper:{ flex: 1, position:'relative' },
  menuContainer: {
    paddingVertical: 15,
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25,
    paddingTop: 5,
  },
  userDetail: {
    paddingLeft: 10,
  },
  userName: {
    fontSize: 15,
    color: '#199fba',
    fontFamily: GlobalStyle.fontSet.Poppins500,
  },
  userEmail: {
    fontSize: 13,
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins400,
  },
  signOut: {
    fontSize: 15,
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins400,
  },
  versionBlock: {

  },
  appVersion: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    marginBottom: 10,
  },
});
