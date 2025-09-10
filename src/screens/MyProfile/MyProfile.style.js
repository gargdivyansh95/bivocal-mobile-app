import {StyleSheet} from 'react-native';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screenContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        flex: 1,
        paddingTop: 20,
    },
    detailsRow: {
        // flexDirection: 'column',
        // justifyContent: 'center',
        marginBottom: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    profileAvatar: {
        position: 'relative',
        marginBottom: 30,
    },
    avatarIcon: {
        backgroundColor: '#eee',
    },
    editIcon: {
        backgroundColor:'#f7f7f7',
        position: 'absolute',
        top: 40,
        left: 50,
        // shadowColor: '#171717',
        // shadowOffset: {width: -2, height: 4},
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
    },
    mainHeading: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 18,
        color: '#000',
        marginBottom: 15,
    },
    heading: {
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 14,
        color: '#000',
    },
    headingDetails: {
        fontFamily: GlobalStyle.fontSet.Poppins400,
        fontSize: 15,
        color: '#808191',
        // color: '#24272c',
    },
    inputBox: {
        marginBottom: 15,
    },
    inputStyle: {
        height: 44,
        fontSize: 14,
        paddingHorizontal: 10,
        // backgroundColor: '#f2f3f7',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        color: '#000',
        fontFamily: GlobalStyle.fontSet.Poppins400,
        paddingTop: 0,
        paddingBottom: 0,
    },
    buttonStyle: {
        borderRadius: 8,
        marginTop: 20,
        width: '100%',
        height: 44,
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 50,
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
});
