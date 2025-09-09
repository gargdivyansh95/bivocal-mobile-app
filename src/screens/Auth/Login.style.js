/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
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
    heading: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 18,
        marginTop: 3,
        color: '#000',
    },
    subHeading: {
        fontFamily: GlobalStyle.fontSet.Poppins400,
        fontSize: 12,
        color: '#808191',
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
        backgroundColor: '#199fba',
    },
    buttonInActive: {
        backgroundColor: 'rgba(36,39,44,.3)',
    },
    actionTitle: {
        color: '#FFFFFF',
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 14,
    },
});
