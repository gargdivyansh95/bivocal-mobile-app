/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
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
import UploadIcon from '../../assets/images/upload.png';
import ImageCropPicker from 'react-native-image-crop-picker';
import { API_ENDPOINT_IMG_PREFIX } from '../../constants/constants';
import Toast from 'react-native-toast-message';

const AddInventory = (props) => {

    const IMAGE_URL = 'https://bivocalbirds-stage.s3.us-east-1.amazonaws.com';
    const data = props?.route?.params;
    const [startdate, setStartDate] = useState(new Date());
    const [societyType, setSocietyType] = useState(null);
    const [bhkType, setBhkType] = useState(null);
    const [furnishType, setFurnishType] = useState(null);
    const [propertyType, setPropertyType] = useState(null);
    const [propertySize, setPropertySize] = useState('');
    const [monthlyRent, setMonthlyRent] = useState('');
    const [openAvailDate, setOpenAvailDate] = useState(false);
    const [isKeyAvailable, setIsKeyAvailable] = useState(false);
    const [propertyImage, setPropertyImage] = useState([]);
    const [societyList, setSocietyList] = useState([]);
    const [isRequestSent, setIsRequestSent] = useState(false);
    const [isFormSubmit, setIsFormSubmit] = useState(false);
    const cpUserId = props?.userProfile?.data?.cpUser?.id;

    useEffect(() => {
        getSocietyList();
    }, []);

    useEffect(() => {
        if (data?.from === 'edit' && data?.data) {
            const property = data?.data;
            setSocietyType({ id: property?.society?._id });
            setBhkType({ type: property?.bhk });
            setFurnishType({ type: property?.propDetails?.furnish });
            setPropertyType({ type: property?.propType });
            setPropertySize(String(property?.propDetails?.propertyArea));
            setMonthlyRent(String(property?.propDetails?.expectedRent));
            setIsKeyAvailable(property?.propDetails?.keyy);
            if (property?.propDetails?.availableFrom) {
                setStartDate(new Date(property?.propDetails?.availableFrom));
            }
            // if (property?.imageList?.length) {
            //     setPropertyImage(property.imageList);
            // }
        }
    }, [data]);

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

    const handleChoosePhoto = async () => {
        try {
            const images = await ImageCropPicker.openPicker({
                multiple: true,
                maxFiles: 5,
                mediaType: 'photo',
                cropping: false,
            });
            let { actions } = props;
            let uploadedImages = [];
            setIsRequestSent(true);
            for (const img of images) {
                await new Promise((resolve, reject) => {
                    actions.postPropertyImages(
                        img,
                        response => {
                            if (response?.data) {
                                uploadedImages.push(response.data[0]);
                                resolve(true);
                            } else {
                                reject('No response data');
                            }
                        },
                        error => {
                            console.log('ERROR uploading image:', error);
                            reject(error);
                        },
                    );
                });
            }
            setPropertyImage(prev => [...prev, ...uploadedImages]);
        } catch (error) {
            console.log('Error selecting or cropping image:', error);
        } finally {
            setIsRequestSent(false);
        }
    };

    const isAddFormValid = societyType && bhkType && furnishType && propertyType && propertySize && monthlyRent && propertyImage.length > 0;
    const isUpdateFormValid = societyType && bhkType && furnishType && propertyType && propertySize && monthlyRent;

    const resetForm = () => {
        setStartDate(new Date());
        setSocietyType(null);
        setBhkType(null);
        setFurnishType(null);
        setPropertyType(null);
        setPropertySize('');
        setMonthlyRent('');
        setIsKeyAvailable(false);
        setPropertyImage([]);
    };

    const handleAddInventory = () => {
        const updatedPropertyImage = propertyImage.map(item => ({
            ...item,
            isCover: false,
            delete: false,
        }));
        const payload = {
            fields: {
                cpUserId: cpUserId,
                propType: propertyType?.type,
                status: 1,
                bhk: bhkType?.type,
                furnish: furnishType?.type,
                propertyArea: Number(propertySize),
                expectedRent: Number(monthlyRent),
                keyy: isKeyAvailable,
                availableFrom: startdate.toISOString(),
                societyId: societyType?.id,
                sharedByPartner: true,
            },
            imageList: updatedPropertyImage,
        };
        setIsFormSubmit(true);
        let { actions } = props;
        actions.postProperty(
            payload,
            response => {
                if (response?.data?.success === true) {
                    console.log(response, 'property response');
                    Toast.show({
                        type: 'success',
                        text1: response?.data?.message || 'Property Added Successfully.',
                        text2: '',
                    });
                    resetForm();
                    const onGoBack = props.route.params?.onGoBack;
                    if (onGoBack) {
                        onGoBack(true);
                    }
                    props.navigation.goBack();
                }
            },
            error => {
                console.log('ERROR', error);
                setIsFormSubmit(false);
                Toast.show({
                    type: 'error',
                    text1: error?.message || 'Something went wrong.',
                    text2: '',
                });
            },
        );
    };

    const handleUpdateInventory = () => {
        const payload = {
            propertyId: data?.data?.id,
            obj: {
                fields: {
                    propType: propertyType?.type,
                    status: 1,
                    bhk: bhkType?.type,
                    furnish: furnishType?.type,
                    propertyArea: Number(propertySize),
                    expectedRent: Number(monthlyRent),
                },
            },
        };
        setIsFormSubmit(true);
        let { actions } = props;
        actions.updateProperty(
            payload,
            response => {
                if (response?.data?.success === true) {
                    console.log(response, 'property response');
                    Toast.show({
                        type: 'success',
                        text1: response?.data?.message || 'Property Updated Successfully.',
                        text2: '',
                    });
                    setIsFormSubmit(false);
                    const onGoBack = props.route.params?.onGoBack;
                    if (onGoBack) {
                        onGoBack(true);
                    }
                    props.navigation.goBack();
                }
            },
            error => {
                console.log('ERROR', error);
                setIsFormSubmit(false);
                Toast.show({
                    type: 'error',
                    text1: error?.message || 'Something went wrong.',
                    text2: '',
                });
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
                            value={societyType?.id}
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
                    <View style={styles.inputBox}>
                        <Text style={styles.heading}>Upload property Photo</Text>
                        {/* {propertyImage?.original && <Image source={{ uri: propertyImage?.original }} style={styles.propertyImage} />} */}
                        {isRequestSent ?
                            <ActivityIndicator color="#2668E0" /> :
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.propertyImageContainer}>
                                {propertyImage?.map((item, index) => {
                                    return (
                                        <View key={index} style={styles.propertyImageBox}>
                                            <Image source={{ uri: `${IMAGE_URL}` + item?.thumbnail }} style={styles.propertyImage} />
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        }
                        <Pressable style={styles.uploadBox} onPress={handleChoosePhoto}>
                            <Text style={styles.uploadText}>Upload Photo</Text>
                            <Image source={UploadIcon} style={styles.uploadIcon} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    {data?.from === 'edit' ?
                        <CustomButton
                            style={[styles.buttonDark, isUpdateFormValid ? styles.buttonActive : styles.buttonInActive]}
                            labelStyle={[styles.titleLight]}
                            title={'Update Inventory'}
                            mode="contained"
                            disabled={!isUpdateFormValid}
                            loading={isFormSubmit}
                            onPress={handleUpdateInventory}
                        /> :
                        <CustomButton
                            style={[styles.buttonDark, isAddFormValid ? styles.buttonActive : styles.buttonInActive]}
                            labelStyle={[styles.titleLight]}
                            title={'Add Inventory'}
                            mode="contained"
                            disabled={!isAddFormValid}
                            loading={isFormSubmit}
                            onPress={handleAddInventory}
                        />
                    }
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const mapStateToProps = state => ({
    userProfile: state.auth.userProfile,
});

const ActionCreators = Object.assign(
    {},
    {
        getSociety: inventoryActions.getSociety,
        postPropertyImages: inventoryActions.postPropertyImages,
        postProperty: inventoryActions.postProperty,
        updateProperty: inventoryActions.updateProperty,
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
    uploadBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#848484',
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    uploadIcon: {
        width: 18,
        height: 18,
    },
    uploadText: {
        color: '#fff',
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 14,
    },
    propertyImageContainer: {

    },
    propertyImageBox: {
        marginRight: 15,
    },
    propertyImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
    },
    buttonContainer: {
        paddingBottom: 5,
    },
    buttonDark: {
        height: 44,
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        borderRadius: 8,
    },
    buttonActive: {
        backgroundColor: '#2668E0',
    },
    buttonInActive: {
        backgroundColor: 'rgba(36,39,44,.3)',
    },
    titleLight: {
        color: '#fff',
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 14,
    },
});
