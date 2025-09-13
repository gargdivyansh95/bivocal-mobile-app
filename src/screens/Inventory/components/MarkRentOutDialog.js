import React, { useState } from 'react';
import { Dialog, Portal } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { CustomButton } from '../../../components';
import GlobalStyle from '../../../style/globalstyle';
import { Dropdown } from 'react-native-element-dropdown';

export default function MarkRentOutDialog(props) {

    const reasonList = [
        { id: 1, title: 'Reason 1' },
        { id: 2, title: 'Reason 2' },
        { id: 3, title: 'Reason 3' },
        { id: 4, title: 'Reason 4' },
        { id: 5, title: 'Reason 5' },
    ];
    const [reasonType, setReasonType] = useState(null);

    const handleReasonType = (item) => {
        setReasonType(item);
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
                            data={reasonList}
                            labelField="title"
                            valueField="id"
                            placeholder="Select Rent Out Reason"
                            value={reasonType?.id}
                            onChange={item => handleReasonType(item)}
                            itemTextStyle={styles.itemTextStyle}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                        />
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
});
