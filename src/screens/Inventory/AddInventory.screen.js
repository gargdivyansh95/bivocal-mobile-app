/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomButton, CustomTextInput, SocietySearchPicker } from '../../components';
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
import { IconButton } from 'react-native-paper';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import LeftIcon from 'react-native-vector-icons/Entypo';
import RightIcon from 'react-native-vector-icons/Entypo';
import ArrowDownIcon from '../../assets/images/ArrowDown.png';
import { debounce } from '../../util/debounce';

const { width, height } = Dimensions.get('window');
const AddInventory = (props) => {

    const data = props?.route?.params;
    const bottomSheetSocietyRef = useRef(null);
    const flatListRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startdate, setStartDate] = useState(new Date());
    const [searchText, setSearchText] = useState(null);
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
    const [isLoading, setIsLoading] = useState(false);
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
        if (data?.from === 'edit' && data?.data) {
            const property = data?.data;
            // setSocietyType({ id: property?.society?.id });
            setSocietyType({ id: property?.society?.id, title: property?.society?.title });
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

    const getSocietyList = (text) => {
        const filter = {
            'where': {
                'name': {
                    'options': 'i',
                    // 'like': searchText ?? '',
                    'like': text ? `${text}.*` : '',
                },
                'active': true,
            },
            'limit': 20,
        };
        setIsLoading(true);
        const filteredData = JSON.stringify(filter);
        let { actions } = props;
        actions.getSociety(
            filteredData,
            response => {
                if (response?.data) {
                    setSocietyList(response.data);
                    setIsLoading(false);
                }
            },
            error => {
                console.log('ERROR', error);
                setIsLoading(false);
            },
        );
    };

    const handleOpenPicker = () => {
        bottomSheetSocietyRef?.current?.present();
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
                                setPropertyImage(prev => {
                                    const uploadedCount = prev.filter(p => p.uploadedData && !p.isUploading).length;
                                    return prev.map(item =>
                                        item.localPath === img.localPath
                                            ? {
                                                ...item,
                                                isUploading: false,
                                                uploadedData: {
                                                    ...response.data[0],
                                                    sequence: uploadedCount + 1,
                                                },
                                            }
                                            : item
                                    );
                                    // prev.map(item =>
                                    //     item.localPath === img.localPath
                                    //         ? { ...item, isUploading: false, uploadedData: response.data[0] }
                                    //         : item
                                    // )
                                });
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
    console.log(propertyImage, 'propertyimage');

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
                    societyId: societyType?.id,
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
        console.log(payload, 'update payload');
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

    const openModal = (index) => {
        setCurrentIndex(index);
        setVisible(true);
        // scroll directly to tapped image
        setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index, animated: false });
        }, 100);
    };

    const handleScrollTo = (index) => {
        if (index >= 0 && index < propertyImage.length) {
            flatListRef.current?.scrollToIndex({ index, animated: true });
            setCurrentIndex(index);
        }
    };

    const debouncedSearch = useMemo(() => debounce((query) => {
        if (query && query.trim().length > 0) {
            getSocietyList(query);
        }
    }, 500), []);

    const handleSearchSociety = (text) => {
        setSearchText(text);
        const trimmed = text.trim();
        if (!trimmed) {
            // cancel any running debounce + clear list
            debouncedSearch.cancel();
            setSocietyList([]);
            return;
        }
        debouncedSearch(trimmed);
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
                        <Pressable onPress={handleOpenPicker} style={styles.selectBox}>
                            <Text style={[styles.selectTitle, { flex: 1 }]}>{societyType?.title ?? 'Select Society'}</Text>
                            <Image source={ArrowDownIcon} style={styles.icon} />
                        </Pressable>
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
                                keyboardType="numeric"
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
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.heading}>Upload property Photo</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.propertyImageContainer}>
                            {propertyImage.map((item, originalIndex) => {
                                if (item.uploadedData?.delete) {return null;}
                                return (
                                    <View key={originalIndex} style={styles.propertyImageBox}>
                                        <Pressable onPress={() => openModal(originalIndex)}>
                                            <Image
                                                source={{ uri: item.localPath || `${STAGE_IMAGE_URL}${item?.uploadedData?.original}` }}
                                                style={styles.propertyImage}
                                            />
                                        </Pressable>
                                        {!item.isUploading && item.uploadedData && (
                                            <Pressable style={styles.deleteContainer} onPress={() => handleDeleteImage(originalIndex)}>
                                                <Image source={DeleteIcon} style={styles.deleteIcon} />
                                            </Pressable>
                                        )}
                                        {item.isUploading && (
                                            <View style={styles.loadingContainer}>
                                                <ActivityIndicator color="#fff" />
                                            </View>
                                        )}
                                    </View>
                                );
                            })}
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
            <Modal visible={visible} transparent={true}>
                <View style={styles.modalContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={propertyImage}
                        keyExtractor={(_, idx) => idx.toString()}
                        horizontal
                        pagingEnabled
                        initialScrollIndex={currentIndex}
                        getItemLayout={(_, index) => ({
                            length: width,
                            offset: width * index,
                            index,
                        })}
                        renderItem={({ item }) => (
                            <View style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: item.localPath || `${STAGE_IMAGE_URL}${item?.uploadedData?.original}` }} style={styles.fullImage} />
                            </View>
                        )}
                    />
                    <IconButton style={styles.closeButton}
                        icon={() =>
                            <CloseIcon
                                name="close"
                                size={24}
                                color="#000"
                            />}
                        size={24}
                        onPress={() => setVisible(false)}
                    />
                    {currentIndex > 0 && (
                        <IconButton style={[styles.navButton, { left: 10 }]}
                            icon={() =>
                                <LeftIcon
                                    name="chevron-thin-left"
                                    size={24}
                                    color="#000"
                                />}
                            size={24}
                            onPress={() => handleScrollTo(currentIndex - 1)}
                        />
                    )}
                    {currentIndex < propertyImage.length - 1 && (
                        <IconButton style={[styles.navButton, { right: 10 }]}
                            icon={() =>
                                <RightIcon
                                    name="chevron-thin-right"
                                    size={24}
                                    color="#000"
                                />}
                            size={24}
                            onPress={() => handleScrollTo(currentIndex + 1)}
                        />
                    )}
                </View>
            </Modal>
            <SocietySearchPicker
                bottomSheetRef={bottomSheetSocietyRef}
                societyList={societyList}
                searchText={searchText}
                isLoading={isLoading}
                onSelectItem={(ele) => handleSocietyType(ele)}
                onSearchSociety={(text) => handleSearchSociety(text)}
            />
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
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        // resizeMode: 'cover',
        // resizeMode: 'contain',
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
        right: 4,
        top: 4,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 50,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteIcon: {
        width: 20,
        height: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    fullImage: {
        width: width,
        height: height - 200,
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 10,
        backgroundColor: '#fff',
    },
    navButton: {
        position: 'absolute',
        top: '50%',
        backgroundColor: '#fff',
        borderRadius: 50,
        transform: [{ translateY: -25 }],
    },
});
