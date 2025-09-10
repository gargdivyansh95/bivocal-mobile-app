import {StyleSheet} from 'react-native';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screenContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        marginBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    title: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 16,
        color: '#000',
    },
    actionsIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 20,
    },
    iconBlock: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#F2F2F2',
    },
    icon: {
        width: 20,
        height: 20,
    },
    searchBox: {
        position: 'relative',
    },
    searchIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: 10,
        left: 15,
    },
    inputStyle: {
        height: 44,
        fontSize: 14,
        paddingRight: 10,
        paddingLeft: 50,
        borderWidth: 1,
        // borderColor: 'red',
        borderColor: '#F2F2F2',
        borderRadius: 30,
        color: '#000',
        fontFamily: GlobalStyle.fontSet.Poppins400,
        paddingTop: 0,
        paddingBottom: 0,
    },
    inventoryBtn: {
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    gradientBox: {
        borderRadius: 8,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 10,
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    gradientIcon: {
        width: 16,
        height: 16,
    },
    gradientButton: {
        color: '#FFFFFF',
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 14,
        paddingTop: 2,
    },
});
