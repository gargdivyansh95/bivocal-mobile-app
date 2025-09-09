import { Dimensions, Platform } from 'react-native';

const _fontSet = {
  Poppins900: 'Poppins-Black',
  Poppins800: 'Poppins-ExtraBold',
  Poppins700: 'Poppins-Bold',
  Poppins600: 'Poppins-SemiBold',
  Poppins500: 'Poppins-Medium',
  Poppins400: 'Poppins-Regular',
  Poppins300: 'Poppins-Light',
};

const GlobalStyle = {
  fontSet: _fontSet,
  width: Dimensions.get('screen').width,
  headerLogo: {
    // marginTop: Platform.OS === 'android' ? 20 : 0,
    marginTop: 0,
    width: 160,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  snackPosition: { top: 0 },
  snackContainer: { marginHorizontal: 20 },
  snackSuccess: {
    backgroundColor: '#38A169',
  },
  snackError: {
    backgroundColor: '#E53E3E',
  },
  snackMessage: {
    fontFamily: _fontSet.Poppins500,
    fontSize: 15,
    color: '#fff',
  },
};

export default GlobalStyle;
