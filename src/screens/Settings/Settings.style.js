import { StyleSheet } from 'react-native';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    screenContainer: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
    },
    userInfo: {
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingBottom: 25,
        // paddingTop: 5,
    },
    userName: {
        fontSize: 15,
        color: '#199fba',
        fontFamily: GlobalStyle.fontSet.Poppins500,
        marginTop: 10,
    },
    userEmail: {
        fontSize: 13,
        color: '#000',
        fontFamily: GlobalStyle.fontSet.Poppins400,
    },
    versionText: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.Poppins500,
        textAlign: 'center',
        color: '#000',
    },
    cardItem: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontFamily: GlobalStyle?.fontSet.Poppins500,
        fontSize: 16,
    },
});
