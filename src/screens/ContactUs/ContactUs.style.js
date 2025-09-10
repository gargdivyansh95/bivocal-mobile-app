/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  // },
  // screenContainer: {
  //     paddingHorizontal: 20,
  //     backgroundColor: '#fff',
  //     flex: 1,
  //     paddingTop: 15,
  // },
  // inputBox: {
  //   marginBottom: 25,
  // },
  // inputStyle: {
  //   height: 44,
  //   fontSize: 14,
  //   paddingHorizontal: 10,
  //   backgroundColor: '#f2f3f7',
  //   borderRadius: 4,
  //   color: '#000',
  //   fontFamily: GlobalStyle.fontSet.Poppins400,
  //   paddingTop: 0,
  //   paddingBottom: 0,
  // },
  // buttonStyle: {
  //   borderRadius: 4,
  //   marginTop: 5,
  //   width: '100%',
  //   height: 44,
  //   justifyContent: 'center',
  //   alignContent: 'center',
  // },
  // buttonActive: {
  //     backgroundColor: '#2668E0',
  // },
  // buttonInActive: {
  //     backgroundColor: 'rgba(36,39,44,.3)',
  // },
  // actionTitle: {
  //   color: '#FFFFFF',
  //   fontFamily: GlobalStyle.fontSet.Poppins500,
  //   fontSize: 14,
  // },
  // textStyle: {
  //   color: '#808191',
  //   fontFamily: GlobalStyle.fontSet.Poppins500,
  //   fontSize: 14,
  //   paddingBottom: 5,
  // }
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontFamily: GlobalStyle.fontSet.Poppins600,
    fontSize: 20,
    marginTop: 10,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  supportInfo: {
    marginTop: 20,
  },
  heading: {
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: 16,
    color: '#000',
  },
  subHeading: {
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: 15,
    color: '#007be5',
  },
});
