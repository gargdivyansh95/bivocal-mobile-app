import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CustomButton } from '../../components';
import GlobalStyle from '../../style/globalstyle';

export default function AddInventory() {
    return (
        <SafeAreaView style={[styles.container]}>
            <KeyboardAwareScrollView
                contentContainerStyle={[styles.scrollContainer]}
                enableOnAndroid={true}
                extraScrollHeight={20}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.screenContainer}>
                    <Text>cscccc</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        style={[styles.buttonDark]}
                        labelStyle={[styles.titleLight]}
                        title={'Add Inventory'}
                        mode="contained"
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingBottom: 5,
        backgroundColor: '#fff',
    },
    screenContainer: {
        marginTop: 20,
        flex: 1,
    },
    buttonContainer: {
        paddingBottom: 5,
    },
    buttonDark: {
        backgroundColor: '#2668E0',
        height: 44,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#2668E0',
        width: '100%',
        borderRadius: 4,
    },
    titleLight: {
        color: '#fff',
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 14,
    },
});
