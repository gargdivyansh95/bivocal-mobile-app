import { StyleSheet } from 'react-native';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // screenContainer: {
    //     paddingHorizontal: 20,
    //     backgroundColor: '#fff',
    //     flex: 1,
    // },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingBottom: 5,
        backgroundColor: '#fff',
    },
    screenContainer: {
        marginTop: 15,
        flex: 1,
    },
    heading: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 18,
        // marginTop: 10,
        color: '#000',
    },
    subHeading: {
        fontFamily: GlobalStyle.fontSet.Poppins400,
        fontSize: 12,
        color: '#808191',
        marginBottom: 25,
    },
    inputBox: {
        marginBottom: 20,
    },
    inputStyle: {
        height: 44,
        fontSize: 14,
        paddingHorizontal: 10,
        // backgroundColor: '#f2f3f7',
        // borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        color: '#000',
        fontFamily: GlobalStyle.fontSet.Poppins400,
        paddingTop: 0,
        paddingBottom: 0,
    },
    buttonContainer: {
        paddingBottom: 5,
    },
    buttonStyle: {
        borderRadius: 8,
        marginTop: 5,
        width: '100%',
        height: 44,
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonActive: {
        backgroundColor: '#2668E0',
    },
    buttonInActive: {
        backgroundColor: 'rgba(36,39,44,.3)',
    },
    actionTitle: {
        color: '#FFFFFF',
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 14,
    },
    selectContainer: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: '#f2f3f7',
        // borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingRight: 20,
        marginBottom: 20,
    },
    itemTextStyle:{
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 14,
        color: '#000',
    },
    placeholderStyle: {
        color: '#808191',
        fontFamily: GlobalStyle.fontSet.Poppins400,
        fontSize: 14,
    },
    selectedTextStyle: {
        color: '#000000',
        fontFamily: GlobalStyle.fontSet.Poppins400,
        fontSize: 14,
    },
    // pickerButtonText: {
    //     fontSize: 14,
    //     color: '#808191',
    //     fontFamily: GlobalStyle.fontSet.Poppins400,
    // },
    // pickerButtonTextSelected: {
    //     fontSize: 14,
    //     color: '#000',
    //     fontFamily: GlobalStyle.fontSet.Poppins400,
    // },
    // icon: {
    //     width: 24,
    //     height: 24,
    //     resizeMode: 'contain',
    // },
    // sheetHeader: {
    //     position: 'relative',
    //     marginBottom: 15,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // closeIcon: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 15,
    //     zIndex: 111,
    // },
    // sheetTitle: {
    //     color: '#000',
    //     fontFamily: GlobalStyle?.fontSet.Poppins500,
    //     fontSize: 16,
    //     textAlign: 'center',
    //     flex: 1,
    //     marginLeft: -24,

    // },
    // option: {
    //     paddingHorizontal: 15,
    // },
    // optionText: {
    //     color: '#000',
    //     fontFamily: GlobalStyle?.fontSet.Poppins500,
    //     fontSize: 14,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#EAEAEA',
    //     paddingVertical: 15,
    // },
});
