import React, { useState } from 'react';
import { Dialog, Portal } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { CustomButton, CustomTextInput } from '../../../components';
import GlobalStyle from '../../../style/globalstyle';
import { Dropdown } from 'react-native-element-dropdown';
import { RentOutReasonOptions } from '../../../constants/enum';
import Toast from 'react-native-toast-message';

export default function MarkRentOutDialog(props) {

    const handleMark = () => {
        if (!props.reasonType) {
            Toast.show({
                type: 'error',
                text1: 'Please Select Rent Out Reason',
                text2: '',
            });
            return;
        }
        if (props.reasonType?.type === 6 && !props.reasonInputRef) {
            Toast.show({
                type: 'error',
                text1: 'Please Enter Rent Out Reason',
                text2: '',
            });
            return;
        }
        props.handleMarkRentOut();
    };

    return (
        <Portal>
            <Dialog style={styles.dialogContainer} visible={props.visible} onDismiss={props.hideDialog}>
                <Dialog.Title style={styles.dialogTitle}>Rent Out Property</Dialog.Title>
                <Dialog.Content style={styles.dialogContent}>
                    <Text style={styles.description}>Are you sure want to mark rent out this propetry</Text>
                    <View style={styles.inputBox}>
                        <Text style={styles.heading}>Rent Out Reason</Text>
                        <Dropdown
                            style={styles.selectContainer}
                            data={RentOutReasonOptions}
                            labelField="label"
                            valueField="type"
                            placeholder="Select Rent Out Reason"
                            value={props.reasonType?.type}
                            onChange={item => props.handleReasonType(item)}
                            itemTextStyle={styles.itemTextStyle}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                        />
                        {props.reasonType?.type === 6 &&
                            <CustomTextInput
                                placeholder="Please Enter Reason"
                                placeholderTextColor="#808191"
                                style={styles.inputStyle}
                                onChangeText={props.handleChangeRentOutReason}
                                value={props.reasonInputRef ?? ''}
                            />
                        }
                    </View>
                </Dialog.Content>
                <Dialog.Actions style={styles.dailogFooter}>
                    <CustomButton
                        title="Cancel"
                        style={styles.btnLight}
                        labelStyle={styles.titleDark}
                        onPress={props.hideDialog}
                    />
                    <CustomButton
                        title="Confirm"
                        style={styles.btnDark}
                        labelStyle={styles.titleLight}
                        loading={props.isFormSubmit}
                        onPress={handleMark}
                    />
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    dialogContainer: {
        borderRadius: 16,
        backgroundColor: '#fff',
    },
    dialogTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: GlobalStyle.fontSet.Poppins600,
        color: '#000',
    },
    dialogContent: {
        padding: 0,
        margin: 0,
    },
    description: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.Poppins400,
        color: '#000',
        marginBottom: 15,
    },
    heading: {
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 14,
        color: '#000',
        marginBottom: 4,
    },
    selectContainer: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        paddingLeft: 10,
    },
    itemTextStyle: {
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
    dailogFooter: {
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    btnDark: {
        backgroundColor: '#2668E0',
        height: 44,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#2668E0',
        borderRadius: 8,
    },
    btnLight: {
        backgroundColor: 'transparent',
        height: 44,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#2668E0',
        borderRadius: 8,
    },
    titleDark: {
        color: '#2668E0',
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 14,
    },
    titleLight: {
        color: '#fff',
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 14,
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
        marginTop: 15,
    },
});
