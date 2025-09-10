import { StyleSheet } from 'react-native';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    screenContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: '#fff',
        flex: 1,
    },
    heading: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 18,
        color: '#000',
        marginBottom: 3,
    },
    flexItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subHeading: {
        fontFamily: GlobalStyle.fontSet.Poppins400,
        fontSize: 12,
        color: '#808191',
    },
    number: {
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 12,
        color: '#000',
        marginLeft: 5,
    },
    editText: {
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 12,
        color: '#000',
        marginLeft: 5,
        textDecorationLine: 'underline',
    },
    inputBox: {
        marginTop: 15,
        marginBottom: 20,
    },
    inputStyle: {
        height: 44,
        fontSize: 14,
        paddingHorizontal: 10,
        backgroundColor: '#f2f3f7',
        borderRadius: 4,
        color: '#000',
        fontFamily: GlobalStyle.fontSet.Poppins400,
        paddingTop: 0,
        paddingBottom: 0,
    },
    buttonStyle: {
        borderRadius: 4,
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
    resendOTP: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    resendText: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 14,
        color: '#007be5',
    },
    resendTextInActive: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 14,
        color: 'rgba(36,39,44,.3)',
    },
});
