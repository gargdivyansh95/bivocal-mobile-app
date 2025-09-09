/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
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
