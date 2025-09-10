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
