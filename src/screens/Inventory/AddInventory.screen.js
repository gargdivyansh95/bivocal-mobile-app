/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomButton, CustomTextInput } from '../../components';
import GlobalStyle from '../../style/globalstyle';
import { Dropdown } from 'react-native-element-dropdown';
import { PropertyBHKOptions, PropertyFurnishOptions, PropertyTypeOptions } from '../../constants/enum';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { inventoryActions } from './Inventory.action';

const AddInventory = (props) => {

    const [startdate, setStartDate] = useState(new Date());
    const [societyType, setSocietyType] = useState(null);
    const [bhkType, setBhkType] = useState(null);
    const [furnishType, setFurnishType] = useState(null);
    const [propertyType, setPropertyType] = useState(null);
    const [propertySize, setPropertySize] = useState('');
    const [monthlyRent, setMonthlyRent] = useState('');
    const [openAvailDate, setOpenAvailDate] = useState(false);
    const [isKeyAvailable, setIsKeyAvailable] = useState(false);
    const [societyList, setSocietyList] = useState([]);

    useEffect(() => {
        getSocietyList();
    }, []);

    const handleSocietyType = (item) => {
        setSocietyType(item);
    };

    const handleBhkType = (item) => {
        setBhkType(item);
    };

    const handleFurnishType = (item) => {
        setFurnishType(item);
    };

    const handlePropertyType = (item) => {
        setPropertyType(item);
    };

    const handleAvailableDate = () => {
        setOpenAvailDate(true);
    };

    const handleKeyAvailable = () => {
        setIsKeyAvailable((prev) => !prev);
    };

    const getSocietyList = () => {
        const filter = {
            'where': {
                'name': {
                    'options': 'i',
                    'like': 'sa.*',
                },
                'active': true,
            },
        };
        const filteredData = JSON.stringify(filter);
        let { actions } = props;
        actions.getSociety(
            filteredData,
            response => {
                if (response?.data) {
                    setSocietyList(response.data);
                }
            },
            error => {
                console.log('ERROR', error);
            },
        );
    };

    return (
        <SafeAreaView style={[styles.container]}>
            <KeyboardAwareScrollView
                contentContainerStyle={[styles.scrollContainer]}
                enableOnAndroid={true}
                extraScrollHeight={20}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.screenContainer}>
                    <View style={styles.inputBox}>
                        <Text style={styles.heading}>Society</Text>
                        <Dropdown
                            style={styles.selectContainer}
                            data={societyList}
                            labelField="title"
                            valueField="id"
                            placeholder="Select the Society"
                            value={bhkType?.type}
                            onChange={item => handleSocietyType(item)}
                            itemTextStyle={styles.itemTextStyle}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <View style={styles.inputCol}>
                            <Text style={styles.heading}>BHK Type</Text>
                            <Dropdown
                                style={styles.selectContainer}
                                data={PropertyBHKOptions}
                                labelField="label"
                                valueField="type"
                                placeholder="Select BHK Type"
                                value={bhkType?.type}
                                onChange={item => handleBhkType(item)}
                                itemTextStyle={styles.itemTextStyle}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                            />
                        </View>
                        <View style={styles.inputCol}>
                            <Text style={styles.heading}>Property Size</Text>
                            <CustomTextInput
                                placeholder="Enter Size"
                                placeholderTextColor="#808191"
                                style={styles.inputStyle}
                                onChangeText={setPropertySize}
                                value={propertySize ?? ''}
                            />
                        </View>
                    </View>
                    <View style={styles.inputRow}>
                        <View style={styles.inputCol}>
                            <Text style={styles.heading}>Furnishing Type</Text>
                            <Dropdown
                                style={styles.selectContainer}
                                data={PropertyFurnishOptions}
                                labelField="label"
                                valueField="type"
                                placeholder="Select Furnishing Type"
                                value={furnishType?.type}
                                onChange={item => handleFurnishType(item)}
                                itemTextStyle={styles.itemTextStyle}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                            />
                        </View>
                        <View style={styles.inputCol}>
                            <Text style={styles.heading}>Available From</Text>
                            <Pressable onPress={() => handleAvailableDate()} style={styles.selectBox}>
                                <Text style={styles.selectTitle}>{moment(startdate).format('DD/MM/YYYY')}</Text>
                            </Pressable>
                            <DatePicker
                                modal
                                mode="date"
                                open={openAvailDate}
                                date={startdate}
                                onConfirm={(date) => {
                                    setOpenAvailDate(false);
                                    setStartDate(date);
                                }}
                                onCancel={() => {
                                    setOpenAvailDate(false);
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.inputRow}>
                        <View style={styles.inputCol}>
                            <Text style={styles.heading}>Property Type</Text>
                            <Dropdown
                                style={styles.selectContainer}
                                data={PropertyTypeOptions}
                                labelField="label"
                                valueField="type"
                                placeholder="Select Property Type"
                                value={propertyType?.type}
                                onChange={item => handlePropertyType(item)}
                                itemTextStyle={styles.itemTextStyle}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                            />
                        </View>
                        <View style={styles.inputCol}>
                            <Text style={styles.heading}>Key Available</Text>
                            <View style={[styles.modeSwitchContainer,
                            {
                                flexDirection: !isKeyAvailable ? 'row-reverse' : 'row',
                                backgroundColor: !isKeyAvailable ? '#FF3B30' : '#34C759',
                            },
                            ]}>
                                <Text style={styles.switchText}>
                                    {!isKeyAvailable ? 'No' : 'Yes'}
                                </Text>
                                <Switch
                                    onValueChange={() => handleKeyAvailable(!isKeyAvailable)}
                                    value={isKeyAvailable}
                                    trackColor={{ false: 'rgba(205, 205, 205, 0.7)', true: 'rgba(205, 205, 205, 0.7)' }}
                                    thumbColor={!isKeyAvailable ? '#fff' : '#fff'}
                                    style={{
                                        marginRight: isKeyAvailable ? 0 : 8,
                                        marginLeft: !isKeyAvailable ? 0 : 8,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.heading}>Monthly Rent</Text>
                        <CustomTextInput
                            placeholder="Enter Monthly Rent"
                            placeholderTextColor="#808191"
                            style={styles.inputStyle}
                            onChangeText={setMonthlyRent}
                            value={monthlyRent ?? ''}
                        />
                    </View>
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
};

const mapStateToProps = state => ({
    userProfile: state.auth.userProfile,
    //   userProfileData: state.visitList.userProfileData,
    //   deviceId: state.auth.deviceId,
});

const ActionCreators = Object.assign(
    {},
    {
        getSociety: inventoryActions.getSociety,
    },
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);

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
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    inputCol: {
        width: '48%',
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
    inputBox: {
        marginBottom: 20,
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
    },
    selectBox: {
        height: 44,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '100%',
    },
    selectTitle: {
        fontSize: 14,
        color: '#000',
        fontFamily: GlobalStyle.fontSet.Poppins400,
    },
    modeSwitchContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 130,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 24,
        marginTop: 5,
    },
    switchText: {
        color: '#fff',
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 16,
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
        borderRadius: 8,
    },
    titleLight: {
        color: '#fff',
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 14,
    },
});
