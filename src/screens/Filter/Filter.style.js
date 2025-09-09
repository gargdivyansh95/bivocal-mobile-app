/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  screenContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    position: 'relative',
  },
  label: {
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: 14,
    paddingBottom: 2,
  },
  datePickerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  dateSelect: {
    flex: 0,
    flexBasis: '47%',
  },
  selectBox: {
    height: 44,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
  },
  selectTitle: {
    fontSize: 14,
    color: '#808191',
    fontFamily: GlobalStyle.fontSet.Poppins400,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    height: 44,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#808191',
    fontFamily: GlobalStyle.fontSet.Poppins400,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins500,
  },
  inputSearchStyle: {
    height: 42,
    fontSize: 14,
    color: '#808191',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 4,
  },
  dropdownListContainer: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    shadowColor: 'transparent',
  },
  dropdownListBox: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  dropdownListItem: {
    fontSize: 14,
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins400,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    width: '100%',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
  clearBtn: {
    flex: 0,
    flexBasis: '40%',
  },
  doneBtn: {
    flex: 0,
    flexBasis: '40%',
  },
  btnDark: {
    backgroundColor: '#199fba',
    height: 44,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#199fba',
    width: '100%',
    borderRadius: 4,
  },
  btnLight: {
    backgroundColor: 'transparent',
    height: 44,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#199fba',
    width: '100%',
    borderRadius: 4,
  },
  titleDark: {
    color: '#199fba',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: 14,
  },
  titleLight: {
    color: '#fff',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: 14,
  },
});
