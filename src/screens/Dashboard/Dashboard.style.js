import {StyleSheet} from 'react-native';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    scrollContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    screenContainer: {
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 16,
        color: '#000',
    },
    gradientBox: {
        borderRadius: 8,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    vistorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        rowGap: 15,
        // columnGap: 15,
    },
    containers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    chartFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    chartBox: {
        marginBottom: 20,
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    chartLabel: {
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 14,
        color: '#000',
    },
    titleDark: {
        fontFamily: GlobalStyle.fontSet.Poppins400,
        fontSize: 14,
        color: '#888',
    },
    titleDarkActive: {
        fontFamily: GlobalStyle.fontSet.Poppins400,
        fontSize: 14,
        color: '#000',
    },
    filterBtns: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#f4f4f4',
        padding: 5,
        borderRadius: 50,
        columnGap: 5,
    },
    filterButton: {
        backgroundColor: 'transparent',
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    filterButtonActive: {
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingVertical: 4,
        paddingHorizontal: 10,
        elevation: 4,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    totalCount: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
    chartLegendBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    legendItem: {
        flexDirection: 'row',
    },
    legendColor: {
        height: 18,
        width: 18,
        marginRight: 5,
        borderRadius: 4,
    },
    legendText: {color: '#000', fontSize: 14, fontFamily: GlobalStyle.fontSet.Poppins400},
    created: {
        backgroundColor: '#97b2ab',
    },
    won: {
        backgroundColor: '#347066',
    },
    done: {
        backgroundColor: '#1a3732',
    },
    noData: {
        marginTop: 60,
    },
    inventoryBtn: {
        position: 'absolute',
        bottom: 10,
        right: 5,
    },
});
