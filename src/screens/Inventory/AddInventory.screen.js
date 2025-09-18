/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import DeleteIcon from '../../assets/images/delete.png';
import ImageCropPicker from 'react-native-image-crop-picker';
import { STAGE_IMAGE_URL } from '../../constants/constants';
import Toast from 'react-native-toast-message';

const AddInventory = (props) => {

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
    const [isFormSubmit, setIsFormSubmit] = useState(false);
    const cpUserId = props?.userProfile?.data?.cpUser?.id;

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle: props => {
                return (
                    <Text style={styles.navigatorText}>
                        {data?.from === 'edit' ? 'Update Inventory' : 'Add New Inventory'}
                    </Text>
                );
            },
        });
    }, []);

    useEffect(() => {
        getSocietyList();
    }, []);

    useEffect(() => {
        if (data?.from === 'edit' && data?.data) {
            const property = data?.data;
            setSocietyType({ id: property?.society?.id });
            setBhkType({ type: property?.bhk });
            setFurnishType({ type: property?.propDetails?.furnish });
            setPropertyType({ type: property?.propType });
            setPropertySize(String(property?.propDetails?.propertyArea));
            setMonthlyRent(String(property?.propDetails?.expectedRent));
            setIsKeyAvailable(property?.propDetails?.keyy);
            if (property?.propDetails?.availableFrom) {
                setStartDate(new Date(property?.propDetails?.availableFrom));
            }
            if (property?.propertyImage?.length > 0) {
                const formattedImages = property.propertyImage.map(img => ({
                    localPath: null,
                    file: null,
                    isUploading: false,
                    uploadedData: img,
                }));
                setPropertyImage(formattedImages);
            }
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
            // Step A: Add selected images immediately with isUploading true
            const newImages = images.map(img => ({
                localPath: img.path,
                file: img,
                isUploading: true,
                uploadedData: null,
            }));
            setPropertyImage(prev => [...prev, ...newImages]);
            // Step B: Upload one by one
            for (const img of newImages) {
                await new Promise((resolve, reject) => {
                    props.actions.postPropertyImages(
                        img.file,
                        response => {
                            if (response?.data) {
                                setPropertyImage(prev =>
                                    prev.map(item =>
                                        item.localPath === img.localPath
                                            ? { ...item, isUploading: false, uploadedData: response.data[0] }
                                            : item
                                    )
                                );
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
        } catch (error) {
            console.log('Error selecting or cropping image:', error);
        }
    };

    const handleDeleteImage = (index) => {
        setPropertyImage(prev =>
            prev.map((item, i) => {
                if (i === index && item.uploadedData) {
                    return {
                        ...item,
                        uploadedData: {
                            ...item.uploadedData,
                            delete: true,
                        },
                    };
                }
                return item;
            })
        );
    };

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
        const nonDeletedImages = propertyImage.filter(item => item.uploadedData && !item.uploadedData?.delete);
        const updatedPropertyImage = propertyImage.filter(item => item.uploadedData).map((item, index) => {
            if (item.uploadedData?.delete) {
                return {
                    ...item.uploadedData,
                    isCover: false,
                    delete: true,
                };
            }
            const nonDeletedIndex = nonDeletedImages.findIndex(
                nd => nd.uploadedData === item.uploadedData
            );
            return {
                ...item.uploadedData,
                isCover: nonDeletedIndex === 0,
                delete: false,
            };
        });
        const payload = {
            fields: {
                cpUserId: cpUserId,
                propType: propertyType?.type,
                // status: 1,
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
        const nonDeletedImages = propertyImage.filter(
            item => item.uploadedData && !item.uploadedData?.delete
        );
        const updatedImageList = propertyImage.filter(item => item.uploadedData).map((item) => {
            const isDeleted = item.uploadedData?.delete === true;
            const nonDeletedIndex = nonDeletedImages.findIndex(
                nd => nd.uploadedData === item.uploadedData
            );
            return {
                delete: isDeleted,
                fileName: item.uploadedData.fileName,
                isCover: !isDeleted && nonDeletedIndex === 0,
                original: item.uploadedData.original,
                sequence: item.uploadedData.sequence,
                thumbnail: item.uploadedData.thumbnail,
                _id: item.uploadedData._id,
                propertyId: item.uploadedData.propertyId,
            };
        });
        const payload = {
            propertyId: data?.data?.id,
            obj: {
                fields: {
                    propType: propertyType?.type,
                    status: data?.data?.status,
                    bhk: bhkType?.type,
                    furnish: furnishType?.type,
                    propertyArea: Number(propertySize),
                    expectedRent: Number(monthlyRent),
                },
                imageList: updatedImageList,
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

    const isAnyImageUploading = propertyImage.some(img => img.isUploading);
    const areAllImagesUploaded = propertyImage.length > 0 && propertyImage.every(img => !img.isUploading && img.uploadedData);
    const isAddFormValid = societyType && bhkType && furnishType && propertyType && propertySize && monthlyRent && areAllImagesUploaded;
    const isUpdateFormValid = societyType && bhkType && furnishType && propertyType && propertySize && monthlyRent;

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
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.propertyImageContainer}>
                            {propertyImage?.filter(item => !item.uploadedData?.delete).map((item, index) => (
                                <View key={index} style={styles.propertyImageBox}>
                                    <Image
                                        source={{ uri: item.localPath || `${STAGE_IMAGE_URL}${item?.uploadedData?.thumbnail}` }}
                                        style={styles.propertyImage}
                                    />
                                    {!item.isUploading && item.uploadedData &&
                                        <Pressable style={styles.deleteContainer} onPress={() => handleDeleteImage(index)}>
                                            <Image source={DeleteIcon} style={styles.deleteIcon} />
                                        </Pressable>
                                    }
                                    {item.isUploading && (
                                        <View style={styles.loadingContainer}>
                                            <ActivityIndicator color="#fff" />
                                        </View>
                                    )}
                                </View>
                            ))}
                        </ScrollView>
                        {!isAnyImageUploading &&
                            <Pressable style={styles.uploadBox} onPress={handleChoosePhoto}>
                                <Text style={styles.uploadText}>Upload Photo</Text>
                                <Image source={UploadIcon} style={styles.uploadIcon} />
                            </Pressable>
                        }
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
        marginBottom: 10,
    },
    propertyImageBox: {
        marginRight: 15,
    },
    propertyImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
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
    navigatorText: {
        color: '#000',
        fontSize: 16,
        fontFamily: GlobalStyle.fontSet.Poppins600,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteContainer: {
        position: 'absolute',
        right: 8,
        top: 8,
    },
    deleteIcon: {
        width: 20,
        height: 20,
    },
});
